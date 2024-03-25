import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MyCounter } from './teht43.js';
import {Teht41} from './teht41.js'
import {ListForm} from './teht40.tsx'



ReactDOM.render(
  <React.StrictMode>
    <ListForm/>
    <Teht41/>
   <MyCounter/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
