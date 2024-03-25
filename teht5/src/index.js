import React from 'react';
import ReactDOM from 'react-dom';
import { Spa } from './teht27-32';
import { Teht33 } from './teht33';
import {BrowserRouter as Router} from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Spa/>
    </Router>

    <Teht33/>

    </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
