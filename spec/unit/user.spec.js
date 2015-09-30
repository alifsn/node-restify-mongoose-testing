var sinon = require('sinon');
var expect = require('chai').expect;

var mongoose = require('mongoose');

// Mockgoose is a simplified in memory database that allows you to perform actions on Mongoose Models without having a running instance of MongoDB.
var mockgoose = require('mockgoose');
mockgoose(mongoose);
mongoose.connect('mongodb://localhost/TestingDB-58');

require('./../../app/models/user');
var User = mongoose.model('User');

describe('User', function() {
  it('finds the bosses in Bossland', function(done) {

    // test setup
    var bosses = [{
        "email": "a@a.com",
        "password": "aaaaaa",
        "world": "Bossland"
      }, {
        "email": "b@b.com",
        "password": "bbbbbb",
        "world": "Bossland"
      }];

    // mocking MongoDB
    sinon.stub(User, 'find', function(query,fn) {
      return (query.world == 'Bossland') ? fn(null,bosses) : fn(null,[]);
    });

    // calling the test case
    User.findBosses(function(err, retrievedBosses) {

      // asserting
      expect(err).to.be.null;
      expect(retrievedBosses).to.eql(bosses);

      // as our test is asynchronous, we have to tell mocha that it is finished
      done();
    });
  });
});
