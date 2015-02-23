'use strict';

// taking in stdin
// we want to apply a "dogFilter" and change the words meow to bark
// and uppercase them
// otherwise, we want to just pipe through stdin
var _ = require('highland');

function stringify (buffer) {
  return buffer.toString();
}

function isCat (s) {
  return ~s.indexOf('meow')
}

function dogify (s) {
  return s.replace(/meow/g, 'woof').toUpperCase();
}

// it would be awesome to be able to fork in the middle, and just resume later on
// I want something like:
// stdin
//   -> stringify -> filter?
//   -> (pass) filter -> dogify ->
//   -> (fail) filter ->
// stdout
// gulp filter pipes to a temporary stream

_.pipeline(process.stdin).map(stringify).filter(isCat).map(dogify).pipe(process.stdout)

