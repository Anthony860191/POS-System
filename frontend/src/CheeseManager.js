import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Translator, Translate } from 'react-auto-translate';

import { useNavigate } from 'react-router-dom';
import { wait } from "@testing-library/user-event/dist/utils";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

function CheeseManager({ lang }) {
    const [DataisLoaded, setData] = useState();
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/ingredients/?ingr_type=CHEESE")
            .then(res => {
                setItems(res.data);
                for (var i = 0; i < items.length; i++) {
                    var changedIngr = "changed";
                    items.members.viewers[changedIngr] = false;
                }
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
                <h1><Translate>Please wait some time....</Translate></h1>
            </div>
        </Translator>);

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
                    url: 'http://localhost:8000/ingredients/' + item.ingredient_name + '/',
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
        //  <div className="content-tabs">
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
        // </div>
    );
}

export default CheeseManager;