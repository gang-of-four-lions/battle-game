# DB-Manager Doc

## User Functions
1. getUser(slackID,cb); 
    -Returns the whole user's doc. 
    -Errors include: "Invaild name input, name must be a valid string." / "Error finding "+slackID"

2. createUser(data,cb);
    -Returns "done" on success
    -Errors include: "Must provide data with name and slackID" / "Error saving user with ID: "+data.slackID

3. removeUser(slackID,cb);
    -Returns "done" on success
    -Errors include: "Invaild name input, name must be a valid string." / "Error removing "+slackID

4. getInventory(slackID,cb);
    -Returns the user's inventory object. { objs:[ object's_ids ]; coint:Number }
    -Errors include: "Invaild name input, name must be a valid string." / "Error finding "+slackID"

5. getDisplay(slackID,cb);
    -Returns the user's display object. { frontImage: {}, backImage: {}, wins:Number, gamesPlayed:Number }
    -Errors include: "Invaild name input, name must be a valid string." / "Error finding "+slackID"

6. getStats(slackID,cb);
    -Returns the user's "playerStats" object. See users.js Model
    -Errors include: "Invaild name input, name must be a valid string." / "Error finding "+slackID"

7. updateUser(slackID,obj,cb);
    -Returns "done" on success
    -Errors include: "Invaild name input, name must be a valid string." / "Error finding "+slackID" / "Invaild object" / "Error saving doc"
    -See lookUpTable for valid object keys.
    -Example: updateUser("slackID",{ "LVL":2,"EXP":100 },(err,state)=>{} ); //This would 'set' LVL=2 and EXP=100 and state="done" on success

8. modUser(slackID,obj,cb);
    -Works the same as UpdateUser but add/subtacts values instead of setting them.
    -Warning: This does not work with Arrays but will not error if an array 'key' is passed to it.
    -Example: modUser("slackID",{ "LVL":1,"EXP":-100 },(err,state)=>{} ); //Would add 1 to user's LVL and minus 100 from user's EXP

9. getStatsKey(slackID,key,cb);
    -Returns the propery set for key.
    -Errors include: "Invaild name input, name must be a valid string." / "Error finding "+slackID" / "Invaild object"
    -See lookUpTable for valid keys.
    -Example: getStatsKey("slackID","LVL",(err,state)=>{}); //Would return the user's LVL

10. addActionToPlayer(slackID,actionID,cb);
    -Returns "done" on success
    -Errors include: "Invaild name input, name must be a valid string." / "Error finding "+slackID" / "Unable to save in addAction"
    -Warning: actionIDs are not checked as valid

11. addObjectToPlayer(slackID,objectID,cb);
    -Same as addActionToPlayer but for Objects

## Action Functions

1. getAction(id,cb);
    -Returns the action's object. See actions.js model
    -Errors include: "Invaild ID input, name must be a valid string." / "Error finding "+id

2. createAction(data,cb);
    -Returns "done" on success
    -data should be a valid action object. See actions.js model
    Errors include: "Must provide data with name and ID" / "Error saving new action"

## Object Functions

1. getObject(id,cb);
    -Returns the object's object. See objs.js model
    -Errors include: "Invaild ID input, name must be a valid string." / "Error finding "+id

2. createObject(data,cb);
    -Returns "done" on success
    -data should be a valid 'object' object. See objs.js model
    Errors include: "Must provide data with name and ID" / "Error saving new Object"+data.id


## lookUpTable

lookUpTable = {
    "id": [ "id" ],
    "name": [ "name" ],
    "slackID": [ "slackID" ],
    "HP": [ "playerStats","HP "],
    "MP": [ "playerStats","MP" ],
    "EXP": [ "playerStats","EXP" ],
    "LVL": [ "playerStats","LVL" ],
    "CLASS": [ "playerStats","CLASS" ],
    "resWater": [ "playerStats","resistants","water" ],
    "resFire": [ "playerStats","resistants","fire" ],
    "resEarth": [ "playerStats","resistants","earth" ],
    "resWood": [ "playerStats","resistants","wood" ],
    "resMetal": [ "playerStats","resistants","metal" ],
    
    "atcWater": [ "playerStats","attackBounces","water" ],
    "atcFire": [ "playerStats","attackBounces","fire" ],
    "atcEarth": [ "playerStats","attackBounces","earth" ],
    "atcWood": [ "playerStats","attackBounces","wood" ],
    "atcMetal": [ "playerStats","attackBounces","metal" ],
    
    "coin": [ "playerStats","inventory","coin" ],
    "frontImage": [ "displayData","frontImage" ],
    "backImage":[ "displayData","backImage" ],
    "wins":[ "displayData","wins" ],
    "gamesPlayed": [ "displayData","gamesPlayed" ],
    "classType": [ "PlayerBuild","classtype" ],
    "head": [ "PlayerBuild","head" ],
    "body": [ "PlayerBuild","body" ],
    "shirt": [ "PlayerBuild","shirt" ],
    "pants": [ "PlayerBuild","pants" ],
    "actions": [ "playerStats","actions"]
};


    
