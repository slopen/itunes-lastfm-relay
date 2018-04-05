import 'isomorphic-fetch';

import path from 'path';
import env from 'process-env';
import config from 'config';

import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import graphqlHTTP  from 'express-graphql';
import {graphqlBatchHTTPWrapper}  from 'react-relay-network-modern';

import connectDb from './db';
import schema  from './schema';
import html from './html';

const {
    name,
    port,
    contentBase
} = config;

const PUBLIC_PATH = path.resolve (__dirname, contentBase);
const graphqlServer = graphqlHTTP ({schema, pretty: true});

env.set ('NODE_TLS_REJECT_UNAUTHORIZED', '0');


(async (app) => {

    const connection = await connectDb ();

    app
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

        .use (compression ())

        .use (bodyParser.json ())
        .use (express.static (PUBLIC_PATH))

        .use ('/graphql/batch', graphqlBatchHTTPWrapper (graphqlServer))
        .use ('/graphql', graphqlServer)
        .get ('*', html)

        .listen (port, () => {
            console.log (`* ${name} express server started on port ${port}`);
            console.log (`* ${name} mongoose connected to ${connection.port}/${connection.name}`);
            console.log (`* ${name} graphql server running on ${port}/graphql`);
        });

}) (express ());

