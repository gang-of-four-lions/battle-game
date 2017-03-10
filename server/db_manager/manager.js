"use strict";

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOURI);

var exports = module.exports = {};
const User = require('./models/users.js');
const Action = require('./models/actions.js');
const Obj = require('./models/objs.js');


//Helper Functions ----------------

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
    "pants": [ "PlayerBuild","pants" ],
    "actions": [ "playerStats","actions"]
};

function lookUpUser(slackID,cb){
    if(typeof(slackID)!=="string" || slackID===""){ cb("Invaild name input, name must be a valid string.",null); return; }
    User.find({ slackID:slackID },(err,doc)=>{
        if(err || doc.length===0){ cb("Error finding "+slackID,null); return; }
       cb(null,doc[0]);
       return;
    });
};

function lookUpAction(id,cb){
    if(typeof(id)!=="string" || id===""){ cb("Invaild ID input, name must be a valid string.",null); return; }
    Action.find({ id:id },(err,doc)=>{
        if(err || doc.length===0){ cb("Error finding "+id+" - "+err,null); return; }
       cb(null,doc[0]);
       return;
    });
};

function lookUpObject(id,cb){
    if(typeof(id)!=="string" || id===""){ cb("Invaild ID input, name must be a valid string.",null); return; }
    Obj.find({ id:id },(err,doc)=>{
        if(err || doc.length===0){ cb("Error finding "+id+" - "+err,null); return; }
       cb(null,doc[0]);
       return;
    });
};

//-----------------------------------

//User Functions -------------------

exports.getUser=function(slackID,cb){
    lookUpUser(slackID,cb);
};

exports.createUser=function(data,cb){
    if(!data){ cb("Must provide data with name and slackID",null); return; }
    const newUser = new User(data);
    newUser.save((err)=>{
       if(err){  cb("Must provide data with name and slackID",null); return; }
       cb(null,"done");
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

//functions based on lookupTable
//-----------------------------
   
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

    exports.modUser = function(slackID,obj,cb){
    if(obj===null || typeof(obj)!="object" ){ cb("Invaild object",null); return; }
    lookUpUser(slackID,(err,doc)=>{
        if(err){ cb(err,null); return; }
        for(let prop in obj) { 
         if(lookUpTable[prop]!==undefined){
             if(lookUpTable[prop].length===1){ doc[ lookUpTable[prop][0] ]= obj[prop]; }
             else if(lookUpTable[prop].length===2){ doc[ lookUpTable[prop][0] ][ lookUpTable[prop][1] ]+= obj[prop]; }
             else if(lookUpTable[prop].length===3){ doc[ lookUpTable[prop][0] ][ lookUpTable[prop][1] ][ lookUpTable[prop][2] ]+= obj[prop]; }
             else if(lookUpTable[prop].length===4){ doc[ lookUpTable[prop][0] ][ lookUpTable[prop][1] ][ lookUpTable[prop][2] ][ lookUpTable[prop][3] ]+= obj[prop]; }
         }
        }
        doc.save(err=>{
           if(err){ cb("Error saving doc",null); return; }
           cb(null,"Updated");
        });
    });
};

    exports.getStatsKey = function(slackID,key,cb){
    if(key===null || typeof(key)!="string" ){ cb("Invaild key",null); return; }
    lookUpUser(slackID,(err,doc)=>{
        if(err){ cb(err,null); return; }
         if(lookUpTable[key]!==undefined){
             if(lookUpTable[key].length===1){ cb(null,doc[ lookUpTable[key][0] ]); }
             else if(lookUpTable[key].length===2){ cb(null,doc[ lookUpTable[key][0] ][ lookUpTable[key][1] ]); }
             else if(lookUpTable[key].length===3){ cb(null,doc[ lookUpTable[key][0] ][ lookUpTable[key][1] ][ lookUpTable[key][2] ]); }
             else if(lookUpTable[key].length===4){ cb(null,doc[ lookUpTable[key][0] ][ lookUpTable[key][1] ][ lookUpTable[key][2] ][ lookUpTable[key][3] ]); }
         }
    });
};
//-------------------------

//Action functions --------------
exports.createAction=function(data,cb){
    if(!data){ cb("Must provide data with name and ID",null); return; }
    const newAction = new Action(data);
    newAction.save((err,doc)=>{
       if(err){  cb("Must provide data with name and ID",null); return; }
       cb(null,"done");
       return;
    });
};

exports.getAction=function(id,cb){
    lookUpAction(id,cb);
};

exports.addActionToPlayer=function(slackID,actionID,cb){
    lookUpUser(slackID,(err,doc)=>{
       if(err){ cb(err,null); return; }
       doc.playerStats.actions.push(actionID);
       doc.save((err,cb)=>{
          if(err){ cb("Unable to save in addAction",null); return; }
          cb(null,"done");
          return;
       });
    });
};

//Object Functions --------------

exports.createObject=function(data,cb){
    if(!data){ cb("Must provide data with name and ID",null); return; }
    const newObject = new Obj(data);
    newObject.save((err,doc)=>{
       if(err){  cb("Error saving new Object "+data.id,null); return; }
       cb(null,"done");
       return;
    });
};

exports.getAction=function(id,cb){
    lookUpObject(id,cb);
};

exports.addObjectToPlayer=function(slackID,objectID,cb){
    lookUpUser(slackID,(err,doc)=>{
       if(err){ cb(err,null); return; }
       doc.playerStats.inventory.objs.push(objectID);
       doc.save((err,cb)=>{
          if(err){ cb("Unable to save in addObject",null); return; }
          cb(null,"done");
          return;
       });
    });
};