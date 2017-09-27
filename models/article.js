'use strict'

// Dependencies
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    date: {
        type: Date,
    },

    url: {
        type: String,
        required: true
    }
});

const article = mongoose.model('article', articleSchema);

export default article;