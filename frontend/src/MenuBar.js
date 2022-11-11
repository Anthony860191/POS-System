import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Customer from "./Customer";
import Manager from "./Manager";
import Home from "./Home";
import { Routes, Route, Link } from 'react-router-dom';


export function MenuBar() {
    return (
        <>
            <Container className="bg-white border-0">
                    <Nav variant="pills" defaultActiveKey="/Home">
                        <Nav.Item>
                            <Nav.Link as={Link} to="/" href="/Home">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/Customer" href="/Customer">Customer</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/Manager" href="Manager">Manager</Nav.Link>
                        </Nav.Item>
                    </Nav>
            </Container>
            <Routes>
                <Route exact path='/' element={<Home />}/>
                <Route exact path='/Customer' element={<Customer />} />
                <Route exact path='/Manager' element={<Manager />} />
                <Route render={function () {
                    return <p>Not found</p>
                }} />
            </Routes>
        </>);
}