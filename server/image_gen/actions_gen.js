var combineImages = require(__dirname + '/image_helper.js').combineImages;
var images = require('images');

var exports = module.exports = {};

/*
    Saves a new file for the action displaying the action imagery on the player
    affected by the action.
*/
exports.makeActions = function (battleScene, actionImage, location, outputFile) {
    images(combineImages(battleScene, actionImage, location)).save(outputFile);
};