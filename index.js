/* Reading a whole file */

var http = require('http')
, parse = require('url').parse
, join = require('path').join
, fs = require('fs')
, portNumber = 7777;


// setting up the root directory for our files
var root = __dirname + '/data';


//making a server
var server = http.createServer(function(req, res){
    //get a URL out of the request
    var url = parse(req.url); 
    //add it to the root for a full pathway
    var path = join(root, url.pathname);  
    // or hardcode for relative path
    var relPath = './data' + url.pathname;
    
    
    //read a file and send the data from it
    fs.readFile(relPath, function(err, data){
        if (err) {
            if(req.url !== '/favicon.ico'){  //because of all the favicon errors
                res.end('ERROR');
                return console.log(err);
            }
        }
        res.end(data);
    })
})

server.listen(portNumber, function(){
    console.log("listening on port ", portNumber);
});