import React from 'react';
import ReactDOM from 'react-dom/client';
import Draggable from 'react-draggable';
import App from './App';

const root = document.createElement("div")
root.className = "container"
document.body.appendChild(root)
const rootDiv = ReactDOM.createRoot(root);
rootDiv.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
