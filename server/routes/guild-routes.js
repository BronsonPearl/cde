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
  await Application.create(data);
  res.status(201).json({ ok: true });
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
