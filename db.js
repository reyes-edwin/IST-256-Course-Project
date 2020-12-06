// db.js
var mongoose = require("mongoose");
const password = 'TermProject256';
let dbName = 'userLocations';
mongoose.connect(`mongodb+srv://dronk:${password}@cluster0.s7ec9.mongodb.net/${dbName}?retryWrites=true&w=majority`, {useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true});
module.exports = mongoose;