"use strict";
var request = require('request'); //Used for post command
var exports = module.exports = {};
const manager = require("../db_manager/manager.js");
//manager.createUser({ name:"Josh5231", slackID:"Josh5231", playerStats:{ inventory:{ obj:["test1"] } } },(err)=>{ console.log("ERROR!"); return; });

const LSD = { //Local Server Data
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
getGameIndex: function(gameID){
    console.log("Looking for: "+gameID)
    return this.games.findIndex((cv)=>{ console.log(cv.id); return cv.id===gameID; })
},
setPlayersGame: function(playerID,gameID){
    const p=this.players.find((ply)=>{ return ply.id===playerID; });  
    if(!p){ return "Error invaild playerID in setPlayersGame"; }
    p.game = gameID;
    return;    
}
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
    waiting:{
        "text": "Welcome to the *Lion's Den*",
        "attachments": [
            {
            "text": "Waiting for other players to join....",
            "fallback": "Waiting",
            "callback_id": "wopr_game",
            "color": "#A0A0A0",
            "attachment_type": "default",
			"footer": "Vist us at  <http://www.lionsden.com|LionsDen.com>",
            "actions": [
                {
                    "name": "Cancel",
                    "text": "Cancel",
                    "type": "button",
                    "value": "Cancel"
                }],
            }]
    }
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
          console.log(res);
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
        //case 'singlePlayer':
            //Add code here to start single player mode...
           // return;
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
            
        case 'game':
            console.log(buttonData.actions[0].name);
            addPlayerToGame(buttonData.user.name,buttonData.actions[0].name,(err,state)=>{
                if(err){ cb(err,null); return; }
                if(state==="waiting"){
                    sendMessage(buttonData.user.name, predefMessages.waiting ,cb);
                    return;
                }
                else if(state==="start"){
                    startGame(buttonData.actions[0].name,cb);
                    return;
                }
            });
            return;
            
        default:
            sendMessage(buttonData.user.name,{ text:"Error, this function has not be implemented!" },cb);
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
    let tp=0;
    switch(opt.type){
        case "1vrAI":
            tp=1;
            break;
        case "1vr1":
            tp=2;
            break;
         case "2vr2":
            tp=4;
            break;
        case "3vr3":
            tp=6;
            break;
    }
    //console.log(opt.name);
    LSD.games.push({
        id: opt.name, //TODO generate unquie ID
        loc: { zone:opt.zone, room:opt.room, name:opt.name },
        state:"waiting", //Set init state to indicate it is waiting for players
        type:opt.type, // "1vrAI","1vr1","2vr2",ect..
        players:[], // Array of players in the game
        playerCnt:tp,
        background:opt.background,
        updateCount: 0, 
        teamA:0,
        teamB:0,
        timer:0
    });
};

const addPlayerToGame=function(playerID,gameID,cb){
    const ind=LSD.getGameIndex(+gameID);
    if(ind===-1){ cb("Error gameID not found",null); return; }
    manager.getStats(playerID,(err,data)=>{
        if(err){ cb(err,null); return; }
        //console.log(LSD.games[ind].players);
        LSD.games[ind].players.push(
        {   id:playerID, playerStats:data   });
        if(LSD.games[ind].players.length===LSD.games[ind].playerCnt){
            LSD.games[ind].state="starting";
            LSD.setPlayersGame(playerID,gameID);
            cb(null,"start");
        }
        else{   cb(null,"waiting"); }
    });
    return;
};

const startGame=function(gameID,cb){
    //Generate Action Message
    //Generate Images
    //send messages to all player
    const teamAImage = "";
    const teamBImage = "";
    let baseMessage = {
        "text": "Welcome to the *Lion's Den*",
        "attachments": [
            {
            "text": "Select your action:",
            "fallback": "Waiting",
            "callback_id": "wopr_game",
            "color": "#A0A0A0",
            "attachment_type": "default",
			"footer": "Vist us at  <http://www.lionsden.com|LionsDen.com>",
            "actions": [],
            }]
    };
    let game = LSD.games[LSD.getGameIndex(gameID)];
    for(let i=0;i<game.players.length;i++)
        {
          //For now odd numbers = TeamA and even = TeamB
          //Grab action list from playerStats
          let actionIds = game.players[i].actions.slice(0); //Copy base actions list
          game.players[i].inventory.objs.forEach((cv)=>{
             manager.getObject(cv,(err,obj)=>{ //THIS WONT WORK due to sync loop + async calls
                if(err){ cb(err,null); return; }
                actionIds.push(obj.action);
             }); 
          });
        }
    
    //start count down clock
    //update game state
};

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
    for(let z=1;z<5;z++){
        for(let r=0;r<4;r++){
         setupGame({
             type:"1vr1",
             zone:z, 
             room:r,
             name:(z*10)+r,
             background:null
         });
        }
    }
};
setupServer();