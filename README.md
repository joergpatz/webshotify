# Webshotify
A microservice for screenshotting websites

## Dependencies

1. Ensure that [Docker](https://www.docker.com/) is installed on the system
2. Pull my [phantomjs docker image](https://hub.docker.com/r/joergpatz/phantomjs/) `docker pull joergpatz/phantomjs`

## Install & Run

```bash
$ npm install
$ node server.js
$ open http://localhost:3000/webshot
```

## Still TODO

* Settings: website URI and viewportsize should be parametrized
* Integration Tests
* Dockerize Webshotify