var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");
var Location = require("./models/location");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var weatherRouter = require('./routes/weather');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'), {extensions: 'html'}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/weather', weatherRouter);


app.post("/create", function(req, res) {

    // Create a Location from the submitted data
    var loc = new Location({
       lat: req.body.lat,
       lon: req.body.lon,
       zipCode: req.body.zipCode,
       cityName: req.body.cityName
    });
 
    loc.save(function(err, loc) {
       if (err) {
          res.status(400).send(err);
       } 
       else {
          res.send(loc._id);
       }
    });
 });

  //TODO: Update this to eventually just read a specific user's info
 app.get("/read", function(req, res) {

    // Read location data from the database
    Location.find(
        function(err, loc) {
        if (loc === null) {
            res.send("Nothing here");
        } 
        else {
            res.send(loc);
        }
    });
 });

  //TODO: Update this to eventually just update a specific user's info
 app.post("/update", function(req, res) {
    
    //Update location information in the database using submitted data
     Location.update(
        {lat: req.body.lat,
        lon: req.body.lon,
        zipCode: req.body.zipCode,
        cityName: req.body.cityName},
        function(err, loc) {
        if (err) {
           res.status(400).send(err);
        } 
        else {
           res.send(loc);
        }
     });
 });

 //TODO: Update delete to eventually just delete a specific user's info
 app.post("/delete", function(req, res) {
    
    //Update location information in the database using submitted data
     Location.remove(function(err, info) {
        if (err) {
           res.status(400).send(err);
        } 
        else {
           res.send(`Deleted ${info.deletedCount} item(s).`);
        }
     });
 });

module.exports = app;
