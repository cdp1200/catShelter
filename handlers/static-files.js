const url = require('url');
const path = require('path');
const fs = require('fs');
// const myfilepath = ('filepath');

function getContentType(url) {
    if(url.endsWith('css')) {
        return 'text/css';
    } else if (url.endsWith('js')) {
        return 'js';
    } else if (url.endsWith('img')) {
        return 'text/img';
    } else if (url.endsWith('html')) {
        return 'html';
    } else if (url.endsWith('png')) {
        return 'png';
    } else if (url.endsWith('jpeg')) {
        return 'jpeg';
    } else if (url.endsWith('ico')) {
        return 'ico';
    }
}


module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;
    // console.log(pathname);
    // console.log(url);

    if (pathname.startsWith('/content') && req.method === "GET") {
        // let filepath = path.normalize(
        //     path.join(pathname, "../site.css")
        // );

        fs.readFile(`./${pathname}`, 'utf-8', (err, data) => {
            if(err) {
                console.log(err);
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.write("Error was found");
                res.end();    
            }
            console.log(pathname);
            res.writeHead(200, {'Content-Type': getContentType(pathname)});
            res.write(data);
            res.end();
        })

        
        // let filepath = path.normalize(
        //     path.join(__dirname, "../content/styles/site.css")
        // );

        // fs.readFile(filepath, (err, data) => {
        //     if(err) {
        //         console.log(err);
        //         res.writeHead(404, {"Content-Type": "text/plain"});
        //         res.write(404);
        //         res.end();
        //         return;
        //     }
        //     res.writeHead(200, {"Content-Type": "text/html"});
        //     res.write(data);
        //     res.end(); 
        // })
    } else {
        return true;
    }
}