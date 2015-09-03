'use strict'; 
var secretToken = require('../auth/secrets').token;
var bodyParser = require('body-parser');

var router = require('express').Router(),
	session = require('express-session'),
	passport = require('passport');

var User = require('../api/users/user.model');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


router.use(session({
	secret: secretToken,
	resave: false,
	saveUninitialized: false
}));

passport.serializeUser(function (user, done) {
	done(null, user._id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, done);
});

router.use(passport.initialize());

router.use(passport.session());

module.exports = router;