'use strict';

// http://stackoverflow.com/a/25650163/1048479
var Stream = require('stream');
var loud = require('./loud')
var stringify = require('./stringify')


// could be stdin, a file, an HTTP request
var source = new Stream.PassThrough()
source.write('Hello')
source.end();

source.pipe(stringify)
// at the moment, we still get a buffer in loud
// so we have to toString it
// even though my thinking was that we would have
// stringified it via stringify
.pipe(loud)
.pipe(process.stdout)
