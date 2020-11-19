$(document).ready(function() {
    // testAPICall();
    // getLocation();

});

// Handler for auto-detect location button
$("#detectLocation").click(function(e) {
    //e.preventDefault();
    // alert("start");
    getAutoLocation();
    // alert("endOfClick");
});

//Delegate for changing the page during automatic location detection
function updatePage() {
    if (sessionStorage.getItem("lat")) {
        $(location).attr("href", "currentWeather.html");
    }
}

// Handler for zipCode input button, including validation that the zip code's data is available from the Weather API.
$("#zipCodeForm").submit(submitProvidedLocation);

function submitProvidedLocation() {
    let zipCode = $("#zipCode").val();
    if (verifyZipCode(zipCode)) {
        setZipCode(zipCode);
    } else {
        setZipCode(null);
        event.preventDefault();
        alert(
            "Sorry, it appears this zip code's weather data is unavailable.\nPlease enter a new zip code!"
        );
    }
}

//Retrieve location coordinates from Geolocation auto-detection.
function getAutoLocation() {
    if (navigator.geolocation) {
        // alert("getAutoLocation");
        navigator.geolocation.getCurrentPosition(setCoords, showAutoLocError);
        // alert("setCoords was called");
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function setCoords(position) {
    //alert("setcoords");
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    if (typeof Storage !== "undefined") {
        if (lat != null && lon != null) {
            sessionStorage.setItem("lat", lat);
            sessionStorage.setItem("lon", lon);
            sessionStorage.setItem("zipCode", "undetected");
            setName(lat, lon);
            // alert("calling clickHandler");
            //Used to Test Lat/Lon
            // let loc1 = sessionStorage.getItem("lat");
            // let loc2 = sessionStorage.getItem("lon");
            // alert("Lat: " + loc1 + " Lon: " + loc2);
            updatePage();
        } else {
            console.log("Error: The coordinates were registered as null.");
        }
    } else {
        alert("Sorry, your browser does not support Web Storage...");
    }
}


function showAutoLocError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert(
                "Please change your browser's permissions to allow for automatic location detection."
            );
            sessionStorage.setItem("lat", null);
            sessionStorage.setItem("lon", null);
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            // sessionStorage.setItem("lat", null);
            // sessionStorage.setItem("lon", null);
            break;
        case error.TIMEOUT:
            alert("The request to get your location timed out. Please");
            // sessionStorage.setItem("lat", null);
            // sessionStorage.setItem("lon", null);
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            // sessionStorage.setItem("lat", null);
            // sessionStorage.setItem("lon", null);
            break;
    }
}

//Set the zip code and coordinates after the zip code has been verified.
function setZipCode(zipCode) {
    if (typeof Storage !== "undefined") {
        sessionStorage.setItem("zipCode", zipCode);
        if (zipCode != null) {
            setCoordsFromZip(zipCode);
        }
    } else {
        alert("Sorry, your browser does not support Web Storage...");
    }
}

//Verify that the inputted zip code matches weather stored in the Weather API.
function verifyZipCode(zipCode) {
    let isValid = false;
    const apiKey = "c0c35b925bbddaaf1dca134adf31f13a";

    if (zipCode != null && zipCode >= 0) {
        $.ajax({
            method: "GET",
            url: `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}`,
            async: false,
            success: function(data) {
                console.log(data);
                isValid = true;
            },
            error: function(xhr, status, error) {
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

//Set the coordinates using a call to the API with the verified zip code.
function setCoordsFromZip(zipCode) {
    const apiKey = "c0c35b925bbddaaf1dca134adf31f13a";

    if (zipCode != null) {
        $.ajax({
            method: "GET",
            url: `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}`,
            async: false,
            success: function(data) {
                sessionStorage.setItem("lat", data.coord.lat);
                sessionStorage.setItem("lon", data.coord.lon);
                sessionStorage.setItem("cityName", data.name);
            },
            error: function(xhr, status, error) {
                var errorMessage = xhr.status + ": " + xhr.statusText;
                console.log("Error: " + errorMessage);
            },
        });
    }
}

//Set the city name using a call to the API with the detected latitude and longitude.
function setName(lat, lon) {
    const apiKey = "c0c35b925bbddaaf1dca134adf31f13a";
    // alert("setName");
    if (lat != null && lon != null) {
        $.ajax({
            method: "GET",
            url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
            async: false,
            success: function(data) {
                sessionStorage.setItem("cityName", data.name);
            },
            error: function(xhr, status, error) {
                var errorMessage = xhr.status + ": " + xhr.statusText;
                console.log("Error: " + errorMessage);
            },
        });
    }
}

/*
Functions meant to connect client and server for API call. Server is weather.js. 
I was able to retrieve the weather data by submitting a zip code, but if an invalid
zip code was entered the built-in Ajax handler was not catching the error properly,
and the code was hanging for 30-60 seconds before eventaully telling the user their
zip code was invalid. In the current implementation which directly calls the 
external OpenWeather API, this problem does not exist.
*/

// function verifyZipCodeAPI(zipCode) {
//   let isValid = false;

//   if (zipCode != null && zipCode >= 0) {
//     $.ajax({
//       method: "GET",
//       url: "/weather/zipCode",
//       data: {
//         zipCode: zipCode,
//       },
//       async: false,
//       success: function (data) {
//         console.log(data);
//         isValid = true;
//       },
//       error: function (xhr, status, error) {
//         var errorMessage = xhr.status + ": " + xhr.statusText;
//         console.log("Error: " + errorMessage);
//         isValid = false;
//       }
//     });
//   } else {
//     isValid = false;
//   }

//   return isValid;
// }

// function setCoordsFromZipAPI(zipCode) {
//   $.ajax({
//     method: "GET",
//     url: "/weather/zipCode",
//     data: {
//       zipCode: zipCode,
//     },
//     async: false,
//     success: function (data) {
//       sessionStorage.setItem("lat", data.coord.lat);
//       sessionStorage.setItem("lon", data.coord.lon);
//       sessionStorage.setItem("cityName", data.name);
//     },
//     error: function (xhr, status, error) {
//       var errorMessage = xhr.status + ": " + xhr.statusText;
//       console.log("Error: " + errorMessage);
//     },
//   });
// }

//  Test the Geolocation built-in API

// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else {
//     alert("Geoloc not supported");
//   }
// }

// function showPosition(position) {
//   alert("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
// }