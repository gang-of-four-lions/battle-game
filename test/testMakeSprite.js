var generateSprites = require('../server/image_gen/sprite_gen.js').generateSprites;

var imageObj =  {
    'back': {
        'backwhite.png': 0,
        'bigknifeback.png': 1,
        'bootsback.png': 2,
        'redrobesback.png': 3,
        'redmagehatback.png': 4
    },
    'front': {
        'frontwhite.png': 0,
        'frontbigknife.png': 4,
        'frontboots.png': 1,
        'frontredrobes.png': 2,
        'frontredhat.png': 3
    }
};

generateSprites(imageObj, './test/test_images/front.png', './test/test_images/back.png');