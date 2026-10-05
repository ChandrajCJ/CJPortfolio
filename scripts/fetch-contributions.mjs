/**
 * Fetches the public GitHub contribution calendar for each account in
 * ACCOUNTS, merges them by date, and writes src/data/contributions.json.
 *
 * Uses the public contributions fragment rather than the GraphQL API, so it
 * needs no token — which means no secret to manage and nothing to leak. The
 * trade-off is that private-repo contributions are not included.
 *
 * Run: npm run fetch:contributions   (and commit the result)
 */
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, '..', 'src', 'data', 'contributions.json')

const ACCOUNTS = ['ChandrajCJ', 'Chandraj1710']

/** Pull `date -> count` out of the calendar fragment. */
async function fetchAccount(user) {
  const res = await fetch(`https://github.com/users/${user}/contributions`, {
    headers: { 'user-agent': 'Mozilla/5.0', accept: 'text/html' },
  })
  if (!res.ok) throw new Error(`${user}: HTTP ${res.status}`)
  const html = await res.text()

  // Counts live in sr-only tooltips keyed to each cell's id.
  const counts = new Map()
  for (const m of html.matchAll(/for="(contribution-day-component-\d+-\d+)"[^>]*>([^<]*?)contribution/g)) {
    const raw = m[2].trim()
    counts.set(m[1], /^no$/i.test(raw) ? 0 : parseInt(raw, 10) || 0)
  }

  const days = new Map()
  for (const m of html.matchAll(/<td[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*id="(contribution-day-component-\d+-\d+)"[^>]*>/g)) {
    days.set(m[1], counts.get(m[2]) ?? 0)
  }

  if (!days.size) throw new Error(`${user}: parsed 0 days — GitHub's markup may have changed`)
  return days
}

/** GitHub buckets by quartile of the non-zero days; mirror that. */
function levelFor(count, thresholds) {
  if (count <= 0) return 0
  for (let i = 0; i < thresholds.length; i++) if (count <= thresholds[i]) return i + 1
  return 4
}

const merged = new Map()
for (const user of ACCOUNTS) {
  const days = await fetchAccount(user)
  console.log(`  ${user.padEnd(14)} ${days.size} days, ${[...days.values()].reduce((a, b) => a + b, 0)} contributions`)
  for (const [date, n] of days) merged.set(date, (merged.get(date) ?? 0) + n)
}

const dates = [...merged.keys()].sort()
const active = dates.map((d) => merged.get(d)).filter((n) => n > 0).sort((a, b) => a - b)
const q = (p) => active[Math.floor(active.length * p)] ?? 1
const thresholds = [q(0.25), q(0.5), q(0.75)]

const days = dates.map((date) => {
  const count = merged.get(date)
  return { date, count, level: levelFor(count, thresholds) }
})

// Longest run of consecutive active days.
let streak = 0
let longest = 0
for (const d of days) {
  streak = d.count > 0 ? streak + 1 : 0
  if (streak > longest) longest = streak
}

const payload = {
  generatedAt: new Date().toISOString().slice(0, 10),
  accounts: ACCOUNTS,
  total: days.reduce((a, d) => a + d.count, 0),
  activeDays: days.filter((d) => d.count > 0).length,
  longestStreak: longest,
  busiestDay: days.reduce((a, d) => (d.count > a.count ? d : a), days[0]),
  days,
}

await writeFile(OUT, JSON.stringify(payload), 'utf8')
console.log(
  `  merged -> ${days.length} days, ${payload.total} contributions, ` +
    `${payload.activeDays} active, longest streak ${payload.longestStreak}`,
)
