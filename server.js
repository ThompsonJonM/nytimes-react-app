// Dependencies
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
mongoose.Promise = Promise;

import article from './models/article';

const app = express();

// Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));

mongoose.connect('mongodb://localhost/nytimesDB');
const db = mongoose.connection;

db.on('error', (err) => {
    console.log('An error occurred with the database: ', err);
});

db.once('open', () => {
    console.log('Database connection successful.');
});

app.delete('/api/saved', (req, res) => {
    const url = req.param('url');

    article.find({ 'url': url }).remove().exec((err, data) => {
        if (err) {
            console.log('Something went wrong with deleting this article.', err);
        } else {
            res.send('Article deleted.');
        }
    });
});

app.post('/api/saved', (req, res) => {
    const newArticle = new article(req.body);

    const title = req.body.title;
    const date = req.body.date;
    const url = req.body.url;

    newArticle.save((err, doc) => {
        if(err) {
            console.log('Something went wrong while saving this article.', err);
        } else {
            res.send('Article saved.', doc._id);
        }
    });
});

app.get('/api/saved', (req, res) => {
    article.find({})
        .exec((err, doc) => {
            if (err) {
                console.log('Something went wrong while finding your saved articles.', err);
            } else {
                res.send(doc);
            }
        });
});

app.get('/', (req, res) => {
    res.sendFile('./public/index.html');
});

const server = app.listen(3000, () => {
    let PORT = server.address().port;
    console.log('Server running. Listening on ' + PORT);
}); 

export default server;