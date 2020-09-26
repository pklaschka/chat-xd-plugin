// server.js
const logsemts = require('@fliegwerk/logsemts');
const ch = require('chalk');
const http = require('http');
http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('readable', function () {
            body += req.read() || '';
        });
        req.on('end', function() {
            logsemts.ChalkLogger(ch)(...logsemts.deserialize(body))
            res.write("OK");
            res.end();
        });
    }
}).listen(8080);
