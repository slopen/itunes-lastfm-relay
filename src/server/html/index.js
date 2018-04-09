// @flow

import config from 'config';
import express from 'express';
import render from './render';
import preload from './preload';

import type {
	$Request,
	$Response
} from 'express';


const {ssr}: {ssr: string} = config;

export default express.Router ()

	.use ('*', async (req: $Request, res: $Response) =>
		res
			.status(200)
			.send (ssr
				? await preload (req)
				: render ()
			)
	);