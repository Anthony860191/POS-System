import './App.css';
import React from 'react';
import { MenuBar } from "./MenuBar";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Customer from "./Customer";
import Manager from "./Manager";
import Home from "./Home";
import SalesDashboard from './components/SalesDashboard';


function App() {
  return (
    <>
      <BrowserRouter>
        <MenuBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Customer' element={<Customer />} />
          <Route path='/Manager' element={<Manager />} />
          <Route path='/Sales Dashboard' element={<SalesDashboard/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;