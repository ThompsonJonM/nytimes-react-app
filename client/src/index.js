// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

// Components
import Main from './components/Main';
import registerServiceWorker from './registerServiceWorker';

// Style
import './stylesheets/index.css';

ReactDOM.render(
    (
        <BrowserRouter>
            <Route exact path='/' component={ Main } />
        </ BrowserRouter>
    ), 
    
    document.getElementById('root'));
    
registerServiceWorker();
