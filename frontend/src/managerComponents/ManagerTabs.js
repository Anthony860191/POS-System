import { useState } from "react";
import "./ManagerTabs.css";
import Popup from '../components/Popup';
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import VegetableManager from "../VegetableManager";
import MeatManager from "../MeatManager";
import SauceManager from "../SauceManager";
import DrizzleManager from "../DrizzleManager";
import CheeseManager from "../CheeseManager";
import CrustManager from "../CrustManager";
import MenuManager from "./Menu"
import AddIngrForm from "./AddForm";
import AddMenuForm from "./AddMenu";
import RemoveMenuForm from "./removeForm";

import { Translator, Translate } from 'react-auto-translate';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;


function ManagerTabs({ lang, mode}) {
    const dark = mode;
    const [toggleState, setToggleState] = useState(1);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [name, setName] = useState("");

    const toggleTab = (index) => {
        setToggleState(index);
    };

    return (
        <Translator
            from='en'
            to={lang}
            googleApiKey={apiKey}
        >
            <div className={dark === 'dark' ? "container-dark" : "container"}>
                <div className="bloc-tabs">
                    <button
                        className={toggleState === 1 ? (dark === 'dark' ? "tabs active-tabs-dark" : "tabs active-tabs") : "tabs"} 
                        id = {dark === 'dark' ? "darkButton" : ""}
                        onClick={() => toggleTab(1)}
                    >
                        <Translate>Vegetables</Translate>
                    </button>
                    <button
                        className={toggleState === 2 ? (dark === 'dark' ? "tabs active-tabs-dark" : "tabs active-tabs") : "tabs"} 
                        id = {dark === 'dark' ? "darkButton" : ""}
                        onClick={() => toggleTab(2)}
                    >
                        <Translate>Meats</Translate>
                    </button>
                    <button
                        className={toggleState === 3 ? (dark === 'dark' ? "tabs active-tabs-dark" : "tabs active-tabs") : "tabs"} 
                        id = {dark === 'dark' ? "darkButton" : ""}
                        onClick={() => toggleTab(3)}
                    >
                        <Translate>Sauces</Translate>
                    </button>
                    <button
                        className={toggleState === 4 ? (dark === 'dark' ? "tabs active-tabs-dark" : "tabs active-tabs") : "tabs"} 
                        id = {dark === 'dark' ? "darkButton" : ""}
                        onClick={() => toggleTab(4)}
                    >
                        <Translate>Drizzles</Translate>
                    </button>
                    <button
                        className={toggleState === 5 ? (dark === 'dark' ? "tabs active-tabs-dark" : "tabs active-tabs") : "tabs"} 
                        id = {dark === 'dark' ? "darkButton" : ""}
                        onClick={() => toggleTab(5)}
                    >
                        <Translate>Cheeses</Translate>
                    </button>
                    <button
                        className={toggleState === 6 ? (dark === 'dark' ? "tabs active-tabs-dark" : "tabs active-tabs") : "tabs"} 
                        id = {dark === 'dark' ? "darkButton" : ""}
                        onClick={() => toggleTab(6)}
                    >
                        <Translate>Crusts</Translate>
                    </button>
                    <button
                        className={toggleState === 7 ? (dark === 'dark' ? "tabs active-tabs-dark" : "tabs active-tabs") : "tabs"} 
                        id = {dark === 'dark' ? "darkButton" : ""}
                        onClick={() => toggleTab(7)}
                    >
                        <Translate>Menu</Translate>
                    </button>
                </div>

                <div className="content-tabs">
                    <div
                        className={toggleState === 1 ? (dark === 'dark' ? "content  active-content-dark" : "content active-content") : "content"}
                    >
                        <table>
                            <tr>
                                <td>
                                    <VegetableManager lang={lang}></VegetableManager>
                                </td>
                                <td>
                                    <AddIngrForm lang={lang}></AddIngrForm>
                                </td>
                            </tr>
                        </table>

                    </div>

                    <div
                        className={toggleState === 2 ? (dark === 'dark' ? "content  active-content-dark" : "content active-content") : "content"}
                    >

                        <table>
                            <tr>
                                <td>
                                    <MeatManager lang={lang}></MeatManager>
                                </td>
                                <td>
                                    <AddIngrForm lang={lang}></AddIngrForm>
                                </td>
                            </tr>
                        </table>

                    </div>

                    <div
                        className={toggleState === 3 ? (dark === 'dark' ? "content  active-content-dark" : "content active-content") : "content"}
                    >

                        <table>
                            <tr>
                                <td>
                                    <SauceManager lang={lang}></SauceManager>
                                </td>
                                <td>
                                    <AddIngrForm lang={lang}></AddIngrForm>
                                </td>
                            </tr>
                        </table>

                    </div>

                    <div
                        className={toggleState === 4 ? (dark === 'dark' ? "content  active-content-dark" : "content active-content") : "content"}
                    >

                        <table>
                            <tr>
                                <td>
                                    <DrizzleManager lang={lang}></DrizzleManager>
                                </td>
                                <td>
                                    <AddIngrForm lang={lang}></AddIngrForm>
                                </td>
                            </tr>
                        </table>

                    </div>

                    <div
                        className={toggleState === 5 ? (dark === 'dark' ? "content  active-content-dark" : "content active-content") : "content"}
                    >

                        <table>
                            <tr>
                                <td>
                                    <CheeseManager lang={lang}></CheeseManager>
                                </td>
                                <td>
                                    <AddIngrForm lang={lang}></AddIngrForm>
                                </td>
                            </tr>
                        </table>

                    </div>


                    <div
                        className={toggleState === 6 ? (dark === 'dark' ? "content  active-content-dark" : "content active-content") : "content"}
                    >

                        <table>
                            <tr>
                                <td>
                                    <CrustManager lang={lang}></CrustManager>
                                </td>
                                <td>
                                    <AddIngrForm lang={lang}></AddIngrForm>
                                </td>
                            </tr>
                        </table>

                    </div>
                    <div
                        className={toggleState === 7 ? (dark === 'dark' ? "content  active-content-dark" : "content active-content") : "content"}
                    >
                        <h2><Translate>Menu</Translate></h2>
                        <hr />
                        <MenuManager lang={lang}></MenuManager>
                        <br></br>
                        <h2><Translate lang={lang}>Add Menu Item</Translate></h2>
                        <hr />
                        <AddMenuForm lang={lang} mode = {mode}></AddMenuForm>
                        <hr />
                        <h2><Translate lang={lang}>Remove Menu Item</Translate></h2>
                        <RemoveMenuForm lang={lang} mode = {mode}></RemoveMenuForm>
                    </div>
                </div>
            </div>
        </Translator>
    );
}

export default ManagerTabs;