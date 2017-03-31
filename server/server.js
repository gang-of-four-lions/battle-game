"use strict";

const express = require("express");
const app = express();
var bodyParser = require('body-parser');
//const path = require('path');

//const web_routes = require("./web_routes.js");
//const game_routes = require("./game_routes.js");

const GE = require("./game_engine/main");

app.set('port', process.env.PORT || 8080);

app.use(bodyParser.urlencoded({
  extended: true
}));

//app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use("/api/*",(req,res)=>{
    console.log("Routing message...");
    GE.messageRouter(req.body,(err,data)=>{
       if(err){ console.log("ERROR: "+err); res.status(200).send(err);  return; }
       res.status(200).send(data);
       return;
    });  
});

//app.use("/", web_routes);

module.exports = app;
