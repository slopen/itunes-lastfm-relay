import express from 'express';

const methods = [
	'GET',
	'PUT',
	'POST',
	'DELETE'
];

const headers = [
	'X-HTTP-Method-Override',
	'X-Requested-With',
	'X-Request-ID',
	'Content-Type',
	'Accept'
];

export default express.Router ()

	.all ('*', (req, res, next) => {
        res.header ('Access-Control-Allow-Credentials', 'true');
        res.header ('Access-Control-Allow-Origin', req.headers.origin || '*');
        res.header ('Access-Control-Allow-Methods', methods.join ());
        res.header ('Access-Control-Allow-Headers', headers.join ());

        if (req.method === 'OPTIONS') {
            return res.sendStatus (200);
        }

        next ();
    });