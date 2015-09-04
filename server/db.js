'use strict';

var mongoose = require('mongoose');
var Promise = require('bluebird'); 
Promise.promisifyAll(mongoose);

var databaseURI = 'mongodb://localhost:27017/auther';
var db = mongoose.connect(databaseURI).connection;

app.listen(process.argv[2]);

db.on('open', function () {
	console.log('Database connection successfully opened');
});

db.on('error', function (err) {
	console.error('Database connection error', err);
});

module.exports = db;