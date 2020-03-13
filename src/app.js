const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser')


// App
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Database
mongoose.connect(process.env.DATABASE_CONNECTION_STRING,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useCreateIndex: true 
});

let db = mongoose.connection;

if(db){console.log(db.useDb)}


// Load models
const Apisky = require('./models/apisky');
  
db.on('connected', () => {
    console.log('Mongoose default connection is open');
});

db.on('error', err => {
    console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log(
        'Mongoose default connection is disconnected due to application termination'
        );
        process.exit(0);
    });
});



// Load routes
const indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);


module.exports = app;