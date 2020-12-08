Welcome to RainyDay! 

To start the application, first download the zip file and unzip all the files. Once you have opened the file, use the terminal and insert the following code in separate entries:

npm install
npm install express -g
npm install body-parser mongoose --save
SET DEBUG=IST-256-Course-Project
npm start

To view the webpage, navigate to http://127.0.0.1:3000 after you have run the above commands.

After doing this process the first time, you only need to enter npm start when you want to reopen the web page. 

To close the webpage, terminate the program by entering ctrl+c in the terminal and then enter y when it asks if you wish to terminate.

You may also view this webpage by navigating to: https://rainydayweather.herokuapp.com/ on the browser of your choosing.

Contribution Breakdown: 

Carrigan: 
Sprint 1:
    Created and styled the 7 day forecast and the hourly weather forecast
    Ideated how to potentially implement different features of the API to provide the user with a breath of information
Sprint 2: 
    Added javascript to weekly and hourly weather
    Created the calls to fill multiple times of weather in a single calls
    Formatted code to work in a single call for multiple dates
    Debugged various code that really didn't want to work for some reason
    Photoshop recolored all of the icons and build the icon object for ease of use across javascripts
Sprint 3:
    Ensured the new API calls and methods work and run as expected
    General debugging with the multiple weather displays

Drew: 
Sprint 1:
    Created and styled landing page (index.html)
    Ideated a transition from a sign-in page and personal dashboard to an in-app function to change location
    Prior to transition, developed sign-in page
Sprint 2: 
    Added javascript to landing page, including:
    Handle page navigation and location information exchange between landing page (index.html) and “Current Weather” page (currentWeather.html)
    Set up automatic detection of geographic coordinates to allow for an auto-location option of location input
    Input validation and error handling for location entry:
    Verified inputted zip code against OpenWeather API to ensure validity
    Checked proper output from Geolocation API used for auto-detection of location
Sprint 3:
    Built and implemented server-side API (weather.js) to facilitate calls to OpenWeather API from our client code (files within '/public/javascripts')
    Set up project to interact with database on MongoDB Atlas and connected the project with the database via Mongoose
    Wrote functions to handle CRUD operations and used Ajax to connect app.js to client code to facilitate CRUD behavior
    Implemented CRUD functionality across application and updated code for compatibility
    Migrated project to Heroku to allow for convenient access


Edwin: 

Sprint 1:
    Created the current, previous and the about page. Style every page using CSS flex except the about page that contains CSS grid. 
    Ideated how we will retrieve the API and implement the real data.
Sprint 2:
    Called the API with the unique API key and added various functions using JQuery in the current and previous pages. 
    This allowed the user to get real time data on the weather based on their location.
Sprint 3:
    Due to unforeseen and personal circumstances, Edwin's role was limited in Sprint 3. We agreed as a group that we were comfortable with this and feel he deserves full credit for the assignment.
