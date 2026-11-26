import { Container, Typography } from '@mui/material';
import Roster from './Roster.jsx';
import JoinForm from './JoinForm.jsx';
import { GUILD_NAME } from './guildConfig.js';

export default function GuildPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>{GUILD_NAME} roster</Typography>
      <Roster />

      <Typography variant="h4" component="h2" sx={{ mt: 6, mb: 1 }}>Join the guild</Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Tell us what you play and how you fight. An officer will contact you on Discord.
      </Typography>
      <JoinForm />
    </Container>
  );
}
