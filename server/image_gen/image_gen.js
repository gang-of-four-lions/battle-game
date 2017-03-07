var images = require('images');

var exports = module.exports = {};

exports.combineImages = function (backgroundImage, imageTwo, coordArray, saveImageTo) {
    return images(backgroundImage)
         .draw(images(imageTwo), coordArray[0], coordArray[1])
         .encode(saveImageTo, {quality: 50});
};