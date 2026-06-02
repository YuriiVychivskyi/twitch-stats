# Twitch Stats

Twitch Stats is a full-stack application for tracking Twitch stream activity and live chat statistics.

The app connects Twitch streamers through OAuth, subscribes to Twitch EventSub stream lifecycle events, tracks live chat activity with a Twitch bot, stores live counters in Redis, and saves final stream history in Firestore.

## Tech Stack

- Next.js client
- Express server
- Twitch OAuth and EventSub
- Twitch chat bot with `tmi.js`
- Redis for live stream counters
- Firebase Firestore for persisted stream history
- Zod for server-side data validation

## Project Structure

```txt
client/   Next.js frontend
server/   Express API, Twitch integrations, Redis state, Firestore writes
```

## Current Flow

```txt
Streamer connects Twitch account
-> Server creates/updates streamer in Firestore
-> Server ensures EventSub subscriptions
-> Twitch sends stream.online webhook
-> Server creates live stream document
-> Redis stores active stream state
-> Bot joins streamer chat
-> Chat messages increment Redis counters
-> Twitch sends stream.offline webhook
-> Server saves final stats to Firestore
-> Redis live state is cleared
-> Bot leaves streamer chat
```

## Environment Variables

Create a local `.env` file for the server. Do not commit it.

```env
PORT=3001
NODE_ENV=development

TWITCH_CLIENT_ID=
TWITCH_CLIENT_SECRET=
TWITCH_CALLBACK_URL=
WEBHOOK_SECRET=

TWITCH_BOT_USERNAME=
TWITCH_BOT_ACCESS_TOKEN=

REDIS_HOST=
REDIS_PORT=
REDIS_USERNAME=
REDIS_PASSWORD=
```

Firebase Admin uses Application Default Credentials, so make sure your local environment is authenticated or configured before starting the server.

## Install

```bash
npm install
```

## Run

Start the server:

```bash
npm run dev --workspace=server
```

Start the client:

```bash
npm run dev:client
```

By default:

```txt
client: http://localhost:3000
server: http://localhost:3001
```

## Server Endpoints

```txt
GET  /api/auth/twitch
GET  /api/auth/callback
POST /twitch/webhook
```

## Live Stats Storage

Redis is used only for live runtime state.

```txt
streamer:{streamerTwitchId}:activeStream -> twitchStreamId
stream:{twitchStreamId}:stats             -> totalMessages
stream:{twitchStreamId}:chatters          -> chatterTwitchId -> messagesCount
stream:{twitchStreamId}:chatterMeta       -> chatterTwitchId -> metadata JSON
```

Firestore is used for persisted stream history after a stream ends.

## Notes

- `.env` and service account files must stay out of git.
- Redis stores live counters; final stream data is saved to Firestore on `stream.offline`.
- The bot connects once when the server starts and joins/leaves channels based on Twitch EventSub events.
