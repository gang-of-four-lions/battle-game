var Clipper = require('image-clipper');

var exports = module.exports = {};

exports.grabSprite = function (spriteSheet, cellToGrab, cellSize, saveFile) {
    Clipper(spriteSheet)
       .crop(cellToGrab[0], cellToGrab[1], cellSize[0], cellSize[1])
       .toFile(saveFile, function() { console.log("File saved"); });
};