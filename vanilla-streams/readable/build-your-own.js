'use strict';

// inspired stolen by the counter example at http://nodejs.org/api/stream.html#stream_class_stream_readable

// typically readable streams come from somewhere else (a file, a socket etc) but we can create them ourselves if we want
var util = require('util');
var Readable = require('stream').Readable
// we make our Count behave like a readable stream
util.inherits(Count, Readable);

function Count (num, opt) {
  // make sure that we get the benefits of
  // Readable's constructor
  Readable.call(this, opt);
  // establish some internal properties that our stream uses
  this._max = num;
  this._index = 1;
}

// A Readable stream is only required to implement one method: `._read`
Count.prototype._read = function () {
  if (this._index > this._max) {
    return this.push(null);
  }

  setTimeout(function () {
    this.push(new Buffer('' + this._index++, 'utf8'));
  }.bind(this), 150);
};

// let's see how it performs?
var counter = new Count(5);

counter.pipe(process.stdout);
counter.pipe(require('concat-stream')(function (contents) {
 require('assert').equal(contents.toString(), '12345');
}))
