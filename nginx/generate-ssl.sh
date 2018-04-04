#!/usr/bin/env bash

cd nginx

openssl genrsa -des3 -passout pass:x -out server.pass.key 2048
openssl rsa -passin pass:x -in server.pass.key -out ssl.key
rm server.pass.key
openssl req -new -key ssl.key -out ssl.csr
openssl x509 -req -sha256 -days 365 -in ssl.csr -signkey ssl.key -out ssl.crt

cd -