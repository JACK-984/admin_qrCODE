// index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import './index.css'; // Import the global CSS file
import App from './App';


const root = createRoot(document.getElementById('root'));

root.render(<App />);
