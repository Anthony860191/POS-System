import './App.css';
import React from 'react';
import { MenuBar } from "./MenuBar";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Customer from "./Customer";
import Manager from "./Manager";
import Home from "./Home";


function App() {
  return (
    <>
      <BrowserRouter>
        <MenuBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Customer' element={<Customer />} />
          <Route path='/Manager' element={<Manager />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;