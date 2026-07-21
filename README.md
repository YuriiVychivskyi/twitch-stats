# Twitch Stats

Twitch Stats is a full-stack application for tracking Twitch stream activity and live chat statistics.

Streamers connect their Twitch account through OAuth. The server subscribes to Twitch EventSub lifecycle events, tracks chat activity with a Twitch bot, stores live counters in Redis, and persists completed stream statistics in Firebase Firestore.

## Current Features

- Twitch streamer connection through OAuth
- EventSub subscriptions for `stream.online` and `stream.offline`
- HMAC-SHA256 verification of EventSub webhook signatures
- Timestamp and Redis-based protection against replayed webhook messages
- Twitch chat tracking through `tmi.js`
- Live message and chatter counters in Redis
- Completed stream and chatter persistence in Firestore
- Public streamer profile and live statistics API
- Next.js dashboard with live polling and an animated starfield background

## Tech Stack

### Client

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui and Radix UI

### Server

- Node.js and Express 5
- Twitch OAuth, EventSub, and Helix API
- `tmi.js` Twitch chat client
- Redis
- Firebase Admin and Firestore
- Zod

## Project Structure

```txt
client/   Next.js frontend and dashboard
server/   Express API, Twitch integrations, Redis state, and Firestore writes
```

## Stream Lifecycle

```txt
Streamer connects a Twitch account
-> Server creates or updates the streamer in Firestore
-> Server ensures online and offline EventSub subscriptions
-> Twitch sends a signed stream.online webhook
-> Server verifies the signature and replay protection
-> Server creates a live stream document
-> Redis stores the active stream state
-> Bot joins the streamer's chat
-> Chat messages increment Redis counters
-> Twitch sends a signed stream.offline webhook
-> Server saves final statistics to Firestore
-> Redis live state is cleared
-> Bot leaves the streamer's chat
```

## Environment Variables

Create `server/.env` from `server/.env.example`. Do not commit secrets or service-account files.

```env
PORT=3001
CLIENT_URL=http://localhost:3000

TWITCH_CLIENT_ID=
TWITCH_CLIENT_SECRET=
TWITCH_CALLBACK_URL=http://localhost:3001/api/auth/callback

TWITCH_BOT_CLIENT_ID=
TWITCH_BOT_CLIENT_SECRET=
TWITCH_BOT_REFRESH_TOKEN=
TWITCH_BOT_USERNAME=

GOOGLE_APPLICATION_CREDENTIALS=serviceAccountKey.json

WEBHOOK_CALLBACK_URL=
WEBHOOK_SECRET=

REDIS_HOST=
REDIS_PORT=
REDIS_USERNAME=default
REDIS_PASSWORD=
```

Create `client/.env.local` from `client/.env.example`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Firebase Admin uses Application Default Credentials. Make sure the local environment can access the configured Firebase project before starting the server.

## Install and Run

Install all workspace dependencies from the repository root:

```bash
npm install
```

Start the client and server together:

```bash
npm run dev
```

They run at:

```txt
client: http://localhost:3000
server: http://localhost:3001
```

Individual workspaces can also be started separately:

```bash
npm run dev:client
npm run dev:server
```

## Server Endpoints

```txt
GET  /api/auth/twitch
GET  /api/auth/callback
GET  /api/streamers/:streamerTwitchId
GET  /api/streamers/:streamerTwitchId/live-stats
POST /twitch/webhook
```

## Live Stats Storage

Redis stores live runtime state and short-lived EventSub replay keys:

```txt
streamer:{streamerTwitchId}:activeStream -> twitchStreamId
stream:{twitchStreamId}:stats             -> totalMessages
stream:{twitchStreamId}:chatters          -> chatterTwitchId -> messagesCount
stream:{twitchStreamId}:chatterMeta       -> chatterTwitchId -> metadata JSON
eventsub:message:{messageId}              -> processed, TTL 10 minutes
```

Firestore stores streamer profiles and completed stream history.

## Code Quality Checks

Run these commands from the repository root:

```bash
npx eslint server/src
npm run lint:client
npm run build:client
```

## Current Limitations

- Previous streams shown in the dashboard are still mock data.
- Messages per minute is not calculated yet.
- Live statistics currently use polling instead of a WebSocket connection.
- Stream finalization needs stronger failure recovery before Redis data is removed.
- Automated tests have not been added yet.

## Security Notes

- EventSub requests are verified using the configured webhook secret and HMAC-SHA256.
- EventSub timestamps and message IDs are checked to reduce replay attacks.
- `.env` files, Twitch credentials, Firebase credentials, and service-account files must never be committed.
