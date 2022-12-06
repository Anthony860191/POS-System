import React, { useState } from 'react';
import { GoogleLogout } from 'react-google-login';
import { Translator, Translate } from 'react-auto-translate';
import DailySalesTotal from './components/DailySalesTotal';
import Tabs from './managerComponents/ManagerTabs';
import Login from './Login';
import SalesDashboard from './components/SalesDashboard';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Manager = ({ lang }) => {

  const [token, setToken] = useState();

  if (!token) {
    return (
      <>
        <Login lang={lang} setToken={setToken} />
      </>
    );
  }

  function logout() {
    window.location.reload();
  }

  return (
    <>
      <Translator
        from='en'
        to={lang}
        googleApiKey={apiKey}
      >
        <div className="Logout">
          <center>
            <GoogleLogout
              clientId={clientId}
              onLogoutSuccess={logout}
            >
              <Translate>Logout</Translate>
            </GoogleLogout>
          </center>
        </div>
      </Translator >
      <div className="Manager">
        <center>
          <Tabs lang={lang} />
        </center>
        <center>
          <DailySalesTotal></DailySalesTotal>
        </center>
      </div>
    </>
  );
}

export default Manager;