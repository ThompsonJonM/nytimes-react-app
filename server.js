// Dependencies
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
mongoose.Promise = Promise;

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('public'));

mongoose.connect('mongodb://localhost/nytimesDB');
const db = mongoose.connection;

db.on('error', (err) => {
    console.log('An error occurred with the database: ', err);
});

db.once('open', () => {
    console.log('Database connection successful.');
});

app.get('/', (req, res) => {
    res.status(200).send('ok');
});

export default server = app.listen(3000, () => {
    let PORT = server.address().port;
    console.log('Server running. Listening on ' + PORT);
}); 