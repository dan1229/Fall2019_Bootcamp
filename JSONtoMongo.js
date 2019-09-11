'use strict';
/*
  Import modules/files you may need to correctly run the script.
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
const MongoClient = require('mongodb').MongoClient;
var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/
//see https://mongoosejs.com/docs/connections.html
//See https://docs.atlas.mongodb.com/driver-connection/
const client = new MongoClient(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  /*
    Instantiate a mongoose model for each listing object in the JSON file,
    and then save it to your Mongo database
    //see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

    Remember that we needed to read in a file like we did in Bootcamp Assignment #1.
   */

  const collection = client.db("test").collection("listings");

  let rawdata = fs.readFileSync('listings.json');
  let listings = JSON.parse(rawdata);
  var arr = listings.entries;

  arr.forEach(function(element) {
    // Create Listing object
    var listing = new Listing({
      name: element.name,
      code: element.code,
      coordinates: {
        latitude: typeof element.coordinates !== 'undefined' ? element.coordinates.latitude : null,
        longitude: typeof element.coordinates !== 'undefined'  ? element.coordinates.longitude : null
      },
      address: typeof element.address !== 'undefined'  ? element.address : null,
    })

    // Add to database
    collection.insertOne(listing, function(err, res) {
      if (err) throw err;
      console.log("inserting... " + listing.name);
      client.close();
    });
  });

  client.close();
});

/*
  Check to see if it works: Once you've written + run the script, check out your MongoLab database to ensure that
  it saved everything correctly.
 */
