'use strict'

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

it('Should validate against bad title/url input', (done) => {
    let testModel = article ({
        title: !221,
        date: '',
        url: 22
    });

    testModel.save(done);
});