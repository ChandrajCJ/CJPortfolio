import Anthropic from '@anthropic-ai/sdk'
import { SYSTEM_PROMPT } from './_knowledge.js'

const MODEL = 'claude-opus-5'
const MAX_MESSAGE_CHARS = 1000
const MAX_HISTORY = 12

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  })

/** Keep only well-formed turns, cap length, and drop anything oversized. */
function sanitize(messages) {
  if (!Array.isArray(messages)) return null
  const cleaned = messages
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_CHARS) }))
    .filter((m) => m.content.trim().length > 0)
    .slice(-MAX_HISTORY)

  // The Messages API requires the conversation to start with a user turn.
  while (cleaned.length && cleaned[0].role !== 'user') cleaned.shift()
  return cleaned.length ? cleaned : null
}

export default async function handler(req) {
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405)

  const apiKey = process.env.ANTHROPIC_API_KEY
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
    const client = new Anthropic({ apiKey })

    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 1024,
      // Chat Q&A does not repay deep reasoning; low effort keeps it fast and cheap.
      output_config: { effort: 'low' },
      // The profile is a stable prefix on every request - cache it.
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
      messages,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
    })

    if (response.stop_reason === 'refusal') {
      return json({ reply: "I can't help with that one — but ask me anything about Chandraj's work." })
    }

    const reply = response.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n')
      .trim()

    if (!reply) return json({ error: 'empty_response' }, 502)
    return json({ reply })
  } catch (err) {
    // Typed SDK errors carry a status; distinguish retryable from terminal.
    const status = err?.status
    if (status === 429) return json({ error: 'rate_limited' }, 429)
    if (status === 401 || status === 403) return json({ error: 'unconfigured' }, 503)
    console.error('astro function error:', err?.message ?? err)
    return json({ error: 'upstream_error' }, 502)
  }
}

export const config = { path: '/api/astro' }
