import 'isomorphic-fetch';

const config = require ('config');
const path = require ('path');
const bodyParser = require ('body-parser');

const app = require ('express');
const graphqlHTTP = require ('express-graphql');
const {graphqlBatchHTTPWrapper} = require ('react-relay-network-modern');

const schema = require ('./schema');
const mongoose = require ('mongoose');

const name = config.name;
const port = config.port;
const contentBase = config.contentBase;

const PUBLIC_PATH = path.resolve (__dirname, contentBase);
const INDEX_PATH = path.resolve (PUBLIC_PATH, 'index.html');

mongoose.Promise = global.Promise;
mongoose.connect (config.mongodb.connstr, config.mongodb.options);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const graphqlServer = graphqlHTTP ({schema, pretty: true});

import render from './html/render';


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

    .use (bodyParser.json ())

    .use ('/graphql/batch', graphqlBatchHTTPWrapper (graphqlServer))
    .use ('/graphql', graphqlServer)

    .use (
        app.static (PUBLIC_PATH)
    )

    .get ('*', async (req, res) => {
        res.send (await render (req));
    })

    .listen (port, () => {
        console.log (`* ${name} graphql server running on ${port}/graphql`);
        console.log (`* ${name} express server started on port ${port}`);
    });
