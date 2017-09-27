// Dependencies
import React from 'react';
import Router from 'react-router';
import Query from '';
import Results from '';
import helpers from '../utilities/helpers';

const Search = ({
    getInitialState: () => {
        return {
            queryTerm: '',
            startYear: '',
            endYear: '',
            results: {}
        }
    },

    componentDidUpdate: (prevProps, prevState) => {
        if(this.state.queryTerm != '' && (prevState.queryTerm != this.state.queryTerm || prevState.startYear != this.state.startYear || prevState.endYear != this.state.endYear))
        {
            helpers.runQuery(this.state.queryTerm, this.state.startYear, this.state.endYear)

            .then((data) => {
                if (data != this.state.results) {
                    this.setState({
                        results: data
                    })
                }
            }).bind(this)
        }
    },

    setQuery: (newQuery, newStart, newEnd) => {
        this.setState({
            queryTerm: newQuery,
            startYear: newStart,
            endYear: newEnd
        })
    },

    render() {
        <div className='main-container'>
            
            <Query updateSearch={this.setQuery} /> 

            <Results results={this.state.results} />
        
        </ div>
    }
});

export default Search;