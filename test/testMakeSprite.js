var generateSprites = require('../server/image_gen/sprite_gen.js').generateSprites;

var imageObj =  {
    'back': {
        './test/test_images/backwhite.png': 0,
        './test/test_images/bigknifeback.png': 1,
        './test/test_images/bootsback.png': 2,
        './test/test_images/redrobesback.png': 3,
        './test/test_images/redmagehatback.png': 4
    },
    'front': {
        './test/test_images/frontwhite.png': 0,
        './test/test_images/frontbigknife.png': 4,
        './test/test_images/frontboots.png': 1,
        './test/test_images/frontredrobes.png': 2,
        './test/test_images/frontredhat.png': 3
    }
};

generateSprites(imageObj, './test/test_images/front.png', './test/test_images/back.png');