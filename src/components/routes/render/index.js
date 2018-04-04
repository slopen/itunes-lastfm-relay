import React from 'react';

import {
	Environment,
	Network,
	RecordSource,
	Store
} from 'relay-runtime';

import {QueryRenderer} from 'react-relay';

import LoaderComponent from './Loader';
import ErrorComponent from './Error';


export const fetchQuery = (operation, variables) =>
	fetch ('/graphql', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify ({
			query: operation.text,
			variables
		})
	})
		.then ((res) => res.json ());


export const environment = new Environment ({
	network: Network.create (fetchQuery),
	store: new Store (new RecordSource ())
});


export default (Component, Query) => ({match}) =>
	<QueryRenderer
		query={Query}
		variables={{...match.params}}
		environment={environment}
		render={({error, props}) => {
			if (error) {
				return <ErrorComponent error={error}/>
			} else if (props) {
				return <Component
					viewer={props.viewer}
					params={{...match.params}}/>;
			} else {
				return <LoaderComponent/>;
			}
		}}/>
