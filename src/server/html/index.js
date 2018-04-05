import config from 'config';
import express from 'express';
import render from './render';
import preload from './preload';


const {ssr} = config;

export default express.Router ()

	.use ('*', async (req, res) => {
		if (ssr) {
			return res.send (await preload (req));
		}

		res.send (render ());
	});