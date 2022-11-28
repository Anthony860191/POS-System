import React, { useState } from 'react';
import DailySalesTotal from './components/DailySalesTotal';
import Tabs from './managerComponents/ManagerTabs';
import Login from './Login';

const Manager = () => {

  const [token, setToken] = useState();

  if (!token) {
    return (
      <>
        <Login setToken={setToken} />
      </>
    );
  }

  return (
    <div className="Manager">
      <center>
        <Tabs />
      </center>
      <center>
        <DailySalesTotal></DailySalesTotal>
      </center>
    </div>
  );
}

export default Manager;