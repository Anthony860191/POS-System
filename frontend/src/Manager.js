import React, { useState } from 'react';
import Tabs from './managerComponents/ManagerTabs';
import Login from './Login';
import SalesDashboard from './components/SalesDashboard';

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
    </div>
  );
}

export default Manager;