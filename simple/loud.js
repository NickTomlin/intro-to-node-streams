'use strict';

var Transform = require('stream').Transform
var loud = new Transform()

loud._transform = function(buffer, encoding, done) {
  console.log('loud', buffer, encoding);
  // we get a buffer here,
  // so we'll need to stringify it
  // if we want this to work
  done(null, buffer.toString().toUpperCase());
};

module.exports = loud
