import React from 'react';
import QueryRenderer from 'relay-query-lookup-renderer';

import LoaderComponent from './Loader';
import ErrorComponent from './Error';

const unescapeParams = (params) =>
	Object
		.keys (params)
		.reduce ((res, key) => {
			res [key] = decodeURIComponent (params [key]);

			return res;
		}, {});

export default (environment, Component, Query) => ({match}) =>
	<QueryRenderer
		lookup
		query={Query}
		variables={unescapeParams (match.params)}
		environment={environment}
		render={(data) => {
			const {error, props} = data;

			try {
				if (error) {
					return <ErrorComponent error={error}/>
				} else if (props) {
					return <Component
						viewer={props.viewer}
						params={unescapeParams (match.params)}/>;
				} else {
					return <LoaderComponent/>;
				}
			} catch (e) {
				console.log ('* render error', e);
			}
		}}/>
