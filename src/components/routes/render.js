// @flow

import React from 'react';
import Render from 'components/render';

import type {ContextRouter} from 'react-router-dom';
import type {GraphQLTaggedNode} from 'react-relay'
import type {Environment} from 'relay-runtime';

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

export default (
	environment: Environment,
	component: React$ComponentType<*>,
	query: GraphQLTaggedNode
) => ({match: {params}}: ContextRouter) =>
	<Render
		query={query}
		environment={environment}
		variables={unescapeParams (params)}
		component={component}
		componentProps={{params: unescapeParams (params)}}/>
