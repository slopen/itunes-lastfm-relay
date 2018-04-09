// @flow

import 'isomorphic-fetch';

import path from 'path';
import config from 'config';

import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import graphqlHTTP  from 'express-graphql';
import {graphqlBatchHTTPWrapper}  from 'react-relay-network-modern';

import cors from './cors';
import connectDb from './db';
import schema  from './schema';
import html from './html';


const {
    name,
    port,
    contentBase
}: {
    name: string,
    port: string,
    contentBase: string
} = config;

const PUBLIC_PATH = path.resolve (__dirname, contentBase);
const graphqlServer = graphqlHTTP ({schema, pretty: true});


(async (app) => {

    const connection = await connectDb ();

    app
        .use (cors)
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

