require("babel-register");
require("babel-polyfill");

var restify = require('restify');
var server = restify.createServer({name: 'Webshotify'});

server.use(restify.fullResponse());
server.use(restify.bodyParser());
server.use(restify.queryParser());

var port = normalizePort(process.env.NODE_PORT) || 3000;

server.listen(port, function() {
    console.log('%s listening at %s', server.name, server.url);
});

var routes = require('./routes')['default'](server);

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
