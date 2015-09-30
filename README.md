# node-restify-mongoose-testing

This repo demonstrates some testing, both unit and integration, of a RESTful api on a node.js server.

## The app

- The api is a simple [restify](http://mcavage.me/node-restify/) user management app on the node server.
- Users are stored at a MongoDB and models are handled by the [mongoose](http://mongoosejs.com/) node module.
- To provide a quick start of the app, [mockgoose](https://github.com/mccormicka/Mockgoose) is used, so there is no need to setup a real MongoDB.

Just do:

    npm install

And:

    node server.js

## The api

Create a user:

```
POST /users HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{ "email": "a@a.com", "password": "bbbbbb", "world": "Peasant" }
```

Response:

```
{
    "type": true,
    "data": {
        "__v": 0,
        "email": "a@a.com",
        "password": "bbbbbb",
        "world": "Peasant",
        "_id": "560be7bca6581744535d9aa4"
    }
}
```
Find the user:

```
GET /users/560be7bca6581744535d9aa4 HTTP/1.1
Host: localhost:3000
Content-Type: application/json
```
Response:

```
{
    "type": true,
    "data": {
        "email": "a@a.com",
        "password": "bbbbbb",
        "world": "Peasant",
        "_id": "560be7bca6581744535d9aa4",
        "__v": 0
    }
}
```
If you create some users in the "Bossland" world you will be able to retrieve them:

```
POST /users HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{ "email": "a@a.com", "password": "bbbbbb", "world": "Bossland" }
```

```
GET /bosses HTTP/1.1
Host: localhost:3000
Content-Type: application/json
```

```
{
    "type": true,
    "data": [
        {
            "email": "a@a.com",
            "password": "bbbbbb",
            "world": "Bossland",
            "_id": "560be927a6581744535d9aa5",
            "__v": 0
        }
    ]
}
```

## The specs

Now there comes the interesting part.
