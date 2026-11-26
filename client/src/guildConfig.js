// Edit these to match your guild.
export const GUILD_NAME = 'CDE';
export const REGION = 'us';

// Forever has no realms: characters are first + last name. {region} and {name} are filled in.
// Check this against a real character page and adjust if Blizzard's format differs.
export const ARMORY_URL =
  'https://worldofwarcraft.blizzard.com/en-us/forever/{region}/armory/character/{name}';

export const armoryLink = (name) =>
  ARMORY_URL.replace('{region}', REGION)
    .replace('{name}', encodeURIComponent(name.trim().toLowerCase().replace(/['’]/g, '').replace(/\s+/g, '-')));

export const CLASSES = {
  Druid: '#FF7C0A', Hunter: '#AAD372', Mage: '#3FC7EB', Paladin: '#F48CBA', Priest: '#999999',
  Rogue: '#BFA900', Shaman: '#0070DD', Warlock: '#8788EE', Warrior: '#C69B6D',
};
export const ROLES = ['Tank', 'Healer', 'DPS'];
export const FOCUSES = ['Warsong Gulch', 'Arathi Basin', 'Darkspear Islands', 'Alterac Valley',
  'World PvP', 'All battlegrounds'];

// If the client and server run on different origins and you have no Vite proxy,
// set VITE_API_URL=http://localhost:3001 in client/.env
export const API = import.meta.env.VITE_API_URL ?? '';

// Branding (red sampled from the emblem image)
export const BRAND_RED = '#b1002e';
export const TAGLINE = 'A PvP guild for World of Warcraft: Forever';

// Privacy page: how people reach you about their data, and when the page was last changed
export const PRIVACY_CONTACT = 'an officer on our Discord server';
export const PRIVACY_UPDATED = 'November 26, 2026';
