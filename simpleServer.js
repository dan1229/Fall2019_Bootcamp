var http = require('http');
var fs = require('fs');
var url = require('url');

var port = 8080;

var requestHandler = function(request, response) {
  var pathname = url.parse(request.url).pathname;
  if( pathname == '/listings' ){
    let rawdata = fs.readFileSync('listings.json');
    let listings = JSON.parse(rawdata);

    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(JSON.stringify(listings, null, 2));
    response.end();
  } else {
    response.writeHead(404, {"Content-Type": "text/html"});
    response.write("Bad gateway error");
    response.end();
  }
};

// a server is created, but not started
var server = http.createServer(requestHandler);

// the server is now started, listening for requests on port 8080 - go to your browerd and paste in http://127.0.0.1:8080
server.listen(port, function() {
  //once the server is listening, this callback function is executed
  console.log('Server listening on: http://127.0.0.1:' + port);
});
