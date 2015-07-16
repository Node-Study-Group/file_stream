/* Creating a stream to read in the file one chunk at a time */

var http = require('http')
, parse = require('url').parse
, join = require('path').join
, fs = require('fs')
, portNumber = 7777;

var root = __dirname + '/data';

var server = http.createServer(function(req, res){
    var url = parse(req.url);
    var path = join(root, url.pathname);
    
    
    // creating a readable stream
    var stream = fs.createReadStream(path);
    
    // event listener to let us know if there's an error
    stream.on('error', function(e){
        res.end('SORRY, AN ERROR OCCURRED')
    });

    // event listener for data, which comes in chunks via a buffer
    stream.on('data', function(chunk){
        // add each chunk to the response object
        res.write(chunk);
        // log to console so we can see what's happening
        console.log('wrote one chunk: ', chunk);
        console.log('chunk length: ', chunk.length);
    });
    
    // when the stream ends, send the response
    stream.on('end', function(){
        res.end();
    });
    
})

server.listen(portNumber, function(){
    console.log("listening on port ", portNumber);
});