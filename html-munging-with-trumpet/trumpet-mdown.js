'use strict';

var trumpet = require('trumpet');
var fs = require('fs');
var marked = require('marked');
var es = require('event-stream');

var outfile = fs.createWriteStream('../presentation/output.html');
// readable/writible stream
var slides = trumpet();
var container = trumpet();
var sliderContainer = container.select('.slides').createStream();

slides.selectAll('section', function (slide) {
  var stream = slide.createStream();
  // this is wrapping our sections in a <slide>
  // unfortunately doing the ol' {outer: true} just wraps _every_ element
  // in <section> instead of just replacing the outer element :(
  // maybe we just convert to using section? Yes. that's what we did.
  // we could probably just replace this to split on `---` or something
  // but this proves a point by being fancy...
  stream.pipe(es.through(function (buff) {
    this.queue(marked(buff.toString()));
  })).pipe(stream);
});

fs.createReadStream('./source.html').pipe(slides).pipe(sliderContainer);
fs.createReadStream('../presentation/index.html').pipe(container).pipe(outfile);
