import React, { useState } from 'react';
import DailySalesTotal from './components/DailySalesTotal';
import Tabs from './managerComponents/ManagerTabs';
import Login from './Login';

const Manager = ({ lang }) => {

  const [token, setToken] = useState();

  if (!token) {
    return (
      <>
        <Login lang={lang} setToken={setToken} />
      </>
    );
  }

  return (
    <div className="Manager">
      <center>
        <Tabs lang={lang} />
      </center>
      <center>
        <DailySalesTotal></DailySalesTotal>
      </center>
    </div>
  );
}

export default Manager;