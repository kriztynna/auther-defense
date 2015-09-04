'use strict';

var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync(__dirname+'/key.pem', 'utf8'),
  cert: fs.readFileSync(__dirname+'/cert.pem', 'utf8')
};

var app = require('./app'),
    db = require('./db');

var port = 8080;
var httpsServer = https.createServer(options, app)
  .listen(port, function() {
    console.log('HTTPS server listening on port', port);
  });


module.exports = httpsServer;