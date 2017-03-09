var convertPercentToCoords = require('../server/image_gen/image_helper.js').convertPercentToCoords;
var assert = require('chai').assert;

//Test_background.jpg has a width of 500pixels and a height of 494pixels
//Percent should convert to coords starting with top left corner
/*describe('convertPercentToCoords', function() {
  it('Should convert stated as a fraction to pixel values', function(done) {
    var converted = convertPercentToCoords(__dirname + '/background.jpg', .25, .25);
    assert.deepEqual(converted, [125, 123.5]);
  });
});*/