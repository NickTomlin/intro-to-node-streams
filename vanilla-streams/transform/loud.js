'use strict';

var Transform = require('stream').Transform
var loud = new Transform()

loud._transform = function(buffer, encoding, done) {
  done(null, buffer.toString().toUpperCase());
};

module.exports = loud
