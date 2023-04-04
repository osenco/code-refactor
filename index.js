/**
 * @TODO implement node-cluster
 *
 */

const http = require('http');

const serverWrapper = require('./lib/server-wrapper');

const server = http.createServer(serverWrapper);

const port = 8080;

server.listen(port, () => console.log(`Server listening on port: ${port}`));
