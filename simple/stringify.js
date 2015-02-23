'use strict';

var Transform = require('stream').Transform;
var string = new Transform({decodeStrings: false});

string._transform = function(buffer, encoding, done) {
  done(null, buffer.toString());
};

module.exports = string;
