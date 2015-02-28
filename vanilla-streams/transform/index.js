'use strict';

// http://stackoverflow.com/a/25650163/1048479
var Stream = require('stream');
var loud = require('./loud');


// could be stdin, a file, an HTTP request
var source = new Stream.PassThrough()
source.write('Hello')
source.end();
// at the moment, we still get a buffer in loud
// so we have to toString it
// even though my thinking was that we would have
// stringified it via stringify
source.pipe(loud)
.pipe(process.stdout)
