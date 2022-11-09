import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Customer from "./Customer";
import Manager from "./Manager";
import { Routes, Route, Link } from 'react-router-dom';


export function MenuBar() {
    return (
        <>
            <Container>
                <Navbar>
                    <Container>
                        <Navbar.Brand href="">Spin 'n Stone Pizza</Navbar.Brand>
                        <Nav className="me-auto">
                        <Nav.Item eventKey={2} href="/">
                                <Nav.Link as={Link} to="/" >Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item eventKey={2} href="/Customer">
                                <Nav.Link as={Link} to="/Customer" >Customer</Nav.Link>
                            </Nav.Item>
                            <Nav.Item eventKey={3} href="/Manager">
                                <Nav.Link as={Link} to="/Manager" >Manager</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Container>
                </Navbar>
            </Container>
            <Routes>
                <Route exact path='/' />
                <Route exact path='/Customer' element={<Customer />} />
                <Route exact path='/Manager' element={<Manager />} />
                <Route render={function () {
                    return <p>Not found</p>
                }} />
            </Routes>
        </>);
}