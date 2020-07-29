///////////////////////
//DEPENDENCIES
//////////////////////
// What your app needs to bring in to function
require("dotenv").config(); //reads .env file to bring environmental variables
const express = require("express"); //Brings in Express Library
const app = express(); //creates express application object
const morgan = require("morgan"); //Brings in Morgan Library
const cors = require("cors"); //Brings in CORS library (since we're building the front-end it's important we have security)
const mongoose = require("mongoose"); //bring in mongoose library

const PizzaRouter = require("./routes/Pizza.js"); //bring in the router
const RatRouter = require("./routes/Rat.js");
//////////////////////
//GlOBAL VARIABLES
/////////////////////
// Variables with global scope
const PORT = process.env.PORT; //port number for server as defined in environment variables
const NODE_ENV = process.env.NODE_ENV; //"development" or "production"
const mongoURI = process.env.mongoURI + "pizza"; //URI for connecting to database specified in .env; tells which database to connect to
const db = mongoose.connection; //the mongoose connection object (create events based on database connection, close connection)
const mongoConfigObject = { useNewUrlParser: true, useUnifiedTopology: true }; //Config option main purpose is to eliminate deprecation warnings

///////////////////////////
//CONNECT TO DATABASE
///////////////////////////
// Code for connecting to our mongo database
mongoose.connect(mongoURI, mongoConfigObject, () => {
  console.log("CONNECTED TO MONGO"); // the minute, we're connected the function runs
});

////////////////////////////
//CONNECTION MESSAGING /* db have a few events you can trigger off */
///////////////////////////
//Building in messages so we know when our database connection changes
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected!"));
db.on("disconnected", () => console.log("mongo disconnected"));

/////////////////////
// CORS SECURITY CONFIGURATIONS
/////////////////////
// CREATE A WHITELIST OF WHICH WEBSITES CAN MAKE API CALLS TO YOUR SERVER
const whitelist = ["http://localhost:3000/", "http://example2.com"]; //put in front-end URL to get access to your own 
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(
        new Error("Not allowed by CORS, domain needs to be added to whitelist")
      );
    }
  },
};

/////////////////////
// MIDDLEWARE
////////////////////
//UTILITY FUNCTIONS THAT RUN BEFORE YOUR ROUTES
NODE_ENV === "development" ? app.use(cors()) : app.use(cors(corsOptions)); //ternary operator; put this first to minimize the job: if they have permission, then server runs
// Enables websites in whitelist to make API calls to your server, enables all sites in development
app.use(express.json()); //Turns JSON from post/put/patch requests and converts them into req.body object
app.use(morgan("dev")); // Enables Morgan logging, creating more useful terminal logs while server runs
app.use(express.static("public")); //Allows static serving of files from public folder

////////////////////
// ROUTES AND ROUTERS
////////////////////
//These handle sending responses to server requests for spefic endpoints

app.use("/pizza", PizzaRouter) //send to the PizzaRouter when you see /pizza in the url
app.use("/rat", RatRouter)
///////////////////////////
//ROOT ROUTE (FOR TESTING) - good to have one test route to make sure your server is running
///////////////////////////
app.get("/", (req, res) => {
  res.send("If you see this then the server is working!");
});

////////////////////
// Server Listener
////////////////////
//Gets this server running
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
