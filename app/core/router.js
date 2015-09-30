var restify = require('restify');
var userController = require('../controllers/user.js');
var server = restify.createServer();

server
  .use(restify.fullResponse())
  .use(restify.bodyParser());

server.get('/users/:id', userController.viewUser);
server.post('/users', userController.createUser);
server.get('/bosses', userController.findBosses);

module.exports = server;
