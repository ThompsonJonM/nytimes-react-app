// Dependencies
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
mongoose.Promise = Promise;

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
    res.status(200).send('ok');
});

app.post('/api/saved', (req, res) => {
    res.status(200).send('ok');
});

app.get('/api/saved', (req, res) => {
    res.status(200).send('ok');
});

app.get('/', (req, res) => {
    res.status(200).send('ok');
});

const server = app.listen(3000, () => {
    let PORT = server.address().port;
    console.log('Server running. Listening on ' + PORT);
}); 

export default server;