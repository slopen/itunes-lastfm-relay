// @flow

import React from 'react';

import {Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import Routes from './routes';
import environment from '../../environment';


export default () =>
	<Router
		history={createBrowserHistory ()}>
		<Routes environment={environment}/>
	</Router>

