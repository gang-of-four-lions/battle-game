"use strict";
var request = require('request'); //Used for post command

const manager = require("../db_manager/manager.js");

const LSD = { 
players: [ ], // { id:String, url:String, state:String } 
games: [],
getPlayerState: function(playerID){
    const p=this.players.find((ply)=>{ return ply.id===playerID; });
    if(p){ return p.state; }
    return null;
}, //looks up and returns player state^
getCallback: function(playerID){
    const p=this.players.find((ply)=>{ return ply.id===playerID; });
    if(p){ return p.url; }
    return null;
}, //looks up and returns player's url
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
                    "name": "Zone 1",
                    "text": "Zone 1",
                    "type": "button",
                    "value": "zone1"
                },
                {
                    "name": "Zone 2",
                    "text": "Zone 2",
                    "type": "button",
                    "value": "zone2"
                },
				{
                    "name": "Zone 3",
                    "text": "Zone 3",
                    "type": "button",
                    "value": "zone3"
                },
				{
                    "name": "Zone 4",
                    "text": "Zone 4",
                    "type": "button",
                    "value": "zone4"
                }
            ]
        }
    ]
},
};

const messageRouter = function(data,cb){
    //data === req.body
  //Two basic type of messages
  //1 - Slack input to start game. 
  //2 - interactive buttons for game and server
  if(!data.payload) //This is being sent via slash command
    {
      verifyPlayer(data,(err,res)=>{
          if(err){ cb(err,null); return; }
          if(res==="help"){ sendMessage(data.user_name,{ text:"This is the help text..." },cb); return; }
          if(res==="done"){ sendMessage(data.user_name, predefMessages.intro ,cb); return; } //Send intro message
      }); 
      return;
    }
  else{ //If getting message from a button
      const buttonData = JSON.parse(data.payload); //Parse payload data about the button
      switch (buttonData.actions[0].value) { //Each button will have a unique value
        case 'netGame': //Into message - Network game button
            sendMessage(data.user_name, predefMessages.zones ,cb); //Send zone selection method
            return;
        case 'singlePlayer':
            //Add code here to start single player mode...
            return;
        case 'zone':
            //get zone name with buttonData.actions[0].name
            const zoneName = buttonData.actions[0].name;
            //get list of rooms and build message, then send
            return;
        case 'room':
            const roomName = buttonData.actions[0].name;
            //get list of games in the room and build and then send
            return;
        }
  }
};

const verifyPlayer=function(req,cb){
    manager.lookUpUser(req.user_name,(err,data)=>{
        if(err){ return "err"; } //routes should check for err
        if(LSD.players.findIndex((p)=>{ return p.id===req.user_name; }) ){
            return "help"; //routes should send help text
        }
        else{
            addPlayerLSD(req);
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
        cb(null,"Done");
        });
    return;
};

const setupGame=function(opt,cb){
    //opt = { type:String, background:URL }
    LSD.games.push({
        id: "000", //TODO generate unquie ID
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

const updateUser=function(reqBody){};