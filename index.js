const app = require('./server/server.js');

app.listen(app.get('port'), (err) => {
  if (err) {
    throw err;
  }
  console.log(`listening on port ${app.get('port')}`);
});
