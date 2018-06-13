// @flow

import React from 'react';
import {renderToString} from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';

import environment, {cacheReady} from '../../environment';
import Routes from '../../components/routes/routes';
import render from './render';


import type {$Request} from 'express';
import type {RecordSource} from 'react-relay';

type RouterParams = {
    location: string,
    context: Object
};


const Router = ({location, context}: RouterParams) =>
    <StaticRouter
        location={location}
        context={context}>
        <Routes environment={environment}/>
    </StaticRouter>;

export default async (req: $Request, context: Object = {}) => {
    const location = req.originalUrl;

    renderToString (
        <Router
            location={location}
            context={context}/>
    );

    await cacheReady ();

    const data: RecordSource = environment
        .getStore ()
        .getSource ();

    const content = renderToString (
        <Router
            location={location}
            context={context}/>
    );

    return render (content, data);
}
