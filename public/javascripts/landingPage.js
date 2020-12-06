$(document).ready(function () {
  // Deletes a user's previous weather data if they return to the welcome page after being in other parts of the site
  if (sessionStorage.sessionID !== "undefined") {
    deleteLocationData(sessionStorage.sessionID);
  }
  // Ties global variable 'sessionID' to sessionStorage.sessionID--which holds the id for the user's location entry
  setSessionID(sessionStorage.sessionID);
});

/* SECTION: CRUD Operations */

// Sets an ID called SessionID, which saves through page refreshes so data can be accessed from the database via an ID
function setSessionID(id) {
  if (typeof Storage !== "undefined") {
    sessionStorage.setItem("sessionID", id);
  } else {
    alert("Sorry, your browser does not support Web Storage...");
  }

  sessionID = sessionStorage.sessionID;
}

// Creates an entry in the database given location data and connects this entry to the SessionID
function createLocationData(lat, lon, zip, cityName) {
  $.ajax({
    method: "POST",
    url: "/create",
    data: {
      lat: lat,
      lon: lon,
      zipCode: zip,
      cityName: cityName,
    },
    async: false,
    success: function (data) {
      setSessionID(data);
      console.log(`Data stored successfully under id: ${sessionID}`);
    },
    error: function (xhr, status, error) {
      var errorMessage = xhr.status + ": " + xhr.statusText;
      console.log("Error: " + errorMessage);
    },
  });
}

// Reads the data from an entry in the database given its ID and returns the data as a json object--or returns null if there's an error
function readLocationData(sessionID) {
  var locationData;

  $.ajax({
    method: "GET",
    url: "/read",
    data: {
      id: sessionID,
    },
    async: false,
    success: function (data) {
      locationData = {
        lat: data.lat,
        lon: data.lon,
        zipCode: data.zipCode,
        cityName: data.cityName,
      };
    },
    error: function (xhr, status, error) {
      var errorMessage = xhr.status + ": " + xhr.statusText;
      console.log("Error: " + errorMessage);
      locationData = null;
    },
  });

  return locationData;
}

// Updates an entry in the database given its ID and and the data to be updated
function updateLocationData(sessionID, lat, lon, zip, cityName) {
  $.ajax({
    method: "POST",
    url: "/update",
    data: {
      id: sessionID,
      lat: lat,
      lon: lon,
      zipCode: zip,
      cityName: cityName,
    },
    async: false,
    success: function (data) {
      console.log(`Data has been updated to: \n${data}`);
    },
    error: function (xhr, status, error) {
      var errorMessage = xhr.status + ": " + xhr.statusText;
      console.log("Error: " + errorMessage);
    },
  });
}

// Deletes an entry given its ID and logs what was deleted to the console
function deleteLocationData(sessionID) {
  $.ajax({
    method: "POST",
    url: "/delete",
    data: {
      id: sessionID,
    },
    success: function (data) {
      console.log(data);
    },
    error: function (xhr, status, error) {
      var errorMessage = xhr.status + ": " + xhr.statusText;
      console.log("Error: " + errorMessage);
    },
  });
}

// Deletes all entries in the database
function clearData(lat, lon, zip, cityName) {
  $.ajax({
    method: "POST",
    url: "/deleteAll",
    async: false,
    success: function (data) {
      console.log(data);
    },
    error: function (xhr, status, error) {
      var errorMessage = xhr.status + ": " + xhr.statusText;
      console.log("Error: " + errorMessage);
    },
  });
}

/* SECTION: Main logic to handle interaction between the user and the landing page */

// Handler for auto-detect location button
$("#detectLocation").click(function (e) {
  getAutoLocation();
});

// Delegate for changing the page during automatic location detection
function updatePage() {
  if (readLocationData(sessionID).lat) {
    $(location).attr("href", "currentWeather.html");
  }
}

// Handler for zipCode input button, including validation that the zip code's data is available from the Weather API
$("#zipCodeForm").submit(submitProvidedLocation);

// Callback function for above handler, verifies validity of zip code via OpenWeather API then calls setZipCode() if the zip is valid
function submitProvidedLocation() {
  let zipCode = $("#zipCode").val();

  if (verifyZipCode(zipCode)) {
    setZipCode(zipCode);
  } else {
    event.preventDefault();
    alert(
      "Sorry, it appears this zip code's weather data is unavailable.\nPlease enter a new zip code!"
    );
  }
}

// Retrieve location coordinates from Geolocation API 
function getAutoLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setCoords, showAutoLocError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Given geographic coordinates from getAutoLocation(), this gathers the city name associated with the coordinates and creates a location entry in the database
function setCoords(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  if (lat != null && lon != null) {
    createLocationData(lat, lon, "undetected", getName(lat, lon));
    updatePage();
  } else {
    console.log("Error: The coordinates were registered as null.");
  }
}

// Error handling function if an issue arises when getAutoLocation() is attempting to detect a user's location
function showAutoLocError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert(
        "Please change your browser's permissions to allow for automatic location detection."
      );
      deleteLocationData(sessionID);
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get your location timed out. Please");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}

// Set the zip code, geographic coordinates, and city name after the zip code has been verified via verifyZipCode()
function setZipCode(zipCode) {
  if (zipCode != null) {
    var coords = getCoordsFromZip(zipCode);
    createLocationData(coords.lat, coords.lon, zipCode, coords.cityName);
  } else {
    createLocationData(null, null, null, null);
  }
}

/* SECTION: Functions which use ajax to interact with the API */

// Verify that the inputted zip code has available weather data in the OpenWeather API and return a boolean indicating the zip code's validity
function verifyZipCode(zipCode) {
  let isValid = false;

  if (zipCode != null && zipCode >= 0) {
    $.ajax({
      method: "GET",
      url: "/weather/zipCode",
      data: {
        zipCode: zipCode,
      },
      async: false,
      success: function (data) {
        console.log(data);
        if (data.name === "Error") {
          isValid = false;
        } else {
          isValid = true;
        }
      },
      error: function (xhr, status, error) {
        var errorMessage = xhr.status + ": " + xhr.statusText;
        console.log("Error: " + errorMessage);
        isValid = false;
      },
    });
  } else {
    isValid = false;
  }

  return isValid;
}

// Get the coordinates and city name associated with a zip code using a call to the OpenWeather API with a verified zip code
function getCoordsFromZip(zipCode) {
  var coords;

  $.ajax({
    method: "GET",
    url: "/weather/zipCode",
    data: {
      zipCode: zipCode,
    },
    async: false,
    success: function (data) {
      coords = {
        lat: data.coord.lat,
        lon: data.coord.lon,
        cityName: data.name,
      };
    },
    error: function (xhr, status, error) {
      var errorMessage = xhr.status + ": " + xhr.statusText;
      console.log("Error: " + errorMessage);
      coords = null;
    },
  });

  return coords;
}

// Get the city name associated with geographic coordinates using a call to the OpenWeather API 
function getName(lat, lon) {
  var cityName;

  if (lat != null && lon != null) {
    $.ajax({
      method: "GET",
      url: "/weather/coords",
      data: {
        lat: lat,
        lon: lon,
      },
      async: false,
      success: function (data) {
        cityName = data.name;
      },
      error: function (xhr, status, error) {
        var errorMessage = xhr.status + ": " + xhr.statusText;
        console.log("Error: " + errorMessage);
        cityName = null;
      },
    });
  }

  return cityName;
}
