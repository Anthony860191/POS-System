import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Translator, Translate } from 'react-auto-translate';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

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

    const handleSubmit = event => {
        event.preventDefault();
    }

    return (
        <Translator
            from='en'
            to={lang}
            googleApiKey={apiKey}
        >
            <div className="Login">
                <center>
                    <h1><Translate>Login</Translate></h1>
                    <Container className="bg-white border-0">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group as={Row} className="mb-3" controlId="formBasicUsername">
                                <Form.Label><Translate>Username</Translate></Form.Label>
                                <Form.Control type="username" placeholder="Enter Username" />
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                                <Form.Label><Translate>Password</Translate></Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button type="submit" variant="primary"><Translate>Submit</Translate></Button>
                            <Container className="bg-white border-0">
                                <GoogleLogin
                                    clientId={clientId}
                                    onSuccess={onSuccess}
                                    onFailure={onFailure}
                                    cookiePolicy={'single_host_origin'}
                                //For testing comment out isSignedIn
                                isSignedIn={true}
                                >
                                    <Translate>Sign in with Google</Translate>
                                </GoogleLogin>
                            </Container>
                        </Form>
                    </Container>
                </center>
            </div>
        </Translator>
    );
}