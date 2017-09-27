'use strict'

// Dependencies
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// Update mongoose promises to current promises
mongoose.Promise = Promise;

// Import the article schema for Mongo
import article from './models/article';

const app = express();

// Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));

// Mongoose connection (will change when heroku involved)
mongoose.connect('mongodb://localhost/nytimesDB');
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
app.delete('/api/saved', (req, res) => {
    article.findByIdAndRemove(req.params.id, (err, response) => {
        if (err) {
            res.send('An error occurred while deleting this article: ' + err);
        } else {
            res.send('Article deleted.');
        }
    });
});

// Post route for saved articles
app.post('/api/saved', (req, res) => {
    article.create({
        title: req.body.title,
        date: req.body.date,
        url: req.body.url
    }, (err) => {
        if (err) {
            res.send('Something went wrong while saving this article: ', + err)
        } else {
            res.send('Article saved.');
        }
    });
});

// Get route for saved articles
app.get('/api/saved', (req, res) => {
    article.find({}).limit(10).exec((err, doc) => {
        if (err) {
            console.log('Something went wrong while finding your saved articles: ', + err);
        } else {
            res.send(doc);
        }
    });
});

// localhost:3000/ should respond with index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const server = app.listen(3000, () => {
    let PORT = server.address().port;
    console.log('Server running. Listening on ' + PORT);
}); 

// Export server for testing
export default server;