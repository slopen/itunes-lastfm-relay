#!/bin/sh

unzip setup/data.zip && \
mongoimport --db lfm --collection artists --file setup/artists.json --mode upsert && \
mongoimport --db lfg --collection tags --file setup/tags.json --mode upsert \
rm setup/*.json