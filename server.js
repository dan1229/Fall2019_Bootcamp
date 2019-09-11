var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);
  var pathname = parsedUrl.pathname;

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

fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable,
    then start the server.

    HINT: Check out this resource on fs.readFile
    //https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback

    HINT: Read up on JSON parsing Node.js
   */

    //Check for errors
    if (err) {
        throw err;
    }

   //Save the sate in the listingData variable already defined
   listingData = data;

  //Creates the server
  server = http.createServer(requestHandler);

  //Start the server
  server.listen(port, function() {
    console.log('Server listening on: http://127.0.0.1:' + port);
  });

});
