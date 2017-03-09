"use strict";

const expect = require('chai').expect;

const manager = require("../server/db_manager/manager.js");

describe('DB-Manager.createUser()', function() {
      it('should add a entry to the DB', (done) => {
          manager.createUser({ name:"TesterName", slackID:"Tester"}, (err,doc)=>{
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
