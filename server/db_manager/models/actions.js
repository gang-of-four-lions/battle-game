"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const actionSchema = new Schema({
    
    _id: { },
    name: { type:String, required:true },
    
    data: {
        actionType: { type:String, required:true },
	    elements: [ ], //What elements does this effect
    	value:  { type:Number, min:0, default:0 }, //How much damage/protection does this action cause
	    mpCost:  { type:Number, min:0, default:0 } //If its a "magic" action how much MP does it cost
    }
});

var Action = mongoose.model('Action', actionSchema);

export default Action;