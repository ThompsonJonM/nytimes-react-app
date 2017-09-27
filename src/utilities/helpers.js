// Dependencies
import axios from 'axios';

const APIKey = '3dbfbf1bb1034c4bb5e8901725645c29';

const helpers = {

    runQuery: (term, start, end) => {
        const term = term.trim();
        const start = start.trim() + '0101';
        const end = end.trim() + '1231';

        return axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
            params: {
                'api-key': APIKey,
                'q': term,
                'begin_date': start,
                'end_date': end
            }
        })

        .then((results) => {
            return results.data.response;
        });
    },

    getSaved: () => {
        return axios.get('/api/saved')
            .then((results) => {
                return results;
            });
    },

    postSaved: (title, date, url) => {
        const newArticle = { title: title, date: date, url: url };
        return axios.post('/api/saved', newArticle)
            .then((results) => {
                return results._id;
            });
    },

    deleteSaved: (title, data, url) => {
        return axios.delete('/api/saved', {
            params: {
                'title': title,
                'data': data,
                'url': url
            }
        })

        .then((results) => {
            return results;
        });
    }
}

export default helpers;