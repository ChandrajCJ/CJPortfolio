import { GoogleGenAI } from '@google/genai'
import { SYSTEM_PROMPT } from './_knowledge.js'

// Flash-class models sit inside Gemini's free tier and are more than enough for
// answering questions about a CV.
//
// Model names retire: gemini-2.0-flash was removed and the API returned a 404
// naming its replacement. If that happens again, GEMINI_MODEL overrides this
// without a code change, and the 404 detail tells you what to set it to.
const MODEL = process.env.GEMINI_MODEL || 'gemini-3.6-flash'

// Gemini's free Flash tier regularly answers 503 "This model is currently
// experiencing high demand" for a few seconds at a time; a manual retry then
// succeeds. So transient failures are retried here with backoff, and if the
// main model is still saturated the request falls back to the Flash-Lite
// alias, which is served from separate capacity. Set GEMINI_FALLBACK_MODEL to
// an empty string to disable the fallback.
const FALLBACK_MODEL = process.env.GEMINI_FALLBACK_MODEL ?? 'gemini-flash-lite-latest'
const TRANSIENT = new Set([500, 502, 503, 504])
const BACKOFF_MS = [400, 1000] // between attempts on the main model
const BUDGET_MS = 7000 // stay well inside Netlify's synchronous function limit
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

/**
 * HTTP status of a failed SDK call. @google/genai throws plain Error objects
 * with no .status field - the status is embedded in the message (e.g. "got
 * status: 503 Service Unavailable").
 */
const statusOf = (err) => {
  const message = String(err?.message ?? err)
  return Number(err?.status ?? err?.code ?? message.match(/\b(4\d{2}|5\d{2})\b/)?.[1])
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Calls the main model, retrying transient failures with jittered backoff,
 * then tries the fallback model once. Non-transient errors (bad key, bad
 * request, quota) are thrown immediately. If everything fails, the main
 * model's error is thrown - a fallback 404 would only hide the real cause.
 */
export async function generateWithRetry(call, { model = MODEL, fallback = FALLBACK_MODEL, budgetMs = BUDGET_MS } = {}) {
  const deadline = Date.now() + budgetMs
  let primaryError

  for (let attempt = 0; attempt <= BACKOFF_MS.length; attempt++) {
    try {
      return await call(model)
    } catch (err) {
      primaryError = err
      if (!TRANSIENT.has(statusOf(err))) throw err
    }
    if (attempt === BACKOFF_MS.length) break
    const wait = BACKOFF_MS[attempt] + Math.floor(Math.random() * 250)
    if (Date.now() + wait > deadline) break
    await sleep(wait)
  }

  if (fallback && fallback !== model && Date.now() < deadline) {
    try {
      return await call(fallback)
    } catch (err) {
      console.error('astro: fallback model failed:', statusOf(err) || '(no status)')
    }
  }
  throw primaryError
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

    const response = await generateWithRetry((model) =>
      ai.models.generateContent({
        model,
        contents: toContents(messages),
        config: {
          systemInstruction: SYSTEM_PROMPT,
          maxOutputTokens: 1024,
          // Low temperature: this should recite the CV, not embellish it.
          temperature: 0.3,
        },
      }),
    )

    // A safety block returns 200 with no candidates, so check before reading text.
    const blocked = response.promptFeedback?.blockReason
    if (blocked) {
      return json({ reply: "I can't help with that one. Ask me anything about Chandraj's work, though." })
    }

    const reply = response.text?.trim()
    if (!reply) {
      const finish = response.candidates?.[0]?.finishReason
      console.error('astro: empty response, finishReason =', finish ?? '(none)')
      return json({ error: 'empty_response', detail: `finishReason: ${finish ?? 'none'}` }, 502)
    }
    return json({ reply })
  } catch (err) {
    const message = String(err?.message ?? err)
    const status = statusOf(err)

    // Never echo anything that could carry the key back to the client.
    const detail = message.replace(/AIza[0-9A-Za-z_-]+/g, '[redacted]').slice(0, 300)
    console.error('astro function error:', status ?? '(no status)', detail)

    if (status === 429) return json({ error: 'rate_limited', detail }, 429)
    // Still overloaded after retries and the fallback: tell the visitor it's
    // temporary rather than broken.
    if (TRANSIENT.has(status)) return json({ error: 'busy', detail }, 502)
    if (status === 401 || status === 403) return json({ error: 'unconfigured', detail }, 503)
    if (status === 400) return json({ error: 'bad_upstream_request', detail }, 502)
    if (status === 404) return json({ error: 'model_not_found', detail }, 502)
    return json({ error: 'upstream_error', detail }, 502)
  }
}

export const config = { path: '/api/astro' }
