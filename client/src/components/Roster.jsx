import { useEffect, useMemo, useState } from 'react';
import { Alert, Box, Card, CardActionArea, CardContent, Chip, CircularProgress, MenuItem,
  Stack, TextField, Typography } from '@mui/material';
import { API, CLASSES, FOCUSES, GUILD_NAME, ROLES, armoryLink } from '../guildConfig.js';
 
function RosterList() {
  const [members, setMembers] = useState(null);
  const [error, setError] = useState('');
  const [q, setQ] = useState('');
  const [cls, setCls] = useState('');
  const [role, setRole] = useState('');
  const [focus, setFocus] = useState('');
 
  useEffect(() => {
    fetch(`${API}/guild/members`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => (Array.isArray(data) ? setMembers(data) : Promise.reject()))
      .catch(() => setError('Could not load the roster. Try again in a moment.'));
  }, []);
 
  const shown = useMemo(() => (members ?? []).filter((m) =>
    (!q || m.name.toLowerCase().includes(q.toLowerCase())) &&
    (!cls || m.cls === cls) && (!role || m.role === role) && (!focus || m.focus === focus)
  ), [members, q, cls, role, focus]);
 
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!members) return <CircularProgress />;
 
  const top = Math.max(0, ...members.map((m) => m.pvpRank || 0));
 
  return (
    <Box>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        {members.length} members, top PvP rank {top || 'none yet'}. Select a name to open their Armory page.
      </Typography>
 
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 2 }}>
        <TextField size="small" label="Search by name" value={q} onChange={(e) => setQ(e.target.value)} sx={{ flex: 1 }} />
        <TextField size="small" select label="Class" value={cls} onChange={(e) => setCls(e.target.value)} sx={{ minWidth: 140 }}>
          <MenuItem value="">All classes</MenuItem>
          {Object.keys(CLASSES).map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </TextField>
        <TextField size="small" select label="Role" value={role} onChange={(e) => setRole(e.target.value)} sx={{ minWidth: 120 }}>
          <MenuItem value="">All roles</MenuItem>
          {ROLES.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
        </TextField>
        <TextField size="small" select label="Focus" value={focus} onChange={(e) => setFocus(e.target.value)} sx={{ minWidth: 170 }}>
          <MenuItem value="">All focuses</MenuItem>
          {FOCUSES.map((f) => <MenuItem key={f} value={f}>{f}</MenuItem>)}
        </TextField>
      </Stack>
 
      {shown.length === 0 && <Typography color="text.secondary">No members match those filters.</Typography>}
 
      <Box sx={{ display: 'grid', gap: 1.5, gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))' }}>
        {shown.map((m) => (
          <Card key={m._id} variant="outlined" sx={{ borderLeft: 5, borderLeftColor: CLASSES[m.cls] || 'divider' }}>
            <CardActionArea component="a" href={armoryLink(m.name)} target="_blank" rel="noopener noreferrer">
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Typography variant="subtitle1" fontWeight={700} sx={{ color: CLASSES[m.cls] }}>{m.name}</Typography>
                  {m.pvpRank > 0 && <Chip size="small" color="primary" label={`Rank ${m.pvpRank}`} />}
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {m.cls}, {m.role}{m.guildRank ? `, ${m.guildRank}` : ''}
                </Typography>
                {m.title && <Typography variant="body2" fontWeight={600}>{m.title}</Typography>}
                {m.focus && <Chip size="small" variant="outlined" label={m.focus} sx={{ mt: 1 }} />}
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
 
export default function RosterPage() {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>{GUILD_NAME} roster</Typography>
      <RosterList />
    </Box>
  );
}
 
