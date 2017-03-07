"use strict";

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOURI);

var exports = module.exports = {};

exports.User = require('./models/users.js');
exports.Action = require('./models/actions.js');
exports.Obj = require('./models/objs.js');