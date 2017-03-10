"use strict";

const express = require("express");
const app = express();
var bodyParser = require('body-parser');
const path = require('path');

const web_routes = require("./web_routes.js");
const game_routes = require("./game_routes.js");

app.set('port', process.env.PORT || 8080);

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// app.use("/api/*", game_routes);
app.use("/", web_routes);

module.exports = app;
