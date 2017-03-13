var makeScene = require('../server/image_gen/image_helper.js').makeScene;
var convertPercentToCoords = require('../server/image_gen/image_helper.js').convertPercentToCoords;

var playerPos = convertPercentToCoords(__dirname + '/test_images/background.jpg', .05, .50);
var opponentPos = convertPercentToCoords(__dirname + '/test_images/background.jpg', .65, .05);
var coords = [playerPos[0], playerPos[1], opponentPos[0], opponentPos[1]];
//Uses makeScene function to overlay image on background
//Note that back.png, front.png and lionbot_558.png must exist at the point of this call.
makeScene(__dirname + '/test_images/background.jpg', __dirname + '/test_images/back.png', __dirname + '/test_images/lionbot_558.png', coords, 'test/test_images/testOut1.png');
makeScene(__dirname + '/test_images/background.jpg', __dirname + '/test_images/back.png', __dirname + '/test_images/front.png', coords, 'test/test_images/testOut2.png');