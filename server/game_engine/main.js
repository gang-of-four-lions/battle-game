"use strict";
var request = require('request'); //Used for post command
var exports = module.exports = {};
const manager = require("../db_manager/manager.js");
//manager.createUser({ name:"Josh5231", slackID:"Josh5231", playerStats:{ inventory:{ obj:["test1"] } } },(err)=>{ console.log("ERROR!"); return; });

const LSD = { 
players: [ ], // { id:String, url:String, state:String, zone:Number } 
games: [],
getPlayerState: function(playerID){
    const p=this.players.find((ply)=>{ return ply.id===playerID; });
    if(p){ return p.state; }
    return null;
}, //looks up and returns player state^
getCallback: function(playerID){
    console.log("getting url for:"+playerID);
    const p=this.players.find((ply)=>{ return ply.id===playerID; });
    if(p){ return p.url; }
    return null;
}, //looks up and returns player's url
getRooms: function(zone){
    return this.games.filter((cv)=>{ return cv.loc.zone===zone;  });
    },
setPlayerZone: function(playerID,zone){
  const p=this.players.find((ply)=>{ return ply.id===playerID; });  
  if(!p){ return "Error invaild playerID in setPlayerZone"; }
  p.zone = zone;
  return;
},
getPlayerZone: function(playerID){
    const p=this.players.find((ply)=>{ return ply.id===playerID; });  
    return p.zone;
},
};



const predefMessages = {
    intro:{
    "text": "Welcome to the *Lion's Den*",
    "attachments": [
        {
            "text": "Choose the type of game you want to play:",
            "fallback": "You are unable to choose a game",
            "callback_id": "wopr_game",
            "color": "#A0A0A0",
            "attachment_type": "default",
			"footer": "Vist us at  <http://www.lionsden.com|LionsDen.com>",
            "actions": [
                {
                    "name": "Network game",
                    "text": "Network game",
                    "type": "button",
                    "value": "netGame"
                },
                {
                    "name": "Single Player",
                    "text": "Single Player",
                    "type": "button",
                    "value": "singlePlayer"
                }
            ]
        }
    ]
},
    zones:{
    "text": "Welcome ",
    "attachments": [
        {
            "text": "Please select your zone:",
            "fallback": "You are unable to choose a zone",
            "callback_id": "wopr_zone",
            "color": "#A0A0A0",
            "attachment_type": "default",
			"footer": "Vist us at  <http://www.lionsden.com|LionsDen.com>",
            "actions": [
                {
                    "name": 1,
                    "text": "Zone 1",
                    "type": "button",
                    "value": "zone"
                },
                {
                    "name": 2,
                    "text": "Zone 2",
                    "type": "button",
                    "value": "zone"
                },
				{
                    "name": 3,
                    "text": "Zone 3",
                    "type": "button",
                    "value": "zone"
                },
				{
                    "name": 4,
                    "text": "Zone 4",
                    "type": "button",
                    "value": "zone"
                }
            ]
        }
    ]
},
};

const buildRoomMessage = function(zone){
  const rooms = LSD.getRooms(zone);
  console.log("# of rooms:"+rooms.length);
  let out = {
    "text": "Welcome ",
    "attachments": [
            {
            "text": "Please select your room:",
            "fallback": "You are unable to choose a zone",
            "callback_id": "wopr_room",
            "color": "#A0A0A0",
            "attachment_type": "default",
			"footer": "Vist us at  <http://www.lionsden.com|LionsDen.com>",
            "actions": []
            }
        ]
    };
    
    rooms.forEach((cv)=>{
        out.attachments[0].actions.push(
            {
               "name": cv.loc.room,
                "text": "Room "+cv.loc.room,
                "type": "button",
                "value": "room" 
            });
    });

    return out;
};

const buildGamesMessage = function(zone,room){
  let games = LSD.getRooms(+zone);
  games = games.filter((cv)=>{ return cv.loc.room === +room; });
  let out = {
    "text": "Welcome ",
    "attachments": [
            {
            "text": "Please select your game:",
            "fallback": "You are unable to choose a game",
            "callback_id": "wopr_game",
            "color": "#A0A0A0",
            "attachment_type": "default",
			"footer": "Vist us at  <http://www.lionsden.com|LionsDen.com>",
            "actions": []
            }
        ]
    };
    games.forEach((cv)=>{
        out.attachments[0].actions.push(
            {
               "name": cv.loc.name,
                "text": "Game "+cv.loc.name,
                "type": "button",
                "value": "game" 
            });
    });
    
    if(games.length<10){
        out.attachments[0].actions.push(
            {
               "name": "new",
                "text": "New Game",
                "type": "button",
                "value": "game" 
            });
    }
    return out;
};

