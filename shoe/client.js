'use strict';

var shoe = require('shoe');
var through = require('through');

var result = document.getElementById('result');
var name = document.querySelector('[name="name"]');
var message = document.querySelector('[name="message"]');

// todo: only do this after we have a name!
var stream = shoe('/chat');

stream.pipe(through(function (msg) {
  result.appendChild(document.createTextNode(msg + '\n'));
}));

function emit (obj) {
  stream.write(JSON.stringify(obj));
}

message.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    emit({
      name: name.value,
      message: message.value
    })
    message.value ='';
  }
});
