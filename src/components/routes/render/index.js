// @flow

import React from 'react';
import QueryRenderer from 'relay-query-lookup-renderer';

import LoaderComponent from './Loader';
import ErrorComponent from './Error';
import Boundary from './Boundary';

import type {
	ContextRouter
} from 'react-router-dom';

import type {
	ReadyState,
	GraphQLTaggedNode
} from 'react-relay'

import type {
	Environment
} from 'relay-runtime';

const unescapeParams = (params) =>
	Object
		.keys (params)
		.reduce ((res, key) => {
			if (params [key]) {
				res [key] = decodeURIComponent (
					params [key]
				);
			}

			return res;
		}, {});

const renderer = (Component, params) => ({error, props}: ReadyState) => {
	if (error) {
		return <ErrorComponent error={error}/>;

	} else if (props) {
		return <Component
			params={params}
			viewer={props.viewer}/>;
	}

	return <LoaderComponent/>;
};

export default (
	environment: Environment,
	Component: React$ComponentType<*>,
	Query: GraphQLTaggedNode
) => ({match: {params}}: ContextRouter) =>
	<Boundary>
		<QueryRenderer
			lookup
			query={Query}
			environment={environment}
			variables={unescapeParams (params)}
			render={renderer (Component, unescapeParams (params))}/>
	</Boundary>
