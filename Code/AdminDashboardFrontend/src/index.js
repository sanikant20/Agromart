import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Import bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'jquery/dist/jquery.min.js'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
