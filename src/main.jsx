import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Providers
import TWProvider from './providers/ThirdwebProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TWProvider>
      <App />
    </TWProvider>
  </React.StrictMode>
);

