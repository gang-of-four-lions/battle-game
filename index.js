"use strict";

const express = require("express");
const app = express();
var bodyParser = require('body-parser');

const web_routes = require("./server/web_routes.js");
const game_routes = require("./server/game_routes.js");

const port = process.env.PORT || 8080;

app.use("/", web_routes);
// app.use("/api/*", game_routes);

// app.use(bodyParser.urlencoded({
//   extended: <true></true>
// }));

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log("App running on port:" + port);
});

module.exports = app;
module.exports.port = port;