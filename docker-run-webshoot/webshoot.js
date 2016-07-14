"use strict";
var page = require('webpage').create(),
    system = require('system'),
    address;

if (system.args.length < 2) {
    console.error('Usage: webshoot.js URL');
    phantom.exit(1);
} else {
    address = system.args[1];
    page.viewportSize = {width: 1024, height: 768};

    page.open(address, function (status) {
        if (status !== 'success') {
            console.error('Unable to load resource URI!');
            phantom.exit(1);
        } else {
            window.setTimeout(function () {
                var base64 = page.renderBase64('PNG');
                console.log(base64);
                phantom.exit();
            }, 200);
        }
    });
}

// ERROR HANDLER

console.error = function () {
    system.stderr.write(Array.prototype.join.call(arguments, ' ') + '\n');
};

page.onError = function (msg, trace) {
    var msgStack = ['WEBPAGE ERROR: ' + msg];
    if (trace && trace.length) {
        msgStack.push('TRACE:');
        trace.forEach(function (item) {
            msgStack.push(' -> ' + item.file + ':' + item.line);
        });
    }
    console.error(msgStack.join('\n'));
    phantom.exit(1);
};

phantom.onError = function (msg, trace) {
    var msgStack = ['PHANTOM ERROR: ' + msg];
    if (trace && trace.length) {
        msgStack.push('TRACE:');
        trace.forEach(function (t) {
            msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function + ')' : ''));
        });
    }
    console.error(msgStack.join('\n'));
    phantom.exit(1);
};
