import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import {
    applyRouterMiddleware,
    browserHistory as history,
    Router,
    Route,
    IndexRoute
} from 'react-router';

import useRelay from 'react-router-relay';

import routes from './routes/Routes';

require ('../styles/styles.less');

Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer('//localhost:9000/graphql')
);

ReactDOM.render(
    <Router
        history={history}
        routes={routes}
        render={applyRouterMiddleware(useRelay)}
        environment={Relay.Store}/>,
    document.getElementById('root')
);