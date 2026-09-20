import { GoogleGenAI } from '@google/genai'
import { SYSTEM_PROMPT } from './_knowledge.js'

// Flash-class models sit inside Gemini's free tier and are more than enough for
// answering questions about a CV. Override with GEMINI_MODEL if needed.
const MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash'
const MAX_MESSAGE_CHARS = 1000
const MAX_HISTORY = 12

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  })

/** Keep only well-formed turns, cap length, and drop anything oversized. */
export function sanitize(messages) {
  if (!Array.isArray(messages)) return null
  const cleaned = messages
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_CHARS) }))
    .filter((m) => m.content.trim().length > 0)
    .slice(-MAX_HISTORY)

  // The conversation must start with a user turn.
  while (cleaned.length && cleaned[0].role !== 'user') cleaned.shift()
  return cleaned.length ? cleaned : null
}

/** Gemini names the assistant role `model`, not `assistant`. */
export const toContents = (messages) =>
  messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

export default async function handler(req) {
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405)

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return json({ error: 'unconfigured' }, 503)

  let payload
  try {
    payload = await req.json()
  } catch {
    return json({ error: 'bad_request' }, 400)
  }

  const messages = sanitize(payload?.messages)
  if (!messages) return json({ error: 'bad_request' }, 400)

  try {
    const ai = new GoogleGenAI({ apiKey })

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: toContents(messages),
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: 1024,
        // Low temperature: this should recite the CV, not embellish it.
        temperature: 0.3,
      },
    })

    // A safety block returns 200 with no candidates, so check before reading text.
    const blocked = response.promptFeedback?.blockReason
    if (blocked) {
      return json({ reply: "I can't help with that one — but ask me anything about Chandraj's work." })
    }

    const reply = response.text?.trim()
    if (!reply) {
      const finish = response.candidates?.[0]?.finishReason
      console.error('astro: empty response, finishReason =', finish ?? '(none)')
      return json({ error: 'empty_response', detail: `finishReason: ${finish ?? 'none'}` }, 502)
    }
    return json({ reply })
  } catch (err) {
    // @google/genai throws plain Error objects with no .status field - the HTTP
    // status is embedded in the message (e.g. "got status: 404 Not Found").
    // Checking err.status here silently collapsed every failure into a 502.
    const message = String(err?.message ?? err)
    const status = Number(err?.status ?? err?.code ?? message.match(/\b(4\d{2}|5\d{2})\b/)?.[1])

    // Never echo anything that could carry the key back to the client.
    const detail = message.replace(/AIza[0-9A-Za-z_-]+/g, '[redacted]').slice(0, 300)
    console.error('astro function error:', status ?? '(no status)', detail)

    if (status === 429) return json({ error: 'rate_limited', detail }, 429)
    if (status === 401 || status === 403) return json({ error: 'unconfigured', detail }, 503)
    if (status === 400) return json({ error: 'bad_upstream_request', detail }, 502)
    if (status === 404) return json({ error: 'model_not_found', detail }, 502)
    return json({ error: 'upstream_error', detail }, 502)
  }
}

export const config = { path: '/api/astro' }
