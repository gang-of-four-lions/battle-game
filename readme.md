# Battle-Game for Slack

## Deployment

1. `npm i` installs dependencies, as usual. After installing, it automatically runs `npm run build-prod` as a postinstall script.

1. `npm run build-prod` builds a web client for production environment (optimized).

1. `npm run watch` builds a web client and starts watching (non-optimized, large file, quick compilation). This does not actually run a server, so it should be started separately.

1. `npm test` runs tests

1. `npm start` starts a server of bot itself and a landing page for it.

