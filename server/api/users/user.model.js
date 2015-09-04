'use strict'; 

var mongoose = require('mongoose'),
	shortid = require('shortid'),
	_ = require('lodash');

var db = require('../../db');
var Story = require('../stories/story.model');

var crypto = require('crypto');

function hashPwd (rawPwd) {
	var salt = new Date().toString() + String(Math.floor(Math.random()*1000000));
	var encrypted = crypto.createHash('sha1').update(salt + rawPwd).digest('hex');
	return {salt: salt, pwd: encrypted};
}

var User = new mongoose.Schema({
	_id: {
		type: String,
		unique: true,
		default: shortid.generate
	},
	name: String,
	photo: {
		type: String,
		default: '/images/default-photo.jpg'
	},
	phone: String,
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {type: Object, set: hashPwd},
	google: {
		id: String,
		name: String,
		email: String,
		token: String
	},
	twitter: {
		id: String,
		name: String,
		email: String,
		token: String
	},
	github: {
		id: String,
		name: String,
		email: String,
		token: String
	},
	isAdmin: {
		type: Boolean,
		default: false
	}
});

User.methods.getStories = function () {
	return Story.find({author: this._id}).exec();
};

function verifyPwd (user, rawPwd) {
	var hashed = hashPwd(rawPwd);
	if (hashed == user.password) return user;
	else return false;
}

User.methods.findSecure = function (body) {
	User.findOne({email: req.body.email})
		.then(function(user){
			return verifyPwd(user, rawPwd);
		});
}

module.exports = db.model('User', User);