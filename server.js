'use strict';

var http = require('http');
var server = require('./app/core/router');

server.listen(3000, function (err) {
  console.log('Server is running at port 3000');
});
