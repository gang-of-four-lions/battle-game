"use strict";

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOURI);

var exports = module.exports = {};
const User = require('./models/users.js');

/*
exports.User = require('./models/users.js');
exports.Action = require('./models/actions.js');
exports.Obj = require('./models/objs.js');
*/

function lookUpUser(name,cb){
    if(typeof(name)!=="string" || name===""){ cb("Invaild name input, name must be a valid string.",null); return; }
    User.find({ name:name },(err,doc)=>{
        if(err || doc.length===0){ cb("Error finding "+name,null); return; }
       cb(null,doc[0]);
       return;
    });
};

exports.getUser=function(name,cb){
    lookUpUser(name,cb);
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

exports.removeUser=function(name,cb){
     if(typeof(name)!=="string" || name===""){ cb("Invaild name input, name must be a valid string.",null); return; }
     User.remove({ name:name },(err)=>{
        if(err){ cb("Error removing "+name,null); return; }
        cb(null,"done");
        return;
     });
};

exports.getInventory=function(userName,cb){
    lookUpUser(userName,(err,doc)=>{
       if(err){ cb(err,null); return; }
       cb(null,doc.playerStats.inventory);
       return;
    });
};

exports.getDisplay=function(userName,cb){
    lookUpUser(userName,(err,doc)=>{
       if(err){ cb(err,null); return; }
       cb(null,doc.displayData);
       return;
    });  
};

exports.getStats = function(userName,cb){
    lookUpUser(userName,(err,doc)=>{
       if(err){ cb(err,null); return; }
       cb(null,doc.playerStats);
       return;
    });   
};