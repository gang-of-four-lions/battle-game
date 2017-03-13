var combineImages = require(__dirname + '/image_helper.js').combineImages;
var images = require('images');

var exports = module.exports = {};

/*
    playerImagesObj should contain two objects, 'front' and 'back',
    the path and filenames of the images as keys of the inner objects, and the values
    should be the layer of the image they should go on, starting at 0.
    {
        'front': {
            'path/filename.png': 0,
            'path/failname.png': 1
        },
        'back': {
            'path/filenamz.png': 0,
            'path/fillname.png': 1
        }
    }
*/
exports.generateSprites = function (playerImagesObj, frontFacingSaveFile, backFacingSaveFile) {
    var front = sortImageObject(playerImagesObj['front']);
    var back = sortImageObject(playerImagesObj['back']);
    var frontSprite = makeSprite(front);
    images(frontSprite).save(frontFacingSaveFile);
    var backSprite = makeSprite(back);
    images(backSprite).save(backFacingSaveFile);
};

function sortImageObject (imageObject) {
    var imageArray = Object.keys(imageObject).sort(function (a,b) {
        return imageObject[a]-imageObject[b];
    });
    return imageArray;
}


function makeSprite (imageArray) {
    var sprite = images(imageArray[0]);
    for (var i = 1; i < imageArray.length; i++) {
        sprite = combineImages(sprite, (imageArray[i]), [0,0]);
    }
    return sprite;
}