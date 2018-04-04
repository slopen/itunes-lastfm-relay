import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from 'components/App';
import Artist from 'components/artist/Page';
import ArtistsCloud from 'components/artist/Cloud';
import Tag from 'components/tag/Page';
import TagsCloud from 'components/tag/Cloud';
import LoaderStub from 'components/LoaderStub';

import ViewerQueries from 'components/queries/ViewerQueries';


const renderOnLoad = (element) =>
    ({props}) => React.createElement (
        props ? element : LoaderStub,
        {...props}
    );


export default (
    <Route
        path="/"
        component={App}
        queries={ViewerQueries}
        render={renderOnLoad (App)}>

        <IndexRoute
            component={ArtistsCloud}
            queries={ViewerQueries}
            render={renderOnLoad (ArtistsCloud)}/>

        <Route
            path="artists"
            component={ArtistsCloud}
            queries={ViewerQueries}
            render={renderOnLoad (ArtistsCloud)}/>

        <Route
            path="artist/:name"
            component={Artist}
            queries={ViewerQueries}
            render={renderOnLoad (Artist)}/>

        <Route
            path="tags"
            component={TagsCloud}
            queries={ViewerQueries}
            render={renderOnLoad (TagsCloud)}/>

        <Route
            path="tag/:name"
            component={Tag}
            queries={ViewerQueries}
            render={renderOnLoad (Tag)}/>

    </Route>
);