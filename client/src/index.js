import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

let rootElement = document.createElement("div");
document.body.appendChild(rootElement);

ReactDOM.render(
  <App />,
  rootElement
);

