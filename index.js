// Copyright (c) 2014 Darach Ennis < darach at gmail dot com >.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CON

var heapdump = require('heapdump');
var agent = require('webkit-devtools-agent');

var agentOn = false;
var onActivate = undefined;
var onDeactivate = undefined;
var onDump = undefined;

module.exports = function(opts) {
    if (!opts) opts = {};
    if (!opts.dumpOnDemand) opts.dumpOnDemand = false;
    if (!opts.dumpInterval) opts.dumpInterval = 360000; // default heapdump snapshot interval is every hour
    if (!opts.activateAgentOnStart) opts.activateAgentOnStart = false;

    if (opts.activateAgentOnStart) {
        process.kill(process.pid, 'SIGUSR2');
    }

    if (!opts.dumpOnDemand) {
        setInterval(function () { snapshot() }, opt.dumpInterval)
    }
};

process.on('SIGUSR2', function() {
    if (agentOn && onDeactivate) onDeactivate();
    if (!agentOn && onActivate) onActivate();
    agentOn = !agentOn;
});

var isWatching = function() {
    return agentOn;
}

var toggle = function() {
    process.kill(process.pid, 'SIGUSR2');
}

var snapshot = function() {
    if (onDump) onDump();
    heapdump.writeSnapshot();
}

var onActivate = function(cb) {
    onActivate = cb;
}

var onDeactivate = function(cb) {
    onDeactivate = cb;
}

var onDump = function(cb) {
    onDump = cb;
}

module.exports.snapshot = snapshot;
module.exports.isWatching = isWatching;
module.exports.toggle = toggle;
module.exports.onActivate = onActivate;
module.exports.onDeactivate = onDeactivate;
module.exports.onDump = onDump;
