"use strict";

const expect = require('chai').expect;

const User = require("../server/db_manager/manager.js").User;
const Action = require("../server/db_manager/manager.js").Action;
const Obj = require("../server/db_manager/manager.js").Obj;

describe('DB-Manager User collection', function() {
  it('should add a entry to the DB', () => {
    var temp = new User({ name:"Tester", slackID:"slackTester" });
    var num = 0;
    User.count({},(err,cnt)=>{
        expect(err).to.equal(null);
        num=cnt;
    });
    
    temp.save((err)=>{
        expect(err).to.equal(null);
    }).then(()=>{
    
        User.count({},(err,cnt)=>{
            expect(err).to.equal(null);
            expect(cnt).to.equal(num+1);
        });
    });
    
  });
  
  it('should find the entry and modify it',()=>{
      User.find({ name:"Tester" },(err,doc)=>{
         expect(err).to.equal(null);
         expect(doc.name).to.equal("Tester");
         
         doc.name = "Tester_mod";
         
         doc.save((err)=>{
             expect(err).to.equal(null);
         }).then(()=>{
            User.find({ name:"Tester_mod"},(err,_doc)=>{
                expect(err).to.equal(null);
                expect(_doc.name).to.equal("Tester_mod"); 
            });
         });
      });
  });
  
  it('should remove the entry',()=>{
      User.remove({ name:"Tester_mod"},(err)=>{
         expect(err).to.equal(null); 
      });
  });
});

describe('DB-Manager Action collection', function() {
  it('should add a entry to the DB', () => {
    var temp = new Action({ name:"Tester" });
    var num = 0;
    Action.count({},(err,cnt)=>{
        expect(err).to.equal(null);
        num=cnt;
    });
    
    temp.save((err)=>{
        expect(err).to.equal(null);
    }).then(()=>{
    
        Action.count({},(err,cnt)=>{
            expect(err).to.equal(null);
            expect(cnt).to.equal(num+1);
        });
    });
    
  });
  
  it('should find the entry and modify it',()=>{
      Action.find({ name:"Tester" },(err,doc)=>{
         expect(err).to.equal(null);
         expect(doc.name).to.equal("Tester");
         
         doc.name = "Tester_mod";
         
         doc.save((err)=>{
             expect(err).to.equal(null);
         }).then(()=>{
            Action.find({ name:"Tester_mod"},(err,_doc)=>{
                expect(err).to.equal(null);
                expect(_doc.name).to.equal("Tester_mod"); 
            });
         });
      });
  });
  
  it('should remove the entry',()=>{
      Action.remove({ name:"Tester_mod"},(err)=>{
         expect(err).to.equal(null); 
      });
  });
});

describe('DB-Manager Object collection', function() {
  it('should add a entry to the DB', () => {
    var temp = new Obj({ name:"Tester" });
    var num = 0;
    Obj.count({},(err,cnt)=>{
        expect(err).to.equal(null);
        num=cnt;
    });
    
    temp.save((err)=>{
        expect(err).to.equal(null);
    }).then(()=>{
    
        Obj.count({},(err,cnt)=>{
            expect(err).to.equal(null);
            expect(cnt).to.equal(num+1);
        });
    });
    
  });
  
  it('should find the entry and modify it',()=>{
      Obj.find({ name:"Tester" },(err,doc)=>{
         expect(err).to.equal(null);
         expect(doc.name).to.equal("Tester");
         
         doc.name = "Tester_mod";
         
         doc.save((err)=>{
             expect(err).to.equal(null);
         }).then(()=>{
            Obj.find({ name:"Tester_mod"},(err,_doc)=>{
                expect(err).to.equal(null);
                expect(_doc.name).to.equal("Tester_mod"); 
            });
         });
      });
  });
  
  it('should remove the entry',()=>{
      Obj.remove({ name:"Tester_mod"},(err)=>{
         expect(err).to.equal(null); 
      });
  });
});
