import { Box, Typography } from '@mui/material';
import { GUILD_NAME, PRIVACY_CONTACT, PRIVACY_UPDATED } from '../guildConfig.js';

const Section = ({ title, children }) => (
  <Box sx={{ mt: 3 }}>
    <Typography variant="h6" component="h2" gutterBottom>{title}</Typography>
    {children}
  </Box>
);

const P = ({ children }) => <Typography sx={{ mb: 1 }}>{children}</Typography>;

export default function PrivacyPage() {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>Privacy notice</Typography>
      <Typography color="text.secondary">Last updated {PRIVACY_UPDATED}</Typography>

      <Section title="Who we are">
        <P>
          {GUILD_NAME} is a player-run guild for World of Warcraft: Forever. This website shows our
          roster and lets people apply to join. We do not sell anything on this site.
        </P>
      </Section>

      <Section title="What we collect">
        <P>
          <strong>Join applications.</strong> When you apply, you give us the details you type into the form:
          your character name, level, class, spec, role, PvP focus and ranks, your Discord username,
          whether you use voice chat, your availability, and your PvP experience and goals.
          Please do not put anything in the form that you would not want our officers to read.
        </P>
        <P>
          <strong>Server logs.</strong> Like most websites, our web server records visitors&rsquo; IP addresses
          and basic request details in standard logs, for security and troubleshooting.
        </P>
        <P>
          <strong>The roster.</strong> The roster lists the character names, classes, roles and PvP ranks of
          current members, who have agreed to be listed.
        </P>
      </Section>

      <Section title="Why we collect it">
        <P>
          We use application details to review your application and to contact you on Discord. We use
          logs to keep the site secure and working. We do not use your details for advertising.
        </P>
      </Section>

      <Section title="Who can see it">
        <P>
          Applications are stored in our database and posted to a private channel on our Discord server
          that only officers can read. We use these services to run the site: Discord, MongoDB (database),
          Google Cloud (hosting) and Cloudflare (network and security). They process data on our behalf
          under their own privacy terms. We do not sell or share your details with anyone else.
        </P>
      </Section>

      <Section title="Cookies">
        <P>
          This site does not use cookies for tracking or advertising, and has no analytics. Officers who
          sign in have a login token saved in their browser. Cloudflare may set cookies that are needed
          for security.
        </P>
      </Section>

      <Section title="How long we keep it">
        <P>
          We keep an application while we are reviewing it and, for accepted members, while you stay in
          the guild. We delete declined applications once they are no longer needed.
        </P>
      </Section>

      <Section title="Your choices">
        <P>
          You can ask to see, correct or delete the information you gave us at any time. Contact{' '}
          {PRIVACY_CONTACT}. You can also ask to be removed from the roster.
        </P>
      </Section>

      <Section title="Changes">
        <P>If we change this notice, we will update the date at the top of this page.</P>
      </Section>
    </Box>
  );
}
