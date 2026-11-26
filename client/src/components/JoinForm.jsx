import { useState } from 'react';
import { Alert, Box, Button, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { API, CLASSES, FOCUSES, ROLES } from '../guildConfig.js';
 
const EMPTY = { name: '', level: '', cls: '', spec: '', role: 'DPS', focus: FOCUSES[0], currentRank: '',
  highestRank: '', discord: '', voice: 'Yes, I have a mic', availability: '', experience: '', goals: '',
  website: '' /* honeypot, keep hidden */ };
 
function JoinFormFields() {
  const [f, setF] = useState(EMPTY);
  const [state, setState] = useState({ status: 'idle', message: '' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
 
  const submit = async (e) => {
    e.preventDefault();
    if (!f.name.trim() || !f.cls || !f.discord.trim()) {
      return setState({ status: 'error', message: 'Enter your character name, class and Discord username.' });
    }
    setState({ status: 'sending', message: '' });
    try {
      const res = await fetch(`${API}/guild/applications`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Request failed');
      setF(EMPTY);
      setState({ status: 'done', message: 'Application sent. An officer will contact you on Discord.' });
    } catch (err) {
      setState({ status: 'error', message: `Could not send your application: ${err.message}. Try again.` });
    }
  };
 
  return (
    <Paper variant="outlined" component="form" onSubmit={submit} noValidate
      sx={{ p: 2.5, display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
      <TextField required label="Character name (first and last)" value={f.name} onChange={set('name')} />
      <TextField label="Level" value={f.level} onChange={set('level')} slotProps={{ htmlInput: { inputMode: 'numeric', maxLength: 3 } }} />
      <TextField required select label="Class" value={f.cls} onChange={set('cls')}>
        {Object.keys(CLASSES).map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
      </TextField>
      <TextField label="Spec or build" value={f.spec} onChange={set('spec')} />
      <TextField select label="Role" value={f.role} onChange={set('role')}>
        {ROLES.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
      </TextField>
      <TextField select label="PvP focus" value={f.focus} onChange={set('focus')}>
        {FOCUSES.map((x) => <MenuItem key={x} value={x}>{x}</MenuItem>)}
      </TextField>
      <TextField label="Current PvP rank" value={f.currentRank} onChange={set('currentRank')} placeholder="e.g. Rank 8, or none yet" />
      <TextField label="Highest rank or titles earned" value={f.highestRank} onChange={set('highestRank')} />
      <TextField required label="Discord username" value={f.discord} onChange={set('discord')} />
      <TextField select label="Voice chat" value={f.voice} onChange={set('voice')}>
        <MenuItem value="Yes, I have a mic">Yes, I have a mic</MenuItem>
        <MenuItem value="Listen only">Listen only</MenuItem>
      </TextField>
      <TextField label="Availability and time zone" value={f.availability} onChange={set('availability')} sx={{ gridColumn: '1 / -1' }} />
      <TextField multiline minRows={3} label="PvP experience and previous guilds" value={f.experience} onChange={set('experience')} sx={{ gridColumn: '1 / -1' }} />
      <TextField multiline minRows={3} label="What are your PvP goals?" value={f.goals} onChange={set('goals')} sx={{ gridColumn: '1 / -1' }} />
 
      {/* Honeypot: hidden from people, bots fill it in */}
      <input tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.website} onChange={set('website')}
        style={{ position: 'absolute', left: '-9999px', height: 0, width: 0, opacity: 0 }} />
 
      <Box sx={{ gridColumn: '1 / -1' }}>
        <Button type="submit" variant="contained" disabled={state.status === 'sending'}>
          {state.status === 'sending' ? 'Sending…' : 'Send application'}
        </Button>
        {state.message && <Alert severity={state.status === 'done' ? 'success' : 'error'} sx={{ mt: 2 }}>{state.message}</Alert>}
      </Box>
    </Paper>
  );
}
 
export default function JoinPage() {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>Join the guild</Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Tell us what you play and how you fight. An officer will contact you on Discord.
      </Typography>
      <JoinFormFields />
    </Box>
  );
}
 
