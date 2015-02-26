'use strict';

var trumpet = require('trumpet');
var fs = require('fs');
var marked = require('marked');
var es = require('event-stream');

var slides = trumpet();
var container = trumpet();
var sliderContainer = container.select('.slides').createStream();

slides.selectAll('slide', function (slide) {
  var stream = slide.createStream();

  stream.pipe(es.through(function (buff) {
    this.queue('<section>' + marked(buff.toString()) + '</section>');
  })).pipe(stream);
});

var pageTemplate = fs.createReadStream('../presentation/index.html').pipe(container);
var slideTemplate = fs.createReadStream('./source.html').pipe(slides).pipe(es.wait(function (err, data) {
  sliderContainer.end(data)
}));

container.pipe(fs.createWriteStream('./output.html'));
