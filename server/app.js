const http = require("node:http");
const { readFileSync } = require('fs');

const port = process.env.PORT || 3000;

const updateCORS = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); /* @dev First, read about security */
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Max-Age', 2592000); // 30 days
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
}

const server = http.createServer((req, res) => {
    const fileJSON = readFileSync('./server/config.json', 'utf8');
    updateCORS(res);
    
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    if (!fileJSON) {
        res.sendStatus(500);
    }

    res.end(fileJSON)

});

server.listen(port);
