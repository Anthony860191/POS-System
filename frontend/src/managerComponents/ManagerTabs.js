import {useState} from "react";
import "./ManagerTabs.css";
import Popup from '../components/Popup';
import {TextField} from "@mui/material";
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


function ManagerTabs() {
    const [toggleState, setToggleState] = useState(1);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [name, setName] = useState("");

    const toggleTab = (index) => {
        setToggleState(index);
    };

    return (
        <div className="container">
            <div className="bloc-tabs">
                <button
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(1)}
                >
                    Vegetables
                </button>
                <button
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(2)}
                >
                    Meats
                </button>
                <button
                    className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(3)}
                >
                    Sauces
                </button>
                <button
                    className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(4)}
                >
                    Drizzles
                </button>
                <button
                    className={toggleState === 5 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(5)}
                >
                    Cheeses
                </button>
                <button
                    className={toggleState === 6 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(6)}
                >
                    Crusts
                </button>
                <button
                    className={toggleState === 7 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(7)}
                >
                    Menu
                </button>
            </div>

            <div className="content-tabs">
                <div
                    className={toggleState === 1 ? "content  active-content" : "content"}
                >

                    <table>
                        <tr>
                            <td>
                                <VegetableManager></VegetableManager>
                            </td>
                            <td>
                                <AddIngrForm></AddIngrForm>
                            </td>
                        </tr>
                    </table>

                </div>

                <div
                    className={toggleState === 2 ? "content  active-content" : "content"}
                >

                    <table>
                        <tr>
                            <td>
                                <MeatManager></MeatManager>
                            </td>
                            <td>
                                <AddIngrForm></AddIngrForm>
                            </td>
                        </tr>
                    </table>

                </div>

                <div
                    className={toggleState === 3 ? "content  active-content" : "content"}
                >

                    <table>
                        <tr>
                            <td>
                                <SauceManager></SauceManager>
                            </td>
                            <td>
                                <AddIngrForm></AddIngrForm>
                            </td>
                        </tr>
                    </table>

                </div>

                <div
                    className={toggleState === 4 ? "content  active-content" : "content"}
                >

                    <table>
                        <tr>
                            <td>
                                <DrizzleManager></DrizzleManager>
                            </td>
                            <td>
                                <AddIngrForm></AddIngrForm>
                            </td>
                        </tr>
                    </table>

                </div>

                <div
                    className={toggleState === 5 ? "content  active-content" : "content"}
                >

                    <table>
                        <tr>
                            <td>
                                <CheeseManager></CheeseManager>
                            </td>
                            <td>
                                <AddIngrForm></AddIngrForm>
                            </td>
                        </tr>
                    </table>

                </div>


                <div
                    className={toggleState === 6 ? "content  active-content" : "content"}
                >

                    <table>
                        <tr>
                            <td>
                                <CrustManager></CrustManager>
                            </td>
                            <td>
                                <AddIngrForm></AddIngrForm>
                            </td>
                        </tr>
                    </table>

                </div>
                <div
                    className={toggleState === 7 ? "content  active-content" : "content"}
                >
                    <h2>Menu</h2>
                    <hr/>
                    <MenuManager></MenuManager>
                    <br></br>
                    <h2>Add Menu Item</h2>
                    <hr/>
                    <AddMenuForm></AddMenuForm>
                </div>
            </div>
        </div>
    );
}

export default ManagerTabs;