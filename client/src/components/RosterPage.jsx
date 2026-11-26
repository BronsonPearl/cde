import { Box, Typography } from '@mui/material';
import Roster from './Roster.jsx';
import { GUILD_NAME } from './guildConfig.js';

export default function RosterPage() {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>{GUILD_NAME} roster</Typography>
      <Roster />
    </Box>
  );
}
