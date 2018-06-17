// @flow

import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Header from 'components/Header';
import ArtistsCloud from 'components/artist/ArtistsCloud';
import TagsCloud from 'components/tag/TagsCloud';
import ArtistPage from 'components/artist/ArtistPage';
import TagPage from 'components/tag/TagPage';

import HeaderQuery from './queries/HeaderQuery';
import ArtistsCloudQuery from './queries/ArtistsCloudQuery';
import TagsCloudQuery from './queries/TagsCloudQuery';
import ArtistPageQuery from './queries/ArtistPageQuery';
import TagPageQuery from './queries/TagPageQuery';


import render from './render';

import type {Environment} from 'relay-runtime';

type Props = {
	environment: Environment
};


export default ({environment}: Props) =>
	<div className="app">

		<Route
			path="/:type?"
			component={render (
				environment,
				Header,
				HeaderQuery
			)}/>

		<hr/>

		<div className="content">
			<Switch>
				<Route
					exact
					path="/"
					component={render (
						environment,
						ArtistsCloud,
						ArtistsCloudQuery
					)}/>

				<Route
					exact
					path="/artists"
					component={render (
						environment,
						ArtistsCloud,
						ArtistsCloudQuery
					)}/>

				<Route
					exact
					path="/artists/:name"
					component={render (
						environment,
						ArtistPage,
						ArtistPageQuery
					)}/>

				<Route
					exact
					path="/tags"
					component={render (
						environment,
						TagsCloud,
						TagsCloudQuery
					)}/>

				<Route
					exact
					path="/tags/:name"
					component={render (
						environment,
						TagPage,
						TagPageQuery
					)}/>
			</Switch>
		</div>
	</div>



