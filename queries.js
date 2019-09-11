/* Add all the required libraries*/
const MongoClient = require('mongodb').MongoClient;
var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/
mongoose.connect(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

// const client = new MongoClient(config.db.uri, { useNewUrlParser: true });
// client.connect();

/* Fill out these functions using Mongoose queries*/
//Check out - https://mongoosejs.com/docs/queries.html
var findLibraryWest = function() {
  /*
    Find the document that contains data corresponding to Library West,
    then log it to the console.
   */
  Listing.find({
    code: "LBW",
    name: "Library West"
  }).exec(function (err, docs) {
     if(err) {
       console.log(err);
       throw err;
     } else {
       console.log(docs);
     }
  });
};

var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console.
   */
   Listing.deleteOne({
     code: "CABL",
   }).exec(function (err, docs) {
      if(err) {
        console.log(err);
        throw err;
      } else {
        console.log("deleting..." + docs);
      }
   });
};

var updatePhelpsLab = function() {
  /*
    Phelps Lab address is incorrect. Find the listing, update it, and then
    log the updated document to the console.
   */
   Listing.findOne({
     code: "PHL",
     name: "Phelps Laboratory",
   }).exec(function (err, doc) {
      if(err) {
        console.log(err);
        throw err;
      }
      doc.address = "**UPDATED** ADDRESS";
      console.log("updating..." + doc);
      doc.save();
   });
};

var retrieveAllListings = function() {
  /*
    Retrieve all listings in the database, and log them to the console.
   */
   Listing.find({}).exec(function (err, docs) {
      if(err) {
        console.log(err);
        throw err;
      } else {
        console.log(docs);
      }
   });
};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
