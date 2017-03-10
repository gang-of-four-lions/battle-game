var images = require('images');

var exports = module.exports = {};

exports.combineImages = function (backgroundImage, imageOverlay, coordArray) {
    return images(backgroundImage)
         .draw(images(imageOverlay), coordArray[0], coordArray[1])
         .encode("png", {operation: 50});
};

exports.makeScene = function (background, imageOne, imageTwo, coordArray, saveImageTo) {
    images(background)
        .draw(images(imageOne), coordArray[0], coordArray[1])
        .draw(images(imageTwo), coordArray[2], coordArray[3])
        .save(saveImageTo);
};

exports.convertPercentToCoords = function (background, xAxisPercent, yAxisPercent) {
    var width = images(background).width();
    var height = images(background).height();
    var coordsInPixels = [(width*xAxisPercent), (height*yAxisPercent)];
    return coordsInPixels;
};