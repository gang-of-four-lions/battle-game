var easyimg = require('easyimage');

var exports = module.exports = {};

//Send spritesheet with cell number (currently just using coordinates)
//The standard cell size (which is not yet decided), and a file to save the result to
exports.grabSprite = function (spriteSheet, cellToGrab, cellSize, saveFile) {
    easyimg.crop({
        src: spriteSheet, dst: saveFile,
        cropwidth:cellSize[0], cropheight:cellSize[1],
        gravity:'North-West',
        x:cellToGrab[0], y:cellToGrab[1]
    }).then(
        function(image) {
            console.log('Cropped: ' + image.width + ' x ' + image.height);
        }, function (err) {
            console.log(err);
        }
    );
};