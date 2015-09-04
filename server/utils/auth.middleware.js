'use strict';

var HttpError = require('./HttpError');

var Auth = {};

Auth.assertLoggedIn = function (req, res, next) {
	if (req.user) next();
	else next(HttpError(401));
};

Auth.assertAdmin = function (req, res, next) {
	if (req.user && req.user.isAdmin) next();
	else next(HttpError(403));
};

Auth.assertSelf = function (req, res, next) {
	if (req.requestedUser.equals(req.user)) next()
	else next(HttpError(403));
};

Auth.assertAuther = function (req, res, next) {
	if (req.user && req.user.equals(req.story.author)) next();
	else next(HttpError(403));
};

module.exports = Auth;