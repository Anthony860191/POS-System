import React, { useState } from "react";
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink} from 'react-router-dom';
import { Translator, Translate } from 'react-auto-translate';
import Dropdown from 'react-bootstrap/Dropdown';
import "./MenuBar.css";


const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

/**
 * @author Oliver Carver
 * Navigation and options bar for the website
 * @param {useState} setMode - useState to set the theme mode for the website
 * @param {useState} setLang - useState to set the language for the website 
 * @returns Menu bar for the website
 */

export function MenuBar({ setLang, setMode }) {
    //Here we have a separate state for menu langauge, since passing in lang from app
    //makes it to where the language from other components do not update on state change
    const [menuLang, setMenuLang] = useState();
    const [menuMode, setMenuMode] = useState('light');

    const handleSelect = eventKey => {
        setLang(eventKey);
        setMenuLang(eventKey);
    }
    const toggleTheme = () => {
        if (menuMode == 'light') {
            setMenuMode('dark');
            setMode('dark');
        } else {
            setMenuMode('light');
            setMode('light');
        }
    }
    return (
        <>
            <Translator
                from='en'
                to={menuLang}
                googleApiKey={apiKey}
            >
                <div className = "contained">
                {/* 
                    <Navbar bg={menuMode} variant={menuMode}>
                        <Container>
                            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                        </Container>
                    </Navbar>
                </Container>
                <Container className={menuMode}>
                */}
                    <Nav variant="pills">
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/" href="Home"><Translate>Home</Translate></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/Order" href="/Order"><Translate>Order</Translate></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/Server" href="Server"><Translate>Server</Translate></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/Manager" href="Manager"><Translate>Manager</Translate></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/SalesDashboard" href="SalesDashboard"><Translate>Sales Dashboard</Translate></Nav.Link>
                        </Nav.Item>
                        <Dropdown onSelect={handleSelect}>
                            <Dropdown.Toggle>
                                <Translate>Language</Translate>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="en">English</Dropdown.Item>
                                <Dropdown.Item eventKey="es">Español</Dropdown.Item>
                                <Dropdown.Item eventKey="fr">Français</Dropdown.Item>
                                <Dropdown.Item eventKey="ja">日本語</Dropdown.Item>
                                <Dropdown.Item eventKey="zh-CN">中文简体</Dropdown.Item>
                                <Dropdown.Item eventKey="zh-TW">中文繁體</Dropdown.Item>
                                <Dropdown.Item eventKey="ar">عربي</Dropdown.Item>
                                <Dropdown.Item eventKey="hi">हिन्दी</Dropdown.Item>
                                <Dropdown.Item eventKey="vi">Tiếng Việt</Dropdown.Item>
                                <Dropdown.Item eventKey="tl">Filipino</Dropdown.Item>
                                <Dropdown.Item eventKey="ko">한국어</Dropdown.Item>
                                <Dropdown.Item eventKey="de">Deutsch</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button onClick = {toggleTheme}><Translate>{menuMode === "light" ? "Dark Mode" : "Light Mode"}</Translate></Button>
                    </Nav>
                </div>
            </Translator>
        </>
    );
}