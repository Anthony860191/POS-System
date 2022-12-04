import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';


export function MenuBar() {
    return (
        <>
            <Container className="bg-white border-0">
                <Nav variant="pills">
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/" href="/Home">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/Customer" href="/Customer">Customer</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/Manager" href="Manager">Manager</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={NavLink} to="/Sales Dashboard" href="Sales Dashboard">Sales Dashboard</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </>
    );
}