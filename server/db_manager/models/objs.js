"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const objectSchema = new Schema({
    
    _id: { },
    name: { type:String, required:true },
    
    GameData: {
       type: { type:String, required:true }, //weapon / armor / potion / ect...
       effects: {  //The effect is has on each element or stats(HP/MP)
            water: { type:Number, default:0 },
            fire: { type:Number, default:0 },
            earth: { type:Number, default:0 },
            wood: { type:Number, default:0 },
            metal: { type:Number, default:0 },
            HP:{ type:Number, default:0 },
            MP:{ type:Number, default:0 }
       },
       action: String, //The associated action's id from Action-DB if any
       },
       
    ShopData: {
       imgURL: { type:String, required:true },
       cost: { type:Number, min:0, default:0 },
       requirements: {} //What is required to buy this item. 
       }
});

var Obj = mongoose.model('Obj', objectSchema);
module.exports.Obj = Obj;