#!/bin/sh

unzip setup/data.zip && \
mongoimport --db itunes-lastfm-relay --collection artists --file setup/artists.json --mode upsert && \
mongoimport --db itunes-lastfm-relay --collection tags --file setup/tags.json --mode upsert && \
rm setup/*.json