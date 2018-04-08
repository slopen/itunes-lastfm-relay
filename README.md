# itunes-lastfm-relay

Isomorphic Relay Modern app example

<p align="center">
	<img src="/src/images/screenshot-01.png" align="left" height="380" width="390"> | <img src="/src/images/screenshot-02.png" align="right" height="380" width="390">
	--- | ---
</p>


### packages

* webpack: 4.4

* flow: 0.69

* react: 16.3

* react-relay: 1.5

* react-router: 4.2

* mongoose: 4.5

### install

```
$ git clone git@github.com:slopen/itunes-lastfm-relay.git
$ cd itunes-lastfm-relay
$ yarn

```

### setup database from setup/data.zip

```
$ chmod +x setup/import.sh
$ yarn run setup

```

### production

```
$ yarn run production
```

* open `http://localhost:8080`

* [nginx setup](/nginx): `https://itunes-lastfm-relay`

### development

* [nginx setup](/nginx): `https://itunes-lastfm-relay`

```
$ yarn run dev
```
