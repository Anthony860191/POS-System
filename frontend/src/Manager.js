import React, { useState } from 'react';
import Tabs from './managerComponents/ManagerTabs';
import Login from './Login';
import SalesDashboard from './components/SalesDashboard';

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
    </div>
  );
}

export default Manager;