var makeScene = require('../server/image_gen/image_helper.js').makeScene;

//Uses makeScene function to overlay image on background
makeScene(__dirname + '/test_images/background.jpg', __dirname + '/test_images/lionbot_558.png', __dirname + '/test_images/lionbot_558.png', [20,300, 300,300], 'test/test_images/testOut.png');