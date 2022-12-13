import './App.css';
import React, { useState } from 'react';
import { MenuBar } from "./MenuBar";
import { Routes, Route, HashRouter } from 'react-router-dom';
import Customer from "./Customer";
import Server from "./Server";
import Manager from "./Manager";
import Home from "./Home";
import SalesDashboard from './components/SalesDashboard';
import { Translator } from 'react-auto-translate';
import Login from './Login';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

/**
 * @author Oliver Carver
 * App function for the website
 * @returns Entire routed website
 */

function App() {
  // Use states to keep track of language and them
  const [lang, setLang] = useState();
  const [mode, setMode] = useState('light');
  const [token, setToken] = useState('false');

  return (
    <Translator
      from='en'
      to={lang}
      googleApiKey={apiKey}
    >
      <div id={mode === "dark" ? "darkBackground" : ""}>
        <HashRouter>
          <MenuBar setLang={setLang} setMode={setMode} />
          <Routes>
            <Route path='/' element={<Home lang={lang} mode={mode} />} />
            <Route path='/Order' element={<Customer lang={lang} mode={mode} />} />
            <Route path='/Server' element={<Server lang={lang} mode={mode} />} />
            <Route path='/Manager' element={token === 'true' ? <Manager lang={lang} mode={mode} setToken={setToken} /> : <Login lang={lang} mode={mode} setToken={setToken} />} />
            <Route path='/SalesDashboard' element={token === 'true' ? <SalesDashboard lang={lang} setToken={setToken} theme={mode}/>  : <div><Login lang={lang} mode={mode} setToken={setToken} theme={mode} />  </div>} />
          </Routes>
        </HashRouter>
      </div>
    </Translator>
  );
}

export default App;