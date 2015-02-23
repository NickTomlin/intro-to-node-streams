'use strict';

var through = require('through');
var trumpet = require('trumpet');
var fs = require('fs');
var marked = require('marked');

var tr = trumpet();
var slides = tr.selectAll('slide', function (slide) {
  var input = slide.createReadStream();
  var output = slide.createWriteStream({outer: true});

  input.pipe(through(function (buff) {
    this.queue('<section>' + marked(buff.toString()) + '</section>');
  })).pipe(output);
});

fs.createReadStream('./source.html').pipe(tr).pipe(process.stdout);
