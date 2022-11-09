import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

export function MenuBar() {
    return (
        <>
            <Container>
                <Navbar bg="primary" variant="dark">
                    <Container>
                        <Navbar.Brand href="">Spin 'n Stone Pizza</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/">Manager</Nav.Link>
                            <Nav.Link href="/">Server</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </Container>
        </>);
}