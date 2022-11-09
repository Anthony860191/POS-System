import {useState} from "react";
import "./Tabs.css";
import Popup from '../components/Popup';
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

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
            </div>

            <div className="content-tabs">
                <div
                    className={toggleState === 1 ? "content  active-content" : "content"}
                >
                    <h2>VEGETABLES</h2>
                    <hr/>
                    <table>
                        <tr>
                            <th>Ingredient Name</th>

                            <th>Alter Inventory</th>
                        </tr>
                        <tr>
                            <td>Banana Peppers</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Brocolli</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Cauliflower</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Green Peppers</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Jalapenos</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Mushrooms</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Onions</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Pineapple</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Roasted Garlic</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Spinach</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Tomatoes</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                    </table>

                </div>

                <div
                    className={toggleState === 2 ? "content  active-content" : "content"}
                >
                    <h2>MEAT</h2>
                    <hr/>
                    <table>
                        <tr>
                            <th>Ingredient Name</th>

                            <th>Alter Inventory</th>
                        </tr>
                        <tr>
                            <td>Black Forest Ham</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Diced Ham</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Italian Sausage</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Meatball</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Pepperoni</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Salami</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Smoked Chicken</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                    </table>
                </div>

                <div
                    className={toggleState === 3 ? "content  active-content" : "content"}
                >
                    <h2>SAUCE</h2>
                    <hr/>
                   <table>
                        <tr>
                            <th>Ingredient Name</th>

                            <th>Alter Inventory</th>
                        </tr>
                        <tr>
                            <td>Alfredo</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Traditional BBQ</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Zesty Red</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                    </table>
                </div>

                <div
                    className={toggleState === 4 ? "content  active-content" : "content"}
                >
                    <h2>DRIZZLE</h2>
                    <hr/>
                   <table>
                        <tr>
                            <th>Ingredient Name</th>

                            <th>Alter Inventory</th>
                        </tr>
                        <tr>
                            <td>BBQ Sauce</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Olive Oil</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Oregano</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Ranch</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Sriracha</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                    </table>
                </div>

                <div
                    className={toggleState === 5 ? "content  active-content" : "content"}
                >
                    <h2>CHEESE</h2>
                    <hr/>
                    <table>
                                                <tr>
                            <td>House Blend</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Parmesan</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                    </table>
                </div>


                <div
                    className={toggleState === 6 ? "content  active-content" : "content"}
                >
                    <h2>CRUST</h2>
                    <hr/>
                    <table>
                        <tr>
                            <td>Regular</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Parmesan</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                    </table>
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