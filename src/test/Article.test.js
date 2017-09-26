// Dependencies
import mongoose from 'mongoose';
import chai, { expect } from 'chai';
import article from './../../models/article';

mongoose.connect('mongodb://localhost/testArticleDB');
const db = mongoose.connection;

db.on('error', (err) => {
    console.log('Something went wrong with the DB connection.');
});

db.once('open', () => {
    console.log('Test DB connected.');
})

it('Should validate title input', (done) => {
    let testModel = article ({
        title: 'Trump Says Offputting Thing, World Not Surprised',
        date: '',
        url: 'https://www.google.com'
    });

    testModel.save(done);
});

it('Should fail due to missing title/url string', (done) => {
    let testModel = article ({
        title: '',
        date: '',
        url: ''
    });

    testModel.save(done);
});