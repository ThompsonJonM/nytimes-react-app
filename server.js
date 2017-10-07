// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');

// Update mongoose promises to current promises
mongoose.Promise = Promise;

// Import the article schema for Mongo
const article = require('./client/src/models/article');

const PORT = process.env.PORT || 3001;
const app = express();

// Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Mongoose connection (will change when heroku involved)
// mongoose.connect('mongodb://localhost/nytimesDB');
mongoose.connect('mongodb://heroku_8kdqp265:@ds113835.mlab.com:13835/heroku_8kdqp265')
const db = mongoose.connection;

// DB error message
db.on('error', (err) => {
    console.log('An error occurred with the database: ', err);
});

// DB establish connect
db.once('open', () => {
    console.log('Database connection successful.');
});

// Delete route for saved articles
app.delete('/api/saved/:id', function(req, res) {
    article.findByIdAndRemove(req.params.id, function(err, response) {
        if (err) {
            res.status(err).send('An error occurred while deleting this article.');
        } else {
            res.status(200).send('Article deleted.');
        }
    });
});

// Post route for saved articles
app.post('/api/saved', function(req, res) {
    article.create({
        title: req.body.title,
        date: req.body.date,
        url: req.body.url
    }, (err) => {
        if (err) {
            res.status(err).send('Something went wrong while saving this article.')
        } else {
            res.status(200).send('Article saved.');
        }
    });
});

// Get route for saved articles
app.get('/api/saved', function(req, res) {
    article.find({}).limit(10).exec(function(err, doc) {
        if (err) {
            console.log('Something went wrong while finding your saved articles: ', + err);
        } else {
            res.status(200).send(doc);
        }
    });
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const server = app.listen(PORT, function() {
    console.log('Server running. Listening on ' + PORT);
}); 

// Export server for testing
module.exports = { server, PORT };