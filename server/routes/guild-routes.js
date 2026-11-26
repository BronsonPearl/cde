import express from 'express';
import authMiddleware from '../middlewares/auth.js';
import Member from '../models/Member.js';
import Application from '../models/Application.js';

const router = express.Router();

// Pick only the fields we allow, so clients can't set anything else (e.g. status)
const pick = (obj, keys) =>
  Object.fromEntries(keys.filter((k) => obj?.[k] !== undefined).map((k) => [k, obj[k]]));

const MEMBER_FIELDS = ['name', 'cls', 'role', 'guildRank', 'pvpRank', 'title', 'focus'];
const APPLICATION_FIELDS = ['name', 'level', 'cls', 'spec', 'role', 'focus', 'currentRank',
  'highestRank', 'discord', 'voice', 'availability', 'experience', 'goals'];

/* ---------- Discord notification ---------- */

const clip = (v, n = 900) => {
  const t = String(v ?? '').trim();
  return t.length > n ? t.slice(0, n - 1) + '…' : t;
};

// Posts a summary of a new application to a Discord channel (if DISCORD_WEBHOOK_URL is set)
async function notifyDiscord(a) {
  const url = process.env.DISCORD_WEBHOOK_URL;
  if (!url) return;

  const field = (name, value, inline = true) => (value ? { name, value: clip(value), inline } : null);
  const fields = [
    field('Class', [a.cls, a.spec].filter(Boolean).join(', ')),
    field('Role', a.role),
    field('Level', a.level),
    field('PvP focus', a.focus),
    field('Current rank', a.currentRank),
    field('Highest rank / titles', a.highestRank),
    field('Discord', a.discord),
    field('Voice chat', a.voice),
    field('Availability', a.availability, false),
    field('PvP experience', a.experience, false),
    field('Goals', a.goals, false),
  ].filter(Boolean);

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'CDE Recruitment',
      allowed_mentions: { parse: [] }, // applicants can't ping @everyone through the form
      embeds: [{
        title: clip(`New application: ${a.name}`, 250),
        color: 0xb1002e,
        fields,
        timestamp: new Date().toISOString(),
      }],
    }),
  });
  if (!res.ok) throw new Error(`Discord responded with ${res.status}`);
}

/* ---------- Roster ---------- */

// Public: anyone can see the roster
router.get('/members', async (req, res) => {
  const members = await Member.find().sort({ pvpRank: -1, name: 1 });
  res.json(members);
});

// Officers (logged in): manage the roster
router.post('/members', authMiddleware, async (req, res) => {
  const member = await Member.create(pick(req.body, MEMBER_FIELDS));
  res.status(201).json(member);
});

router.put('/members/:id', authMiddleware, async (req, res) => {
  const member = await Member.findByIdAndUpdate(
    req.params.id, pick(req.body, MEMBER_FIELDS), { new: true, runValidators: true });
  if (!member) return res.status(404).json({ error: 'Member not found' });
  res.json(member);
});

router.delete('/members/:id', authMiddleware, async (req, res) => {
  const member = await Member.findByIdAndDelete(req.params.id);
  if (!member) return res.status(404).json({ error: 'Member not found' });
  res.json({ ok: true });
});

/* ---------- Applications ---------- */

// Public: anyone can apply
router.post('/applications', async (req, res) => {
  // Honeypot: real people never fill this hidden field, bots do
  if (req.body?.website) return res.status(201).json({ ok: true });

  const data = pick(req.body, APPLICATION_FIELDS);
  if (!data.name?.trim() || !data.cls || !data.discord?.trim()) {
    return res.status(400).json({ error: 'Character name, class and Discord are required.' });
  }
  const saved = await Application.create(data);
  res.status(201).json({ ok: true });

  // Don't make the applicant wait for Discord, and don't fail the form if Discord is down
  notifyDiscord(saved).catch((err) => console.error('Discord notification failed:', err.message));
});

// Officers (logged in): review applications
router.get('/applications', authMiddleware, async (req, res) => {
  const filter = req.query.status ? { status: req.query.status } : {};
  res.json(await Application.find(filter).sort({ createdAt: -1 }));
});

router.patch('/applications/:id', authMiddleware, async (req, res) => {
  const { status } = req.body;
  if (!['new', 'accepted', 'declined'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  const app = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!app) return res.status(404).json({ error: 'Application not found' });
  res.json(app);
});

export default router;
