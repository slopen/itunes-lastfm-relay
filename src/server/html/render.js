import React from 'react';
import {renderToString} from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';

import environment, {cacheReady} from '../../environment';
import Routes from '../../components/routes/routes';
import html from './';

const Router = ({location, context}) =>
    <StaticRouter
        location={location}
        context={context}>
        <Routes environment={environment}/>
    </StaticRouter>;

export default async (req) => {
    let context = {};
    const location = req.url;

    renderToString (
        <Router
            location={location}
            context={context}/>
    );

    await cacheReady ();
    await new Promise ((resolve) => setTimeout (resolve, 1000));

    const data = environment
        .getStore ()
        .getSource ();

    const content = renderToString (
        <Router
            location={location}
            context={context}/>
    );

    return html (content, data);
}
