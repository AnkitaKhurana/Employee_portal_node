require('dotenv').config()
const app = require("./app/app");
let port = process.env.PORT ;
const mongoose = require("mongoose");
const  DB_URI  = process.env.MONGO_DB_URI;

mongoose.connection.on("open", function(ref) {
    console.log("Connected to mongo server.");
    return ;
});

mongoose.connection.on("error", function(err) {
    console.log("Could not connect to mongo server!");
    return console.log(err);
});

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

let server = app.listen(port, function () {
   let  add = server.address();   
   console.log("Employee portal backend running at ", add)
})