var grabSprite = require('../server/image_gen/sprite_grab.js').grabSprite;

//Takes in a sprite sheet, the top-left coordinate of desired sprite, width and height in an array,
//and a file to put the result into.
grabSprite(__dirname + '/test_images/samplesprite.png', [0, 91], [23, 28], __dirname + '/test_images/redmage.png');