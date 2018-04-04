import React from 'react';

import {Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import Routes from './routes';

export default () =>
	<Router
		history={createBrowserHistory ()}>

		<Routes/>

	</Router>

