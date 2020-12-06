// models/location.js
var db = require("../db");

var Location = db.model("Location", {
    lat: String,
    lon: String,
    zipCode: {type: String, required: false},
    cityName: String
});

module.exports = Location;