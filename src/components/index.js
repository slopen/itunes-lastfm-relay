import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay/classic';

import {
    applyRouterMiddleware,
    browserHistory as history,
    Router
} from 'react-router';

import useRelay from 'react-router-relay';
import routes from './routes/Routes';
import '../styles/styles.less';


Relay.injectNetworkLayer (
    new Relay.DefaultNetworkLayer ('/graphql')
);

ReactDOM.render (
    <Router
        history={history}
        routes={routes}
        render={applyRouterMiddleware (useRelay)}
        environment={Relay.Store}/>,
    document.getElementById('root')
);