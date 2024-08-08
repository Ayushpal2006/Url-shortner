import React from 'react';
import UrlShortener from './components/UrlShortener';
import './App.css';

const App = () => {
    return (
        <div className="app">
            <h1>URL Shortener</h1>
            <UrlShortener />
        </div>
    );
};

export default App;
