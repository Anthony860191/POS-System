import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { Translator, Translate } from 'react-auto-translate';
import 'bootstrap/dist/css/bootstrap.min.css';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

/**
 * @author Oliver Carver
 * Login function that handles login functionality
 * @param {string} lang - The language the web page needs to be using 
 * @param {useState} setToken - useState to set login token
 * @returns Login button
 */

export default function Login({ lang, setToken }) {
    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });

    const onSuccess = (res) => {
        console.log('success:', res);
        setToken(res);
    };
    const onFailure = (err) => {
        console.log('failed:', err);
    };

    return (
        <Translator
            from='en'
            to={lang}
            googleApiKey={apiKey}
        >
            <div className="Login">
                <center>
                    <h1><Translate>Login</Translate></h1>
                    <GoogleLogin
                        clientId={clientId}
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        //For testing comment out isSignedIn
                        isSignedIn={true}
                    >
                        <Translate>Login with your company provided Gmail account</Translate>
                    </GoogleLogin>
                </center>
            </div>
        </Translator >
    );
}