exports.messageRouter = function(data,cb){
    //data === req.body

  if(!data.payload) //This is being sent via slash command
    {
      verifyPlayer(data,(err,res)=>{
          if(err){ cb(err,null); return; }
          if(res==="help"){ addUser(data);  sendMessage(data.user_name, predefMessages.intro ,cb); return; }
          if(res==="done"){ sendMessage(data.user_name, predefMessages.intro ,cb); return; } //Send intro message
      }); 
      return;
    }
  else{ //If getting message from a button
      const buttonData = JSON.parse(data.payload); //Parse payload data about the button
      console.log("Button Pressed: "+buttonData.actions[0].value);
      updateUser(buttonData.user.name,buttonData.response_url);
      switch (buttonData.actions[0].value) { //Each button will have a value + name
        case 'netGame': //Into message - Network game button
            sendMessage(buttonData.user.name, predefMessages.zones ,cb); //Send zone selection method
            return;
        case 'singlePlayer':
            //Add code here to start single player mode...
            return;
        case 'zone':
            //get zone name with buttonData.actions[0].name
            const zoneName = buttonData.actions[0].name;
            LSD.setPlayerZone(buttonData.user.name,zoneName);
            //get list of rooms and build message, then send
            sendMessage(buttonData.user.name,buildRoomMessage(+zoneName),cb);
            
            return;
        case 'room':
            const roomName = buttonData.actions[0].name;
            //get list of games in the room and build and then send
            sendMessage(buttonData.user.name,buildGamesMessage(LSD.getPlayerZone(buttonData.user.name),roomName),cb);
            return;
        }
  }
};

const verifyPlayer=function(req,cb){
    manager.getUser(req.user_name,(err,data)=>{
        if(err){ cb(err,null); return "err"; } //routes should check for err
        if(LSD.players.findIndex((p)=>{ return p.id===req.user_name; }) ){
            cb(null,"help");
            return "help"; //routes should send help text
        }
        else{
            //addPlayerLSD(req);
            cb(null,"done");
            return "done"; //routes should send "gameSelect"
        }
    });
};

const addPlayerLSD=function(data){
   LSD.players.push({ id:data.user_id,url:data.callback_url,state:"gameSelect" });
   return;
};

const sendMessage=function(playerID,msg,cb){
    //Format and send message to player using callback_url
    const url = LSD.getCallback(playerID); //Grab the player's callback url
    if(!url){ cb("Callback_url error in send message.",null); return; }
    request(
        {
        url: url,
        method: "POST",
        json: true,   // <--Very important!!!
        body: msg
        }, 
        function (err){
        if(err){ cb(err,null); return; }
        cb(null);
        });
    return;
};

const setupGame=function(opt){
    //opt = { type:String, background:URL }
    LSD.games.push({
        id: "000", //TODO generate unquie ID
        loc: { zone:opt.zone, room:opt.room, name:opt.name },
        state:"waiting", //Set init state to indicate it is waiting for players
        type:opt.type, // "1vrAI","1vr1","2vr2",ect..
        players:[], // Array of players in the game
        background:opt.background,
        updateCount: 0, 
        teamA:0,
        teamB:0,
        timer:0
    });
};

const addPlayerToGame=function(playerID,gameID){};

const updateGame=function(reqBody,cb){};

const deleteGame=function(gameID){};

const removeUser=function(playerID){};

const updateUser=function(playerID,url){
    LSD.players.find((ply)=>{ return ply.id===playerID; }).url=url;
    return;
};

const addUser = function(reqBody){
    LSD.players.push({
       // { id:String, url:String, state:String, zone:Number } 
       id:reqBody.user_name,
       url:reqBody.response_url,
       state:"menu",
       zone:-1
    });
    console.log("# of players:"+LSD.players.length);
};

const setupServer= function(){
    for(let z=0;z<4;z++){
        for(let r=0;r<4;r++){
         setupGame({
             type:null,
             zone:z, 
             room:r,
             name:r,
             background:null
         });
        }
    }
};
setupServer();