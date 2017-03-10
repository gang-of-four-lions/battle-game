# Battle-Game for Slack

## How to play a game

1. Well, the game is not ready. You should **The Gang of Four Lions** us to develop it.

1. The process of writing and debugging code, comitting changes, creating pull requests and merging branches is actually a pretty good game itself.

1. After it will be completed, you will be too tired to play another game.

## Deployment

1. `npm i` installs dependencies, as usual. After installing, it automatically runs `npm run build-prod` as a postinstall script (It also applies to heroku).

1. `npm run build-prod` builds a web client for production environment (optimized).

1. `npm run watch` builds a web client and starts watching (non-optimized, large file, quick compilation). This does not actually run a server, so it should be started separately.

1. `npm test` runs tests

1. `npm start` starts a server of bot itself and a landing page for it.

