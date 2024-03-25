import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from "react-redux"; 
import { Teht34 } from './teht34'
import { Teht37, store } from './teht37';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>

    <Teht37 />
    </Provider>
    <Teht34/>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
