import { Box, Typography } from '@mui/material';
import JoinForm from './JoinForm.jsx';

export default function JoinPage() {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>Join the guild</Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Tell us what you play and how you fight. An officer will contact you on Discord.
      </Typography>
      <JoinForm />
    </Box>
  );
}
