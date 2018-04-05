# itunes-lastfm-relay

Isomorphic Relay Modern app example

<img src="/src/images/screenshot-01.png" align="left" height="330" width="330">

<img src="/src/images/screenshot-02.png" align="right" height="330" width="330">

* babel-core: 6.26

* mongoose: 4.5

* webpack: 4.4

* react: 16.3

* react-relay: 1.5

* react-router: 4.2

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

open localhost:8080

### development

[nginx setup](/nginx)

```
$ yarn run dev
```
