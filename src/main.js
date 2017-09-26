import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// Port index.html container "main" to the DOM
ReactDOM.render(
    <App />, 
    document.getElementById('main')
);

registerServiceWorker();
