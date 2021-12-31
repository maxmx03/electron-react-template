import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const { greeting, themeMode } = window.myAPI;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{greeting}</p>
        <p>
          <button type="button" onClick={() => setCount(count + 1)}>
            count is: {count}
          </button>
          <button type="button" onClick={() => themeMode()}>
            Toggle Dark Mode
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://www.electronjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Electron
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://webpack.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Webpack Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
