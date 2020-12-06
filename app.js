var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var Location = require("./models/location");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var weatherRouter = require("./routes/weather");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"), { extensions: "html" }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/weather", weatherRouter);

// Creates an entry in the database which stores a location object and its properties
app.post("/create", function (req, res) {
  // Create a Location from the submitted data
  var loc = new Location({
    lat: req.body.lat,
    lon: req.body.lon,
    zipCode: req.body.zipCode,
    cityName: req.body.cityName,
  });
  //Save location in database
  loc.save(function (err, loc) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(loc._id);
    }
  });
});

// Reads a specific user's info and serves it when called
app.get("/read", function (req, res) {
  // Read location data from the database
  Location.findById(req.query.id, function (err, loc) {
    if (err) {
      res.status(400).send(err);
    } else {
      if (loc === null) {
        res.send("Nothing here");
      } else {
        res.send(loc);
      }
    }
  });
});

// Serves all user info in the database when called
app.get("/readAll", function (req, res) {
  // Read location data from the database
  Location.findById(function (err, loc) {
    if (err) {
      res.status(400).send(err);
    } else {
      if (loc === null) {
        res.send("Nothing here");
      } else {
        res.send(loc);
      }
    }
  });
});

// Updates user info given an id and serves the updated info
app.post("/update", function (req, res) {
  //Update location information in the database using submitted data
  Location.findByIdAndUpdate(
    req.body.id,
    {
      lat: req.body.lat,
      lon: req.body.lon,
      zipCode: req.body.zipCode,
      cityName: req.body.cityName,
    },
    function (err, loc) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(loc);
      }
    }
  );
});

// Delete a specific set of data given its id
app.post("/delete", function (req, res) {
  Location.findByIdAndDelete(req.body.id, function (err, info) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(info);
    }
  });
});

// Clear the database of all data entries and sends back a message including the number of deleted entries
app.post("/deleteAll", function (req, res) {
  Location.deleteMany(function (err, info) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(`Deleted ${info.deletedCount} item(s).`);
    }
  });
});
module.exports = app;
