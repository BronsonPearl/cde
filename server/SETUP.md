Adding the roster and join form to cde
1. Server (3 steps)

Copy into server/:

models/Member.js
models/Application.js
routes/guild-routes.js

Then edit server/server.js. Add the import next to the other route imports:

js
import guildRoutes from './routes/guild-routes.js';

and mount it next to the other app.use lines. Do NOT put authMiddleware here; the routes apply it themselves so the roster and the form stay public:

js
app.use('/guild', guildRoutes);
2. Client

Layout inside client/src/:

guildConfig.js
MainRouter.jsx
core/Home.jsx
components/Roster.jsx
components/JoinForm.jsx
components/PhotosPage.jsx
assets/images/cdeEmblem.jpg
assets/gallery/          (put photos here)

Edit guildConfig.js (guild name, region). If you don't use a Vite proxy, set VITE_API_URL=http://localhost:3001 in client/.env.

3. Add your members

Officers must be logged in to add members. Until there is an admin page, the quickest way is MongoDB Atlas or Compass: open the members collection and insert documents like

json
{ "name": "Arthas Fan", "cls": "Warrior", "role": "Tank", "guildRank": "Guild Master",
  "pvpRank": 14, "title": "High Warlord", "focus": "Alterac Valley" }

Applications arrive in the applications collection with status "new". You can also read them via GET /guild/applications with your login token.

Notes
authMiddleware only checks that someone is logged in. If regular users can register, they could also read applications and edit the roster. Add an officer/admin check before launch.
Consider rate-limiting POST /guild/applications (e.g. express-rate-limit).
The Armory link format for Forever came from a third-party article; verify it with a real character.
Photos

Drop image files (jpg, png, webp, gif) into client/src/assets/gallery/. They appear on /photos automatically, sorted by file name. The file name becomes the caption, so arathi-basin-win.jpg shows as "arathi basin win". Rebuild or redeploy the client after adding photos.

Login

The Login and Register buttons are gone from the nav bar, but /login and /register still work if you type the address. Officers use /login to sign in; once signed in, a Sign out button appears.
