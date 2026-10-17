# synctwobe • [![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=black)](https://react.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Bun](https://img.shields.io/badge/Bun-1.4+-f471b5?style=flat-square&logo=bun&logoColor=white)](https://bun.sh) [![Hono](https://img.shields.io/badge/Hono-4.0+-orange?style=flat-square&logo=hono&logoColor=white)](https://hono.dev) [![Supabase](https://img.shields.io/badge/Supabase-3ecf8e?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com/)

Watch YouTube videos in sync with other people. Create a room, share the link, no account necessary. Chat and playback events go over one WebSocket; backend cold starts in under 10 seconds on Render's free tier (baseline is 30-60s).


## Use it
[https://syncyt.vercel.app/](https://syncyt.vercel.app/)

> *!! Early beta:* synctwobe is in early development, expect changes and unpolished features.

## Features

### Real-time Synchronization

Play, pause and seek are sent as small events over the WebSocket. The server keeps each room's current timestamp and play state in memory and broadcasts changes to the other clients in the room.

- *Late joiners:* A user who joins mid-video starts at the room's current timestamp and play state.
- *Seeking:* A seek by any viewer moves everyone to the same position.
- *Drift:* Corrected only on play, pause and seek events. Each event type has its own tolerance, so small differences are ignored and the timestamp is corrected only when it is clearly off. There is no continuous resync.
- *Event payloads:* Each event carries the action and a timestamp, the drift correction runs on the client.

### Live Chat

Messages go over the same WebSocket as playback events, so there is no separate chat connection.

- *Display names:* Changing your name sends one small message over the open socket. It applies to your next message with no rejoin and no page reload, and does not change your previous messages.
- *Profile pictures:* Set by image URL. The server stores the URL string only, never image data, so there are no uploads to moderate or store.
- *Room history:* Messages are currently kept per room only while the server runs (see Known Limitations).


### URL-based Rooms

A room is just a URL. There is no signup, no login and no room setup.

- *Creating:* Create a room with one click from the home page.
- *Joining:* Enter the room ID on the home page, or open `https://syncyt.vercel.app/r/{ROOM_ID}`. You get the current video, position and chat history.

### Accounts and Database

Supabase backs optional accounts. Room state, playback and chat messages do not use it.

- *Auth:* Signing in is optional. Guests can use every room feature without an account.
- *Default profile:* An account stores a default display name and profile picture URL, which are applied when you join a room. You can toggle between both inside the chat settings.
- *Scope:* The database currently holds auth and these two profile fields only. Chat history and room state remain in server memory. More will move to it later (see Roadmap).

## Setup and Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/ic0e/sync-yt
cd sync-yt
bun install
bun run dev
```

Frontend runs on `http://localhost:5173`. Backend (Hono) runs on `http://localhost:3000`.


## Known Limitations

- YouTube videos only.
- Chat and room state persist only while the server is running.
- Accounts are a work in progress.

## Roadmap
- Move chat and room history into the database.
- Support for other video platforms.

## License
This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
