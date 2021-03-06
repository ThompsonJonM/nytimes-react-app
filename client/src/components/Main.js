// Dependencies
import React from 'react';
import helpers from './utilities/helpers';

// Children
import Saved from './children/Saved'
import Search from './children/Search'

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
            results: [],
            resultToSave: {},
            saved: []
        };

        // Binds
        this.setTerm = this.setTerm.bind(this);
        this.setArticleToSave = this.setArticleToSave.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this)
    }

    componentDidMount() {
        helpers.getSaved().then(function(res) {
            console.log('Current saved articles: ' + res);
            if (res !== this.state.saved) {
                console.log('Saved articles: ' + res.data);
                this.setState({ saved: res.data });
            }
        }.bind(this));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchTerm !== this.state.searchTerm) {
            console.log('You updated a search term.');

            helpers.runQuery(this.state.searchTerm).then((data) => {
                if (data !== this.state.results) {
                    console.log('Data: ' + data[0].headline.main);

                    this.setState({ results: data });
                }
            });
        }
    }

    setTerm(term) {
        this.setState({
            searchTerm: term
        });
    }

    setArticleToSave(index, article) {
        const newState = this.state.resultToSave;
        newState.title = article.title;
        newState.date = article.date;
        newState.url = article.url;

        this.setState({
            resultToSave: newState
        });
        console.log('New article saved to main: ' + this.state.resultToSave.title);

        helpers.saveArticle(this.state.resultToSave.title, this.state.resultToSave.date, this.state.resultToSave.url).then((data) => {
            console.log('Saved data: ' + data);

            this.setState(prevState => ({
                saved: [...prevState.saved, this.state.resultToSave],
                results: [...prevState.results.slice(0, index), ...prevState.results.slice(index+1)]
            }));
        });
    }

    deleteArticle(articleID, index) {
        console.log('Deleting article with ID: ' + articleID);

        helpers.deleteArticle(articleID).then(() => {
            this.setState((prevState) => ({
                saved: [...prevState.saved.slice(0, index), ...prevState.saved.slice(index+1)]
            }));
        });
    }

    render() {
        return (
            <div className='container'>
                <div className='jumbotron'>
                    <div className='container text-center'>
                        <h2> NY Times React Scrubber </ h2>
                    </ div>
                </ div>

                <div className='row text-center'>
                    <Search setTerm={ this.setTerm } setArticleToSave={ this.setArticleToSave } saved={ this.state.saved } results={ this.state.results } resultToSave={ this.state.resultToSave } />
                </ div>

                <div className='row text-center'>
                    <Saved saved={ this.state.saved } deleteArticle={ this.deleteArticle } />
                </ div>

                <div className='container text-center footer'>
                    <br />
                    <br />
                    <br />
                    <a href="https://thompsonjonm.github.io/"> Created by Jonathan Thompson </ a>
                </ div>
            </ div>
        );
    }
}