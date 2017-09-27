'use strict'

// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

// For testing:
// import App from './Components/App';
// import Search from './Components/Search';
// import Results from './Components/Results';
// import Query from './Components/Query';
// import Saved from './Components/Saved';

import registerServiceWorker from './registerServiceWorker';

// Port index.html container "main" to the DOM
// ReactDOM.render(
//     <App />, 
//     document.getElementById('main')
// );

ReactDOM.render(
    <Search />,
    document.getElementById('main-container')
);

registerServiceWorker();
