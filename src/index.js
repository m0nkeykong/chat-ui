import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Components/Login'
import registerServiceWorker from './registerServiceWorker';


// only one component is rendered (Login)
ReactDOM.render(<Login/>
    , document.getElementById('root'));
registerServiceWorker();
