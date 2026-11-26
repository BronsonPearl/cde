import { Link } from 'react-router-dom';
import { Box, Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import emblem from '../assets/images/cdeEmblem.jpg';
import { BRAND_RED, GUILD_NAME, TAGLINE } from '../guildConfig.js';
 
const Point = ({ title, children }) => (
  <Box>
    <Typography variant="h6" component="h2" gutterBottom>{title}</Typography>
    <Typography color="text.secondary">{children}</Typography>
  </Box>
);
 
// A whole card is one link to another page
const LinkCard = ({ to, title, children }) => (
  <Card sx={{
    bgcolor: 'rgba(0,0,0,.55)', backdropFilter: 'blur(4px)', color: '#fff',
    border: '1px solid', borderColor: BRAND_RED, borderRadius: 2,
    transition: 'background-color .15s',
    '&:hover': { bgcolor: BRAND_RED },
  }}>
    <CardActionArea component={Link} to={to} sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h5" component="h2" fontWeight={700} gutterBottom>{title}</Typography>
        <Typography>{children}</Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);
 
export default function Home() {
  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{
        bgcolor: BRAND_RED, color: '#fff', borderRadius: 2, overflow: 'hidden',
        display: 'grid', alignItems: 'center', gap: 2,
        gridTemplateColumns: { xs: '1fr', sm: '1.4fr 1fr' },
      }}>
        <Stack spacing={2} sx={{ p: { xs: 3, sm: 5 } }}>
          <Typography variant="h3" component="h1" fontWeight={800}>Welcome to {GUILD_NAME}</Typography>
          <Typography variant="h6" component="p" fontWeight={400}>
            {TAGLINE}. Grab a drink, queue up and fight alongside us.
          </Typography>
        </Stack>
        <Box component="img" src={emblem} alt={`${GUILD_NAME} emblem: two beer mugs clinking`}
          sx={{ width: '100%', maxWidth: 320, justifySelf: 'center', display: 'block' }} />
      </Box>
 
      <Box sx={{ mt: 3, display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
        <LinkCard to="/roster" title="Meet the roster">
          See who is in the guild, their classes and PvP ranks, and open their Armory pages.
        </LinkCard>
        <LinkCard to="/join" title="Join the guild">
          Send an application and an officer will contact you on Discord.
        </LinkCard>
      </Box>
 
      <Box sx={{ mt: 5, display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
        <Point title="What we play">
          We are a PvP-first guild in World of Warcraft: Forever. We run battlegrounds, hunt in the
          open world and climb the PvP rank track together.
        </Point>
        <Point title="Who we want">
          Players who like a good fight and good company. Bring your class, your role and your
          sense of humour, whether you are chasing your first rank or already near the top.
        </Point>
        <Point title="How to join">
          Look through the roster to see who is already here, then send an application. An officer
          will contact you on Discord.
        </Point>
      </Box>
    </Box>
  );
}
 
