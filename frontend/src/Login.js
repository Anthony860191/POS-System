import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import 'bootstrap/dist/css/bootstrap.min.css';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export default function Login({ setToken }) {
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
        <div className="Login">
            <center>
                <h1>Login</h1>
                <Container className="bg-white border-0">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" placeholder="Enter Username" />
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button type="submit" variant="primary">Submit</Button>
                        <Container className="bg-white border-0">
                        <GoogleLogin
                            clientId={clientId}
                            buttonText="Sign in with Google"
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={'single_host_origin'}
                            //For testing comment out isSignedIn
                            isSignedIn={true}
                        />
                        </Container>
                    </Form>
                </Container>
            </center>
        </div>
    );
}