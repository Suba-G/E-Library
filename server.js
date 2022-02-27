const http = require('http'); // Import Node.js core module
const fs = require('fs');

function sendPage(pageName, res, contentType = 'text/html') {
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(pageName).pipe(res);
}

function serveStaticFiles(req, res){
    const fileName = req.url.substr(req.url.lastIndexOf("/") + 1);

    let contentType = "";
    if(fileName.endsWith(".js")){
        contentType = "text/javascript";
    } else if(fileName.endsWith(".css")){
        contentType = "text/css";
    } else if(fileName.endsWith(".jpg")){
        contentType = "image/jpeg";
    }

    sendPage(`static/${fileName}`, res, contentType);
}

const server = http.createServer((req, res) => {

    if(req.url.startsWith("/static/")){
        serveStaticFiles(req, res);
        return;
    }

    switch(req.url){
        case "/":
            sendPage("index.html", res);
            break;
        case "/dashboard":
            sendPage("home.html", res);
            break;
        default:
            res.statusCode = 404;
            res.write("Page Not Found!", (err) =>{
                console.error("Failed to send response!", err);
            });
            res.end();
    }

});
server.listen(5000); //6 - listen for any incoming requests
console.log('Node.js web server at port 5000 is running..');
