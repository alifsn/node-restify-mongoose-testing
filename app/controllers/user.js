require('../models/user');

var mongoose = require('mongoose');

// Mockgoose is a simplified in memory database that allows you to perform actions on Mongoose Models without having a running instance of MongoDB.
var mockgoose = require('mockgoose');
mockgoose(mongoose);
mongoose.connect('mongodb://localhost/TestingDB-58');

var User = mongoose.model("User"),
  ObjectId = mongoose.Types.ObjectId;

exports.createUser = function(req, res, next) {
    var UserModel = new User(req.body);
    UserModel.save(function(err, User) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json({
                type: true,
                data: User
            })
        }
    })
}

exports.viewUser = function(req, res) {
    User.findById(new ObjectId(req.params.id), function(err, User) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            if (User) {
                res.json({
                    type: true,
                    data: User
                })
            } else {
                res.status(404);
                res.json({
                    type: false,
                    data: "User: " + req.params.id + " not found"
                })
            }
        }
    })
}

exports.updateUser = function(req, res, next) {
    var updatedUserModel = new User(req.body);
    User.findByIdAndUpdate(new ObjectId(req.params.id), updatedUserModel, function(err, User) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            if (User) {
                res.json({
                    type: true,
                    data: User
                })
            } else {
                res.json({
                    type: false,
                    data: "User: " + req.params.id + " not found"
                })
            }
        }
    })
}

exports.deleteUser = function(req, res, next) {
    User.findByIdAndRemove(new Object(req.params.id), function(err, User) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json({
                type: true,
                data: "User: " + req.params.id + " deleted successfully"
            })
        }
    })
}

exports.findBosses = function(req, res) {
    User.findBosses(function(err, users) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            if (users) {
                res.json({
                    type: true,
                    data: users
                })
            } else {
                res.status(404);
                res.json({
                    type: false,
                    data: "Bosses not found"
                })
            }
        }
    })
}
