"use strict";

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOURI );

var exports = module.exports = {};
const User = require('./models/users.js');
const Action = require('./models/actions.js');

//Helper Functions

const lookUpTable = {
    "id": [ "id" ],
    "name": [ "name" ],
    "slackID": [ "slackID" ],
    "HP": [ "playerStats","HP "],
    "MP": [ "playerStats","MP" ],
    "EXP": [ "playerStats","EXP" ],
    "LVL": [ "playerStats","LVL" ],
    "CLASS": [ "playerStats","CLASS" ],
    "resWater": [ "playerStats","resistants","water" ],
    "resFire": [ "playerStats","resistants","fire" ],
    "resEarth": [ "playerStats","resistants","earth" ],
    "resWood": [ "playerStats","resistants","wood" ],
    "resMetal": [ "playerStats","resistants","metal" ],
    
    "atcWater": [ "playerStats","attackBounces","water" ],
    "atcFire": [ "playerStats","attackBounces","fire" ],
    "atcEarth": [ "playerStats","attackBounces","earth" ],
    "atcWood": [ "playerStats","attackBounces","wood" ],
    "atcMetal": [ "playerStats","attackBounces","metal" ],
    
    "coin": [ "playerStats","inventory","coin" ],
    "frontImage": [ "displayData","frontImage" ],
    "backImage":[ "displayData","backImage" ],
    "wins":[ "displayData","wins" ],
    "gamesPlayed": [ "displayData","gamesPlayed" ],
    "classType": [ "PlayerBuild","classtype" ],
    "head": [ "PlayerBuild","head" ],
    "body": [ "PlayerBuild","body" ],
    "shirt": [ "PlayerBuild","shirt" ],
    "pants": [ "PlayerBuild","pants" ]
};

function lookUpUser(slackID,cb){
    if(typeof(slackID)!=="string" || slackID===""){ cb("Invaild name input, name must be a valid string.",null); return; }
    User.find({ slackID:slackID },(err,doc)=>{
        if(err || doc.length===0){ cb("Error finding "+slackID,null); return; }
       cb(null,doc[0]);
       return;
    });
};

function lookUpAction(name,cb){
    if(typeof(name)!=="string" || name===""){ cb("Invaild name input, name must be a valid string.",null); return; }
    Action.find({ name:name },(err,doc)=>{
        if(err || doc.length===0){ cb("Error finding "+name+" - "+err,null); return; }
       cb(null,doc[0]);
       return;
    });
};

//User Functions

exports.getUser=function(slackID,cb){
    lookUpUser(slackID,cb);
};

exports.createUser=function(data,cb){
    if(!data){ cb("Must provide data with name and slackID",null); return; }
    const newUser = new User(data);
    newUser.save((err,doc)=>{
       if(err){  cb("Must provide data with name and slackID",null); return; }
       cb(null,doc._id);
       return;
    });
};

exports.removeUser=function(slackID,cb){
     if(typeof(slackID)!=="string" || slackID===""){ cb("Invaild name input, name must be a valid string.",null); return; }
     User.remove({ slackID:slackID },(err)=>{
        if(err){ cb("Error removing "+slackID,null); return; }
        cb(null,"done");
        return;
     });
};

exports.getInventory=function(slackID,cb){
    lookUpUser(slackID,(err,doc)=>{
       if(err){ cb(err,null); return; }
       cb(null,doc.playerStats.inventory);
       return;
    });
};

exports.getDisplay=function(slackID,cb){
    lookUpUser(slackID,(err,doc)=>{
       if(err){ cb(err,null); return; }
       cb(null,doc.displayData);
       return;
    });  
};

exports.getStats = function(slackID,cb){
    lookUpUser(slackID,(err,doc)=>{
       if(err){ cb(err,null); return; }
       cb(null,doc.playerStats);
       return;
    });   
};
   
exports.updateUser = function(slackID,obj,cb){
    if(obj===null || typeof(obj)!="object" ){ cb("Invaild object",null); return; }
    lookUpUser(slackID,(err,doc)=>{
        if(err){ cb(err,null); return; }
        for(let prop in obj) { 
         if(lookUpTable[prop]!==undefined){
             if(lookUpTable[prop].length===1){ doc[ lookUpTable[prop][0] ]= obj[prop]; }
             else if(lookUpTable[prop].length===2){ doc[ lookUpTable[prop][0] ][ lookUpTable[prop][1] ]= obj[prop]; }
             else if(lookUpTable[prop].length===3){ doc[ lookUpTable[prop][0] ][ lookUpTable[prop][1] ][ lookUpTable[prop][2] ]= obj[prop]; }
             else if(lookUpTable[prop].length===4){ doc[ lookUpTable[prop][0] ][ lookUpTable[prop][1] ][ lookUpTable[prop][2] ][ lookUpTable[prop][3] ]= obj[prop]; }
         }
        }
        doc.save(err=>{
           if(err){ cb("Error saving doc",null); return; }
           cb(null,"Updated");
        });
    });
};