// Dependencies
import React from 'react';
import Query from './Query';
import Results from './Results';

export default class Search extends React.Component {

    render() {
        return (
            <div className='col-12'>
                <div className='row'>
                    <div className='col-12'>
                        <Query setTerm={this.props.setTerm} />
                    </ div>
                </ div>

                <div className='row'>
                    <div className='col-12'>
                        <Results results={this.props.results} setArticleToSave={this.props.setArticleToSave} resultToSave={this.props.resultToSave} />
                    </ div>
                </ div>
            </ div>
        );
    }
}