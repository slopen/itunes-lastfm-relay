import React from 'react';
import QueryRenderer from 'relay-query-lookup-renderer';

import LoaderComponent from './Loader';
import ErrorComponent from './Error';
import Boundary from './Boundary';


const unescapeParams = (params) =>
	Object
		.keys (params)
		.reduce ((res, key) => {
			res [key] = decodeURIComponent (params [key]);

			return res;
		}, {});

const renderer = (Component, params) => ({error, props}) => {
	if (error) {
		return <ErrorComponent error={error}/>;

	} else if (props) {
		return <Component
			params={params}
			viewer={props.viewer}/>;
	}

	return <LoaderComponent/>;
};

export default (environment, Component, Query) => ({match: {params}}) =>
	<Boundary>
		<QueryRenderer
			lookup
			query={Query}
			environment={environment}
			variables={unescapeParams (params)}
			render={renderer (Component, unescapeParams (params))}/>
	</Boundary>
