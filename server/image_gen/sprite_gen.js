var combineImages = require(__dirname + '/image_helper.js').combineImages;
var images = require('images');

var exports = module.exports = {};

//FrontSprite should be used for opponent
//the sprite-size key should point to the standard width x height of sprites
    /*
        the objects should look like this:
        imageObj
        {
            sprite-size: [width, height],
            sprite-front: filelocation,
            ...
            upper-front: filelocation
        }
        coodObj
        {
            sprite-front-loc: [x, y],
            ..
            upper-front-loc: [x, y]
        }
    
    */
exports.generateFrontSprite = function (imageObj, coordObj, frontSpriteSaveFile) {
    const blank = imageObj['sprite-size'];
    const sprite = imageObj['sprite-front'];
    const head = imageObj['head-front'];
    const weap = imageObj['weapon-front'];
    const shoes = imageObj['shoes-front'];
    const lower = imageObj['lower-front'];
    const upper = imageObj['upper-front'];
    var final;
    if (!!weap) {
        final = combineImages(blank, weap, coordObj['weapon-front-loc']);
    }
    final = combineImages(final, sprite, coordObj['sprite-front-loc']);
    if (!!head) {
        final = combineImages(final, head, coordObj['head-front-loc']);
    }
    if (!!shoes) {
        final = combineImages(final, shoes, coordObj['shoes-front-loc']);
    }
    if (!!lower) {
        final = combineImages(final, lower, coordObj['lower-front-loc']);
    }
    if (!!upper) {
        final = combineImages(final, upper, coordObj['upper-front-loc']);
    }
    images(final).save(frontSpriteSaveFile, {quality: 50});
};

//This one should be used for the player's view
exports.generateBackSprite = function (imageObj, coordObj, backSpriteSaveFile) {
    const blank = imageObj['sprite-size'];
    const sprite = imageObj['sprite-back'];
    const head = imageObj['head-back'];
    const weap = imageObj['weapon-back'];
    const lower = imageObj['lower-back'];
    const upper = imageObj['upper-back'];
    var final;
    if (!!weap) {
        final = combineImages(blank, weap, coordObj['weapon-back-loc']);
    }
    final = combineImages(final, sprite, coordObj['sprite-back-loc']);
    if (!!lower) {
        final = combineImages(final, lower, coordObj['lower-back-loc']);
    }
    if (!!upper) {
        final = combineImages(final, upper, coordObj['upper-back-loc']);
    }
    if (!!head) {
        final = combineImages(final, head, coordObj['head-back-loc']);
    }
    images(final).save(backSpriteSaveFile, {quality: 50});
};