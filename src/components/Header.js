// @flow

import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';

import {Link} from 'react-router-dom';

import type {
    Header_viewer as Fragment
} from './__generated__/Header_viewer.graphql';


type Props = {
	params: {
		type?: 'tags' | 'artists'
	},
	viewer: Fragment
};

const Header = ({params, viewer}: Props = {}) => {
	const path = params.type === 'tags' ? 'artists' : 'tags';
	const title = params.type !== 'tags' ? 'artists' : 'tags';
	const count = viewer [title] && viewer [title].count;

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
	fragment Header_viewer on Viewer {
		artists (first:1) {
			count
		}
		tags (first:1) {
			count
		}
	}`
);