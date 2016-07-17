# Webshotify
A microservice for screenshotting websites

## Dependencies

1. Install [Node.js](https://nodejs.org)
2. Ensure that [Docker](https://www.docker.com/) is installed on the system
3. Pull my [phantomjs docker image](https://hub.docker.com/r/joergpatz/phantomjs/) `docker pull joergpatz/phantomjs`

## Install & Run

```bash
$ npm install
$ node server.js
$ open http://localhost:3000/webshot?uri=https://www.w3.org&sizeX=1280&sizeY=720
```

## Still TODO

* Integration Tests
* Dockerize Webshotify