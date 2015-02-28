An introduction to node streams
---

# Preface

There is already tons of information out there on streams. This is merely an attempt to advocate for and synthesis a small portion of that information from _my_ perspective. The sources listed under "resources" contain much, much more information and background.

# Why should I care?

## Elegance

Streams provide a an elegant and fun way to write asynchronous code:

    fs.createReadStream('data.csv')
      .pipe(request.post('/account-data'))
      .pipe(fs.createReadStream('processed-data-response.json'))


## Streams are everywhere in node-land

  - node core
  - [request](https://github.com/request/request)
  - [browserify](https://github.com/substack/node-browserify)
  - [gulp](https://github.com/gulpjs/gulp)
  - many, many more...

## Streams help gulp be awesome

    gulp.src('public/**/*.js')
      .pipe(concat('built.js'))
      .pipe(uglify())
      // ... your streams here
      .pipe(gulp.dest('dist/js'))

This is a readable way of expressing how a series of files goes thourgh a transformation.

# Usage

The most common use case is consuming through a utility, like gulp or browserify, but you can implement your own tool on top of streams quite easily using node's built in streaming capabilities and a few stream utility libraries (like [`through`](https://github.com/rvagg/through2)).

## Subclassing

## In the browser

Streams in the browser are possible, although an unscientific survery seems to indicate that they are less popular there. Projects like [highland](http://highlandjs.org/) and [bacon](https://baconjs.github.io/) wrap jQuery events in a stream api, as well as providing a lot of common stream apis/wrappers for arrays.

# TLDR

Streams aren't _the_ way to do anything, bug they can be helpful, awesome, and you should consider adding them to your node toolchest.

# Fin

Resources:

[stream handbook](https://github.com/substack/stream-handbook)
[node streams - Jon Resig](http://nodestreams.com/)
[stream adventure](https://github.com/substack/stream-adventure)
[practical examples of the new node js streams api](http://strongloop.com/strongblog/practical-examples-of-the-new-node-js-streams-api/)
[better data slinging with node streams](http://loose-bits.com/2012/08/02/nodejs-read-write-streams-pipes.html)
