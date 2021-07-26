const http = require('http');
const port = 2244;
const handlers = require('./handlers');

http.createServer((req, res) => {
    
    for(let handler in handlers) {
        if(!handler(req, res)) {
            break;
        }
    }
    
    // res.writeHead(200, {'Content-Type': 'text/plain'});
    // res.write('Hello world');
    // res.end();
}).listen(port);

