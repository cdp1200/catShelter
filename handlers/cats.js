const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const breeds = require('../data/breeds.json');
const cats = require('../data/cats.json');

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if(pathname === '/cats/add-cat' && req.method === "GET") {
        let filePath = path.normalize(path.join(__dirname, "../views/addCat.html"));
        
        const index = fs.createReadStream(filePath);

        index.on("data", (data) => {
            res.write(data);
        });

        index.on("end", () => {
            res.end();
        });

        index.on("error", (err) => {
            console.log(err);
        });


    } else if (pathname === '/cats/add-breed' && req.method === "GET") {
        let filePath = path.normalize(path.join(__dirname, "../views/addBreed.html"));
        
        const index = fs.createReadStream(filePath);

        index.on("data", (data) => {
            res.write(data);
        });

        index.on("end", () => {
            res.end();
        });

        index.on("error", (err) => {
            console.log(err);
        });
    } else if (pathname === '/cats/add-cat' && req.method === "POST") {
        let form = new formidable.IncomingForm();


        form.parse(req, (err, fields, files)=>{
            if(err) throw err;

            let oldPath = files.upload.path;
            let newPath = path.normalize(path.join(__dirname, '../content/images', files.upload.name));

            fs.rename(oldPath, newPath, (err) => {
                if(err) throw err;
                console.log('file/s was uploaded successfully');
            });

            fs.readFile('./data/cats.json', 'utf-8', (err, data) => {
                let allCats = JSON.parse(data);
                allCats.push({
                    id: Date.now(),
					...fields,
					image: files.upload.name,
                });
                let catJson = JSON.stringify(allCats);
                fs.writeFile('./data/cats.json', catJson, () => {
                    res.writeHead(301, {location: '/'});
                    res.end();
                });
            });
        });
    
    
        
    } else if (pathname === '/cats/add-breed' && req.method === "POST") {

        let formData = '';
        console.log(formData)

        req.on('data', (data) => {
            console.log(data);
            formData += data;
        });
        console.log("This is the formData" + formData);
        console.log(formData);
        req.on('end', () => {
            // this was originally fs.parse(formData)
            let body = qs.parse(formData);
            console.log(body.breed);

            fs.readFile('./data/breeds.json', (err, data) => {
                if(err) {
                    throw err;
                }
                console.log('This is my data to save' + data);
                let breeds = JSON.parse(data);
                breeds.push(body.breed);
                let json = JSON.stringify(breeds);

                fs.writeFile('./data/breeds.json', json, 'utf-8', () => console.log('The breed was uploaded succesfully'));
            });

            res.writeHead(301, {location: "/"});
            res.end();
        });
    } else {
        return true;
    }
}
