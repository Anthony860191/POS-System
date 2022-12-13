import React from 'react';
import { Translator, Translate } from 'react-auto-translate';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import "./Login.css"

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

/**
 * @author Oliver Carver
 * Login function that handles login functionality
 * @param {string} lang - The language the web page needs to be using 
 * @param {useState} setToken - useState to set login token
 * @returns Login button
 */

export default function Login({ lang, setToken, mode }) {
    const onSuccess = (res) => {
        console.log('success:', res);
        setToken('true');
        localStorage.setItem('token', 'true');
    };
    const onFailure = (err) => {
        console.log('failed:', err);
    };
    const dark = mode;
    return (
        <GoogleOAuthProvider clientId={clientId}>
            <Translator
                from='en'
                to={lang}
                googleApiKey={apiKey}
            >
                <div className={dark === 'dark' ? "Login-dark" : "Login-light"}>
                    <center>
                        <h1><Translate>Login</Translate></h1>
                        <GoogleLogin
                            type="standard"
                            size="large"
                            onSuccess={onSuccess}
                            onError={onFailure}
                            locale={lang}
                            theme={mode === "light" ? "filled_blue" : "filled_black"}
                            auto_select= "false"
                        />
                    </center>
                </div>
            </Translator >
        </GoogleOAuthProvider >
    );
}