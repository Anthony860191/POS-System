import {useState} from "react";
import "./Tabs.css";
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
import AddForm from "./addForm";
import RemoveForm from "./removeForm"
import Menu from "./Menu";

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
                    <h2>Vegetables</h2>
                    <hr/>
                  <VegetableManager></VegetableManager>
                    <div id="addRemovePanel">
                        <h2>Add Ingredient</h2>
                        <hr/>
                        <AddForm></AddForm>
                        <h2>Remove Ingredient</h2>
                        <hr/>
                        <RemoveForm></RemoveForm>
                    </div>
                </div>

                <div
                    className={toggleState === 2 ? "content  active-content" : "content"}
                >
                    <h2>MEAT</h2>
                    <hr/>
                   <MeatManager></MeatManager>
                    <div id="addRemovePanel">
                        <h2>Add Ingredient</h2>
                        <hr/>
                        <AddForm></AddForm>
                        <h2>Remove Ingredient</h2>
                        <hr/>
                        <RemoveForm></RemoveForm>
                    </div>
                </div>

                <div
                    className={toggleState === 3 ? "content  active-content" : "content"}
                >
                    <h2>SAUCE</h2>
                    <hr/>
                    <SauceManager></SauceManager>
                    <div id="addRemovePanel">
                        <h2>Add Ingredient</h2>
                        <hr/>
                        <AddForm></AddForm>
                        <h2>Remove Ingredient</h2>
                        <hr/>
                        <RemoveForm></RemoveForm>
                    </div>
                </div>

                <div
                    className={toggleState === 4 ? "content  active-content" : "content"}
                >
                    <h2>DRIZZLE</h2>
                    <hr/>
                    <DrizzleManager></DrizzleManager>
                    <div id="addRemovePanel">
                        <h2>Add Ingredient</h2>
                        <hr/>
                        <AddForm></AddForm>
                        <h2>Remove Ingredient</h2>
                        <hr/>
                        <RemoveForm></RemoveForm>
                    </div>
                </div>

                <div
                    className={toggleState === 5 ? "content  active-content" : "content"}
                >
                    <h2>CHEESE</h2>
                    <hr/>
                    <CheeseManager></CheeseManager>
                    <div id="addRemovePanel">
                        <h2>Add Ingredient</h2>
                        <hr/>
                        <AddForm></AddForm>
                        <h2>Remove Ingredient</h2>
                        <hr/>
                        <RemoveForm></RemoveForm>
                    </div>
                </div>


                <div
                    className={toggleState === 6 ? "content  active-content" : "content"}
                >
                    <h2>CRUST</h2>
                    <hr/>
                    <CrustManager></CrustManager>
                    <div id="addRemovePanel">
                        <h2>Add Ingredient</h2>
                        <hr/>
                        <AddForm></AddForm>
                        <h2>Remove Ingredient</h2>
                        <hr/>
                        <RemoveForm></RemoveForm>
                    </div>
                </div>
                <div
                    className={toggleState === 7 ? "content  active-content" : "content"}
                >
                    <h2>CRUST</h2>
                    <hr/>
                    <MenuManager></MenuManager>
                </div>
            </div>
            <Button variant="contained" id="Order" onClick={() => setButtonPopup(true)}>Order</Button>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <h3>Finalize Changes</h3>
                <h3>Display the changes made to inventory here</h3>
            </Popup>
        </div>
    );
}

export default ManagerTabs;