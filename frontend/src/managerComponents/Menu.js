import axios from 'axios';
import React, { useEffect, useState, Fragment } from "react";
import { Translator, Translate } from 'react-auto-translate';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

/**
 * @author Joshua Hillis
 * Creates a table that displays all the current menu items and their relevant parameters.
 * @constructor
 * @param {string} lang - The language for the text to be in.
 * @param {string} mode - The toggle for dark / light mode.
 */
function MenuManager({ lang, mode }) {
    // ComponentDidMount is used to
    // execute the code
    const [DataisLoaded, setData] = useState();
    const [items, setItems] = useState([]);

    // Pull the menu items from the database to display
    useEffect(() => {
        axios.get("http://localhost:8000/menu/")
            .then(res => {
                setItems(res.data);
                setData(true);
            })
    }, []);



    if (!DataisLoaded) return (
        <Translator
            from='en'
            to={lang}
            googleApiKey={apiKey}
        >
            <div>
                <h1> <Translate>Please wait some time....</Translate> </h1>
            </div>
        </Translator>);

    return (
        <Translator
            from='en'
            to={lang}
            googleApiKey={apiKey}
        >
            <div className="content-tabs">
                <table>
                    <thead>
                        <tr>
                            <th><Translate>Item Name</Translate></th>
                            <th><Translate>Item Type</Translate></th>
                            <th><Translate>Price</Translate></th>
                            <th><Translate>Toppings</Translate></th>
                            <th><Translate>Sauce</Translate></th>
                            <th><Translate>Drizzle</Translate></th>
                            <th><Translate>Cheese</Translate></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr>
                                <td><Translate>{item.menu_item}</Translate></td>
                                <td><Translate>{item.item_type}</Translate> </td>
                                <td><Translate>{item.price}</Translate> </td>
                                <td>
                                    <select id="menuSelect">
                                        <option value={item.topping1}><Translate>{item.topping1}</Translate></option>
                                        <option value={item.topping2}><Translate>{item.topping2}</Translate></option>
                                        <option value={item.topping3}><Translate>{item.topping3}</Translate></option>
                                        <option value={item.topping4}><Translate>{item.topping4}</Translate></option>
                                    </select>
                                </td>
                                <td><Translate>{item.sauce}</Translate> </td>
                                <td><Translate>{item.drizzle}</Translate> </td>
                                <td><Translate>{item.cheese_type}</Translate> </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </Translator>
    );
}

export default MenuManager;