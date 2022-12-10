import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Translator, Translate } from 'react-auto-translate';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

/**
 * @author Joshua Hillis
 * Creates a table that allows the user to set inventory amount and add items to the cheese category.
 * @constructor
 * @param {string} lang - The language for the text to be in.
 * @param {string} mode - The toggle for dark / light mode.
 */
function CheeseManager({ lang, mode }) {
    const [DataisLoaded, setData] = useState();
    const [items, setItems] = useState([]);
    const url = process.env.REACT_APP_API_ROOT;

    // Pull all the ingredients from the cheese category
    useEffect(() => {
        const controller = new AbortController();
        axios.get(`${url}ingredients/?ingr_type=CHEESE`,{signal:controller.signal})
            .then(res => {
                setItems(res.data);
                for (var i = 0; i < items.length; i++) {
                    var changedIngr = "changed";
                    items.members.viewers[changedIngr] = false;
                }
                setData(true);
            });
            return () => {
                controller.abort();
              };
            
    }, []);

    // Check if data is loaded
    if (!DataisLoaded) return (
        <Translator
            from='en'
            to={lang}
            googleApiKey={apiKey}
        >
            <div>
                <h1><Translate>Please wait some time....</Translate></h1>
            </div>
        </Translator>);

    // POST changes if the ingredient has been altered
    const AlterIngredients = async () => {
        for (let i = 0; i < items.length; i++) {

            const item = items.at(i);
            if (item.changed === true) {
                console.log(item);
                let formField = new FormData();
                formField.append('ingredient_name', item.ingredient_name);
                formField.append('quantity', item.quantity);
                formField.append('units', item.units);
                formField.append('ingr_type', item.ingr_type);
                formField.append('usage_value', item.usage_value);

                await axios({
                    method: 'put',
                    url: `${url}ingredients/${item.ingredient_name}/`,
                    data: formField
                }).then((response) => {
                    if (response.status === 200) {
                        console.log(response);
                    } else {
                        alert("Bad Request!");
                        console.log(response);
                    }
                })
            }
        }
        window.confirm("Order Submitted!");
    }

    const reverseChanges = (e) => {
        e.preventDefault();
        window.location.reload(false);
    }

    return (
        <Translator
            from='en'
            to={lang}
            googleApiKey={apiKey}
        >
            <table>
                <tr>
                    <th><Translate>Name</Translate></th>

                    <th><Translate>Alter Amount (lbs)</Translate></th>
                </tr>
                {
                    items.map((item, index) => (
                        <tr>
                            <td><Translate>{item.ingredient_name}</Translate></td>
                            <input
                                type="number"
                                className="form-control form-control-lg"
                                id={item.ingredient_name}
                                defaultValue={item.quantity}
                                placeholder={item.quantity}
                                name="alterInventoryAmt"
                                onChange={(e) => {
                                    items.at(index).quantity = e.target.value;
                                    items.at(index).changed = true
                                }}
                            />
                        </tr>
                    ))
                }
                <tr>
                    <td colSpan={2}>
                        <button id="changeBtn" onClick={AlterIngredients} className="btn btn-primary btn-block"><Translate>Alter Inventory Amount</Translate>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <button id="revChangeBtn" onClick={reverseChanges} className="btn btn-primary btn-block">
                            <Translate>Reverse Changes</Translate>
                        </button>
                    </td>
                </tr>

            </table>
        </Translator>
    );
}

export default CheeseManager;