import './App.css';
import React, { useState } from 'react';
import { MenuBar } from "./MenuBar";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Customer from "./Customer";
import Server from "./Server";
import Manager from "./Manager";
import Home from "./Home";
import { Translator } from 'react-auto-translate';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

function App() {
  const [lang, setLang] = useState();

  return (
    <Translator
      from='en'
      to={lang}
      googleApiKey={apiKey}
    >
      <BrowserRouter>
        <MenuBar setLang={setLang} />
        <Routes>
          <Route path='/' element={<Home lang={lang} />} />
          <Route path='/Order' element={<Customer lang={lang} />} />
          <Route path= '/Server' element = {<Server lang = {lang}/>}/>
          <Route path='/Manager' element={<Manager lang={lang} />} />
        </Routes>
      </BrowserRouter>
    </Translator>
  );
}

export default App;