'use strict'

// Dependencies
import axios from 'axios';

const authKey = '';

const helpers = {
    runQuery: (searchTerm) => {
        console.log('Current search term: ' + searchTerm);

        const queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=' + authKey + '&q=' + searchTerm;
        
        return axios.get(queryURL).then((response) => {
            console.log(response);

            if(response.data.response.docs[0]) {
                return response.data.response.docs;
            } else {
                return '';
            }
        });
    },

    getSaved: () => {
        return axios.get('/api/saved');
    },

    saveArticle: (articleTitle, articleDate, articleURL) => {
        return axios.post('/api/saved', 
            {

                title: articleTitle,
                date: articleDate,
                url: articleURL

            }
        );
    },

    deleteArticle: (articleID) => {
        return axios.delete('/api/saved' + articleID).then(res => {
            console.log('Article deleted: ' + res);
        }).catch(err => {
            console.log('An error occurred while attempting to delete the article: ' + err);
        });
    }
};