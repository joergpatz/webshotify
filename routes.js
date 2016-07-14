import { spawn } from 'child_process';
import path from 'path';
import restify from 'restify';
import killtree from './lib/killtree';

const hello = (req, res, next) => {
    res.send({message: 'Hello World'});
    next();
};

const webshot = (req, res, next) => {
    const webshootPath = path.resolve(__dirname, 'docker-run-webshoot');
    const defaultUri = 'http://info.cern.ch/hypertext/WWW/TheProject.html';
    const webshoot = spawn('./webshoot.sh', [defaultUri], {cwd: webshootPath});

    let stdout = '';
    let timer = setTimeout(() => {
        killtree(webshoot.pid);
        console.error('child process killed due to a time out');
        res.send(408, new restify.RequestTimeoutError('Request Time-out'));
    }, 3000);

    webshoot.stdout.on('data', chunk => {
        stdout += chunk;
    });
    webshoot.stdout.on('end', () => {
        clearTimeout(timer);
        res.setHeader('Cache', 'no-cache');
        res.setHeader('Content-Type', 'image/png');
        res.end(new Buffer(stdout, 'base64'));
    });
    webshoot.stderr.on('data', error => {
        clearTimeout(timer);
        if (error instanceof Uint8Array || error instanceof Uint8ClampedArray) {
            error = error.toString();
        }
        console.error('stderr: ' + error);
        res.send(500, new restify.InternalServerError(error));
    });
    webshoot.on('close', code => {
        console.log(`child process exited with code ${code}`);
        next();
    });
};

export default server => {

    server.get('/', hello);
    server.get('/webshot', webshot);

}
