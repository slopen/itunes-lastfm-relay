import React from 'react';
import {Route, Switch} from 'react-router-dom';

import ArtistsCloudQuery from 'components/queries/ArtistsCloudQuery';
import TagsCloudQuery from 'components/queries/TagsCloudQuery';
import HeaderQuery from 'components/queries/HeaderQuery';
import ArtistQuery from 'components/queries/ArtistQuery';
import TagQuery from 'components/queries/TagQuery';

import Header from '../Header';
import ArtistsCloud from '../artist/ArtistsCloud';
import TagsCloud from '../tag/TagsCloud';
import TagPage from '../tag/TagPage';
import ArtistPage from '../artist/ArtistPage';

import render from './render';


export default ({environment}) =>
	<div className="app container">

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
						ArtistQuery
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
						TagQuery
					)}/>
			</Switch>
		</div>
	</div>


