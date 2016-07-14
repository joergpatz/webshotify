/**
 * @see: https://github.com/foreverjs/forever-monitor/blob/master/lib/forever-monitor/common.js
 */

var psTree = require('ps-tree');

module.exports = function (pid, signal, callback) {
    signal   = signal   || 'SIGKILL';
    callback = callback || function () {};

    if (process.platform !== 'win32') {
        psTree(pid, function (err, children) {
            [pid].concat(
                children.map(function (p) {
                    return p.PID;
                })
            ).forEach(function (tpid) {
                try { process.kill(tpid, signal) }
                catch (ex) { }
            });

            callback();
        });
    }
    else {
        try { process.kill(pid, signal) }
        catch (ex) { }
        callback();
    }
};
