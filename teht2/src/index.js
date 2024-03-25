import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Cars } from './teht9-10';
import { ListForm } from './teht11-13';
import { Teht14 } from './teht14-16';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Cars/>
    <ListForm/>
    <Teht14/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
