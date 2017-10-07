// Dependencies
import React from 'react';

export default class Query extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let newState = {};

        newState[event.target.id] = event.target.value;
        this.setState(newState);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('Current search term: ' + this.state.term);

        this.props.setTerm(this.state.term);
        this.setState({ term: '' });
    }

    render() {
        return (
            <div className='panel panel-primary'>
                <div className='panel-heading'>
                    <h3 className='panel-title'> Search </ h3>
                </ div>

                <div className='panel-body'>
                    <form onSubmit={this.handleSubmit}>
                        <div className='row'>
                            <div className='col-10 form-group'>
                                <input type='text' className='form-control' id='term' value={this.state.term} onChange={this.handleChange} required />
                            </ div>
                            <br />
                            <div className='col-2'>
                                <button type='submit' className='btn btn-primary'> Search </ button>
                            </ div>
                        </ div>
                    </ form>
                </ div>
            </ div>
        );
    }
}