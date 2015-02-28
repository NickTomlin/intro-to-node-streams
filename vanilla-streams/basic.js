'use strict';

var fs = require('fs')
var path = require('path');
var helloFilePath = path.join(__dirname, './files/hello.txt');

// many things in node core have streaming abilities. The most easily useful being HTTP and FS
// here we open a simple text file with a readable stream, and use a streams `.pipe` method
// to send it to a writeable stream, which happens to be stdout, but could be a file, an http request, or any other writeable stream
fs.createReadStream(helloFilePath).pipe(process.stdout)
