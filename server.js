'use strict';

var path = require ('path');
var port = parseInt (process.env.PORT, 10) || 9000;

var app = require ('express');
var graphql = require ('graphql');
var graphqlHTTP = require ('express-graphql');

var schema = require ('./schema');
var mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect ('mongodb://localhost/lfm');

app ()
    .all ('*', (req, res, next) => {
        res.header ('Access-Control-Allow-Credentials', 'true');
        res.header ('Access-Control-Allow-Origin', req.headers.origin || '*');
        res.header ('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header ('Access-Control-Allow-Headers', 'X-Requested-With,X-HTTP-Method-Override,Content-Type,Accept');

        if (req.method === 'OPTIONS') {
            return res.send (200);
        }

        next ();
    })

    .use (
        '/graphql',
        graphqlHTTP ({
            schema: schema,
            pretty: true
        })
    )

    .use (
        app.static (
          path.resolve (__dirname, './dist')
        )
    )
    .get (
        '*',
        function(req, res) {
            res.sendfile('./dist/index.html');
        }
    )
    .listen (port, function () {
        console.log('graphql server running on http://localhost:' + port + '/graphql');
        console.log('express server started on port %s', port);
    });
