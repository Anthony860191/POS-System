import React from 'react';
import Button from 'react-bootstrap/Button';
import { Translator, Translate } from 'react-auto-translate';
import { googleLogout } from '@react-oauth/google';

import Tabs from './managerComponents/ManagerTabs';


const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

/**
 * @author Oliver Carver
 * @author Joshua Hillis
 * Manager page containing manager tabs
 * @param {string} lang - The language the web page needs to be using 
 * @param {string} mode - The theme mode for CSS styling
 * @returns Manager page
 */

const Manager = ({ lang, mode, setToken }) => {
  const logout = () => {
    setToken('false');
    googleLogout();
  }

  return (
    <div className="Manager">
      <Translator
        from='en'
        to={lang}
        googleApiKey={apiKey}
      >
        <div className="Logout" class="g_id_signout">
          <center>
          <Button class="g_id_signout" onClick = {logout}><Translate>Logout</Translate></Button>
          </center>
        </div>
      </Translator >
      <center>
        <Tabs lang={lang} mode={mode}/>
      </center>

    </div>
  )
}

export default Manager;