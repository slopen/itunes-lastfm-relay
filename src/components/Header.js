// @flow

import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';

import {Link} from 'react-router-dom';

type HeaderType = {|
	+artists: ?{|
		+count: ?number
	|},
	+tags: ?{|
		+count: ?number
	|}
|};

type Props = {
	params: {
		type?: 'tags' | 'artists'
	},
	data: HeaderType
};

const Header = ({params, data}: Props = {}) => {
	const path = params.type === 'tags' ? 'artists' : 'tags';
	const title = params.type !== 'tags' ? 'artists' : 'tags';
	const count = data [title] && data [title].count;

	return (
		<h1 className="main-header hoverable">
			<div className="pull-right counter">
				{count ? (
					<Link to={'/' + title}>{count}</Link>
				) : null}
			</div>
			<Link to={'/' + path}>{title}</Link>
		</h1>
	);
}

export default createFragmentContainer (Header, graphql`
	fragment Header on RootQuery {
		artists (first:1) {
			count
		}
		tags (first:1) {
			count
		}
	}`
);