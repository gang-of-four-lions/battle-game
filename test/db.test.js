"use strict";

const expect = require('chai').expect;

const manager = require("../server/db_manager/manager.js");

describe('DB-Manager.createUser()', function() {
      it('should add a entry to the DB', (done) => {
          manager.createUser({ name:"TesterName", slackID:"Tester", playerStats:{ inventory:{ obj:["test1"] } } }, (err,doc)=>{
             if(err){ done(err); }
             else { done(); }
          });
      });
      
      it('should error if invaild data is entered', (done) => {
          manager.createUser({}, (err,doc)=>{
             if(err){ done(); }
             else { done("Failed to throw error!"); }
          });
      });
});

describe('DB-Manager.getUser()', function() {
      it('should find an entry on DB', (done) => {
          manager.getUser("Tester", (err,doc)=>{
             if(err){ done(err); }
             else { done(); }
          });
      });
      
      it('should error if invaild data is entered', (done) => {
          manager.getUser(22, (err,doc)=>{
             if(err){ done(); }
             else { done("Failed to throw error!"); }
          });
      });
      
      it('should error if name is not in DB', (done) => {
          manager.getUser("a#200hthe", (err,doc)=>{
             if(err){ done(); }
             else { done("Failed to throw error!"); }
          });
      });
});

describe('DB-Manager.updateUser()', function() {
    
      it('should find and update entry on DB', (done) => {
        manager.updateUser("Tester",
        {
            "LVL":10,
            "resWater":20,
            "atcEarth":25,
            "coin":100
        }
        ,(err)=>{
           if(err){ done(err); return; } 
           else { done(); }
        }); 
      });
      
      it('it should have saved the data to the DB', (done) => {
         manager.getUser("Tester",(err,doc)=>{
            if(err){ done(err,null); return; }
            if(doc.playerStats.LVL!==10 || doc.playerStats.resistants.water!==20){ done("Did not Save",null); return; }
            else { done(); }
         });
      });

});

//getInventory playerStats.inventory
describe('DB-Manager.getInventory()', function() {
      it('should find an entry on DB and return array', (done) => {
          manager.getInventory("Tester", (err,doc)=>{
             if(err){ done(err); }
             if(doc===null || doc===undefined || doc.length<1){ done("Error getting inv"); }
             else { done(); }
          });
      });
});
//getDisplay
describe('DB-Manager.getDisplay()', function() {
      it('should find an entry on DB, and return object', (done) => {
          manager.getDisplay("Tester", (err,doc)=>{
             if(err){ done(err); }
             if(doc===null || doc===undefined){ done("Error getting display"); }
             else { done(); }
          });
      });
});
//getStats
describe('DB-Manager.getStats()', function() {
      it('should find an entry on DB, and return object', (done) => {
          manager.getStats("Tester", (err,doc)=>{
             if(err){ done(err); }
             if(doc===null || doc===undefined){ done("Error getting Stats"); }
             else { done(); }
          });
      });
});
//modUser
//getStatsKey

describe('DB-Manager.removeUser()', function() {
      it('should remove user from DB', (done) => {
          manager.removeUser("Tester", (err,doc)=>{
             if(err){ done(err); }
             else { done(); }
          });
      });
      
      it('should error if invaild data is entered', (done) => {
          manager.removeUser(2253, (err,doc)=>{
             if(err){ done(); }
             else { done("Failed to throw error!"); }
          });
      });
});



//createAction
describe('DB-Manager.createAction()', function() {
      it('should add a entry to the DB', (done) => {
          manager.createAction({ name:"TesterName", id:"ActionTest",data:{ actionType:"Attack" }}, (err,doc)=>{
             if(err){ done(err); }
             else { done(); }
          });
      });
      
      it('should error if invaild data is entered', (done) => {
          manager.createAction({}, (err,doc)=>{
             if(err){ done(); }
             else { done("Failed to throw error!"); }
          });
      });
});
//getAction
describe('DB-Manager.getAction()', function() {
      it('should find an entry on DB', (done) => {
          manager.getAction("ActionTest", (err,doc)=>{
             if(err){ done(err); }
             else { done(); }
          });
      });
      
      it('should error if invaild data is entered', (done) => {
          manager.getAction(22, (err,doc)=>{
             if(err){ done(); }
             else { done("Failed to throw error!"); }
          });
      });
      
      it('should error if ID is not in DB', (done) => {
          manager.getAction("a#200hthe", (err,doc)=>{
             if(err){ done(); }
             else { done("Failed to throw error!"); }
          });
      });
});
//addActionToPlayer
//createObject
describe('DB-Manager.createObject()', function() {
      it('should add a entry to the DB', (done) => {
          manager.createObject({ name:"TesterName", id:"ObjectTest",GameData:{ type:"Weapon"},ShopData:{ imgURL:"#" }}, (err,doc)=>{
             if(err){ done(err); }
             else { done(); }
          });
      });
      
      it('should error if invaild data is entered', (done) => {
          manager.createObject({}, (err,doc)=>{
             if(err){ done(); }
             else { done("Failed to throw error!"); }
          });
      });
});
//getObject
describe('DB-Manager.getObject()', function() {
      it('should find an entry on DB', (done) => {
          manager.getObject("ObjectTest", (err,doc)=>{
             if(err){ done(err); }
             else { done(); }
          });
      });
      
      it('should error if invaild data is entered', (done) => {
          manager.getObject(22, (err,doc)=>{
             if(err){ done(); }
             else { done("Failed to throw error!"); }
          });
      });
      
      it('should error if ID is not in DB', (done) => {
          manager.getObject("a#200hthe", (err,doc)=>{
             if(err){ done(); }
             else { done("Failed to throw error!"); }
          });
      });
});
//addObjectToPlayer
