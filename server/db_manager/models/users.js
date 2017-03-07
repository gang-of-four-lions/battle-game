"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    id: { },
    name: { type:String, required:true },
    slackID: { type:String, required:true },
    
    playerStats: {
        HP:  { type:Number, min:1, default:10 },
        MP:  { type:Number, min:0, default:0 },
        EXP:  { type:Number, min:0, default:0 },
        LVL:  { type:Number, min:0, default:0 },
        Class:String,
        
        resistants: { 
            water: { type:Number, min:0, default:0 },
            fire: { type:Number, min:0, default:0 },
            earth: { type:Number, min:0, default:0 },
            wood: { type:Number, min:0, default:0 },
            metal: { type:Number, min:0, default:0 }
        },
        
        attackBounces: { 
            water: { type:Number, min:0, default:0 },
            fire: { type:Number, min:0, default:0 },
            earth:{ type:Number, min:0, default:0 },
            wood: { type:Number, min:0, default:0 },
            metal:{ type:Number, min:0, default:0 }
        },
        
        actions: [], //Base actions assigned with charater class
        
        displayData: {
            frontImage: String,
            backImage: String,
            wins:  { type:Number, min:0, default:0 },
            gamesPlayed:  { type:Number, min:0, default:0 }
        },
        
        inventory: {
            objs: [], //An array of IDs for all objects this player has
            coin: Number // $
        },
        
        PlayerBuild:{ 
            classtype: String,
	        head: String,
	        body: String,
	        hair: String,
	        shirt: String,
	        pants: String
        }
    }
    
});

var User = mongoose.model('User', userSchema);
module.exports = User;