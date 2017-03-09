var makeScene = require('../server/image_gen/image_helper.js').makeScene;

//Uses makeScene function to overlay image on background
makeScene(__dirname + '/background.jpg', __dirname + '/lionbot_558.png', __dirname + '/lionbot_558.png', [20,300, 300,300], 'testOut.jpg');