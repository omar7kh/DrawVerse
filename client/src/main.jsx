import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { UserContextProvider } from './context/UserContext';
import { SocketContextProvider } from './context/SocketContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <SocketContextProvider>
      <App />
    </SocketContextProvider>
  </UserContextProvider>
);
