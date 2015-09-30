'use strict';

var hippie = require('hippie');
var sinon = require('sinon');
var expect = require('chai').expect;

var mongoose = require('mongoose'),
  ObjectId = mongoose.Types.ObjectId;

// Mockgoose is a simplified in memory database that allows you to perform actions on Mongoose Models without having a running instance of MongoDB.
var mockgoose = require('mockgoose');
mockgoose(mongoose);
mongoose.connect('mongodb://localhost/TestingDB-58');

require('./../../app/models/user');
var User = mongoose.model('User');

var server = require('../../app/core/router');

describe('Server', function () {

  describe('GET /users endpoint', function () {

    before(function(){
      sinon.stub(User, 'findById', function(objId,fn) {
        return (new ObjectId('560bc0777924466819c1b808').equals(objId)) ? fn(null,{
              "email": "a@a.com",
              "password": "aaaaaa",
              "world": "Bossland"
          }) : fn(null,null); // null user, as mongoose does
      });
    });

    it('returns an existing user', function (done) {
      hippie(server)
        .json()
        .get('/users/560bc0777924466819c1b808')
        .expectStatus(200)
        .end(function(err, res, body) {
          if (err) throw err;
          done();
        });
    });

    it('returns an error if the id is wrong format', function (done) {
      hippie(server)
        .json()
        .get('/users/1')
        .expectStatus(500)
        .expectValue('message', 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters')
        .end(function(err, res, body) {
          if (err) throw err;
          done();
        });
    });

    it('returns a not found if the user does not exist', function (done) {
      hippie(server)
        .json()
        .get('/users/560bae5aeead03a03485cecf')
        .expectStatus(404)
        .end(function(err, res, body) {
          if (err) throw err;
          done();
        });
    });

  });

  describe('POST /users endpoint', function () {
    it('creates a user', function (done) {
      hippie(server)
        .json()
        .post('/users')
        .send({ email: 'a@a.com', password: 'Wot', world: 'Peasantland'})
        .expectStatus(200)
        .end(function(err, res, body) {
          if (err) throw err;
          done();
        });
    });

    it('fails on a 19th century user', function (done) {
      hippie(server)
        .json()
        .post('/users')
        .send({ password: 'Wot', world: 'Peasantland'}) // no email
        .expectStatus(500)
        .end(function(err, res, body) {
          if (err) throw err;
          done();
        });
    });
  });

  describe('GET /bosses endpoint', function () {
    before(function (done) {
      // create a boss and a peasant
      hippie(server)
        .json()
        .post('/users')
        .send({ email: 'boss@bossland.com', password: 'Wot', world: 'Bossland'})
        .expectStatus(200)
        .end(function(err, res, body) {
          if (err) throw err;
          hippie(server)
            .json()
            .post('/users')
            .send({ email: 'peasant@peasantland.com', password: '', world: 'Peasantland'})
            .expectStatus(200)
            .end(function(err, res, body) {
              if (err) throw err;
              done();
            });
        });
    });

    it('returns only bosses', function (done) {
      hippie(server)
        .json()
        .get('/bosses')
        .expectStatus(200)
        .expect(function(res, body, next) {
          expect(body.data).to.be.instanceof(Array);
          expect(body.data.length).to.eql(1);
          expect(body.data[0]).to.have.property('email','boss@bossland.com');
          expect(body.data[0]).to.have.property('world','Bossland');
          next();
        })
        .end(function(err, res, body) {
          if (err) throw err;
          done();
        });
    });
  });

});
