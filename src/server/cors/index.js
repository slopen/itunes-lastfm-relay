// @flow

import express from 'express';

import type {
    $Request,
    $Response,
    NextFunction
} from 'express';

const methods: string [] = [
	'GET',
	'PUT',
	'POST',
	'DELETE'
];

const headers: string [] = [
	'X-HTTP-Method-Override',
	'X-Requested-With',
	'X-Request-ID',
	'Content-Type',
	'Accept'
];

export default express.Router ()

	.all ('*', (req: $Request, res: $Response, next: NextFunction) => {
        res.header ('Access-Control-Allow-Credentials', 'true');
        res.header ('Access-Control-Allow-Origin', req.headers.origin || '*');
        res.header ('Access-Control-Allow-Methods', methods.join ());
        res.header ('Access-Control-Allow-Headers', headers.join ());

        if (req.method === 'OPTIONS') {
            return res.sendStatus (200);
        }

        next ();
    });