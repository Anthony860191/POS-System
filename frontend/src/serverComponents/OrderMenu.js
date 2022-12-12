import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Translator, Translate } from 'react-auto-translate';
import Button from "@mui/material/Button";
import {json, useNavigate, useParams} from 'react-router-dom';
import {MenuItem, TextField} from "@mui/material";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

/**
 * @author Anthony Mercado
 * @author Joshua Hillis
 * Creates a page that allows for the server to efficiently place orders with less considerations for accessibility.
 * @constructor
 * @param {string} lang - The language for the text to be in.
 */

const OrderMenuForm = ({ lang, mode }) => {
    const url = process.env.REACT_APP_API_ROOT;
    const dark = mode;

    // Obtain a list of all the separate ingredient types
    useEffect(() => {
        const controller = new AbortController();
        const fetchIngredients = async () => {
            const PizzaReponse = await fetch(`${url}menu`,{signal:controller.signal});
            const pizzaData = await PizzaReponse.json();
            const VegResponse = await fetch(`${url}ingredients/?ingr_type=VEGGIES`,{signal:controller.signal});
            const vegData = await VegResponse.json();
            const MeatResponse = await fetch(`${url}ingredients/?ingr_type=MEAT`,{signal:controller.signal});
            const meatData = await MeatResponse.json();
            const SauceResponse = await fetch(`${url}ingredients/?ingr_type=SAUCE`,{signal:controller.signal});
            const sauceData = await SauceResponse.json();
            const DrizzleResponse = await fetch(`${url}ingredients/?ingr_type=DRIZZLE`,{signal:controller.signal});
            const drizzleData = await DrizzleResponse.json();
            const CheeseResponse = await fetch(`${url}ingredients/?ingr_type=CHEESE`,{signal:controller.signal});
            const cheeseData = await CheeseResponse.json();
            const CrustResponse = await fetch(`${url}ingredients/?ingr_type=CRUST`,{signal:controller.signal});
            const crustData = await CrustResponse.json();
            var ingredientData = [...vegData, ...meatData];

            set_pizza_list(pizzaData);
            set_topping_list(ingredientData);
            set_sauce_list(sauceData);
            set_drizzle_list(drizzleData);
            set_cheese_list(cheeseData);
            set_crust_list(crustData);
        };
        fetchIngredients();
        return () =>
        {
            controller.abort();
        }
    }, [])

    let navigate = useNavigate();
    const {id} = useParams();

    const [name, set_name] = useState('');
    const [item_type, set_item_type] = useState('');
    const [pizzaList, set_pizza_list] = useState([]);
    const [topping1, set_topping1] = useState('')
    const [topping2, set_topping2] = useState('')
    const [topping3, set_topping3] = useState('')
    const [topping4, set_topping4] = useState('')
    const [toppingList, set_topping_list] = useState([{'ingredient_name':''}])
    const [sauce, set_sauce] = useState('')
    const [sauceList, set_sauce_list] = useState([{'ingredient_name':''}])
    const [drizzle, set_drizzle] = useState('')
    const [drizzleList, set_drizzle_list] = useState([{'ingredient_name':''}])
    const [cheese_type, set_cheese_type] = useState('')
    const [cheeseList, set_cheese_list] = useState([{'ingredient_name':''}])
    const [default_crust, set_default_crust] = useState('')
    const [crustList, set_crust_list] = useState([{'ingredient_name':''}])

    const basePizzas = [];
    const presetPizzas = [];
    const drinks = [];
    const [drink, set_drink] = useState('');
    const [quantity, set_quantity] = useState(1); // variable to store the amount of pizzas being orderd
    const [allOrders, setAllOrders] = useState([]); // variable to store all of the pizzas
    let [totalPrice, setTotalPrice] = useState(0);

    for (let i = 0; i < pizzaList.length; i++) {
        if (pizzaList[i].item_type === "BASE_PIZZA") {
            basePizzas.push(pizzaList[i]);
        } else if (pizzaList[i].item_type === "PRESET_PIZZA") {
            presetPizzas.push(pizzaList[i]);
        } else if (pizzaList[i].item_type === "DRINK") {
            drinks.push(pizzaList[i]);
        }
    }

    const AddPizza = async() => {
        if (item_type === '' && drink === '') {
            return;
        }
        const controller = new AbortController();
        const responseId = await fetch(`${url}orders/?latest=true`, {signal:controller.signal});
        const resultId = await responseId.json();

        const responsePrice = await fetch(`${url}price?pizzatype=${item_type === '' ? "" : item_type.menu_item}&crusttype=${default_crust}&drinktype=${drink}`, {signal:controller.signal});
        const resultPrice = await responsePrice.json();

        var pizzaOrder = {
            "orderid": 1 + parseInt(resultId[0].id),
            "pizza_type": item_type === '' ? null : item_type.menu_item,
            "cheese_type": cheese_type,
            "crust": default_crust,
            "sauce": sauce,
            "drizzle": drizzle,
            "drink": drink,
            "topping1": topping1 === '' ? null : topping1,
            "topping2": topping2 === '' ? null : topping2,
            "topping3": topping3 === '' ? null : topping3,
            "topping4": topping4 === '' ? null : topping4,
            "price": parseFloat(resultPrice.price)
        }
        var jsonPizzaOrder = JSON.stringify(pizzaOrder);

        for(let i = 0; i < quantity; i++) {
            allOrders.push(jsonPizzaOrder);
            setTotalPrice(totalPrice + parseFloat(resultPrice.price));
        }

        set_quantity(1);
        set_item_type('');
        set_topping1('');
        set_topping2('');
        set_topping3('');
        set_topping4('');
        set_sauce('');
        set_drizzle('');
        set_cheese_type('');
        set_default_crust('');
        set_drink('');
        return () =>
        {
            controller.abort();
        }
    }

    const AddMenu = async () => {
        if (item_type === '' && allOrders.length === 0 && drink === '') {
            return;
        }
        const controller = new AbortController();
        const responsePrice = await fetch(`${url}price?pizzatype=${item_type === '' ? "" : item_type.menu_item}&crusttype=${default_crust}&drinktype=${drink}`, {signal:controller.signal});
        const resultPrice = await responsePrice.json();
        
        const current = new Date();
        const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;

        const responseId = await fetch(`${url}orders/?latest=true` ,{signal:controller.signal});
        const resultId = await responseId.json();

        var pizzaOrder = {
            "orderid": 1 + parseInt(resultId[0].id),
            "pizza_type": item_type === '' ? null : item_type.menu_item,
            "cheese_type": cheese_type,
            "crust": default_crust,
            "sauce": sauce,
            "drizzle": drizzle,
            "drink": drink,
            "topping1": topping1 === '' ? null : topping1,
            "topping2": topping2 === '' ? null : topping2,
            "topping3": topping3 === '' ? null : topping3,
            "topping4": topping4 === '' ? null : topping4,
            "price": parseFloat(resultPrice.price)
        }
        var jsonPizzaOrder = JSON.stringify(pizzaOrder);
        
        for(let i = 0; i < quantity; i++) {
            allOrders.push(jsonPizzaOrder);
            totalPrice += parseFloat(resultPrice.price);
        }
    
        /*console.log(date, totalPrice, name);
        console.log (allOrders);*/
            
        
        fetch(`${url}orders/`,  {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            signal:controller.signal,
            body: JSON.stringify({
              "order_date": date, 
              "price": totalPrice,
              "payment_type": "", 
              "customer_name": name
            })
          });

        
        fetch(`${url}pizzas/`, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            signal:controller.signal,
            body: allOrders
        });
    

        setAllOrders([]);
        set_name('');
        set_item_type('');
        set_topping1('');
        set_topping2('');
        set_topping3('');
        set_topping4('');
        set_sauce('');
        set_drizzle('');
        set_cheese_type('');
        set_default_crust('');
        set_drink('');
        setTotalPrice(0);
        return () =>
        {
            controller.abort();
        }
    }
    const CancelOrder = () => {
        setAllOrders([]);
        set_name('');
        set_item_type('');
        set_topping1('');
        set_topping2('');
        set_topping3('');
        set_topping4('');
        set_sauce('');
        set_drizzle('');
        set_cheese_type('');
        set_default_crust('');
        set_drink('');
        setTotalPrice(0);
    }
    
    const handleTypeChange = (event) => {
        var pizzaInfo = event.target.value;
        if(pizzaInfo.item_type === "PRESET_PIZZA") {
            set_item_type(pizzaInfo);
            set_topping1(pizzaInfo.topping1);
            set_topping2(pizzaInfo.topping2);
            set_topping3(pizzaInfo.topping3);
            set_topping4(pizzaInfo.topping4);
            set_sauce(pizzaInfo.sauce);
            set_cheese_type(pizzaInfo.cheese_type);
            set_default_crust(pizzaInfo.default_crust);
            set_drizzle(pizzaInfo.drizzle);
        } else {
            set_item_type(pizzaInfo);
            set_topping1('');
            set_topping2('');
            set_topping3('');
            set_topping4('');
            set_sauce('');
            set_cheese_type('');
            set_default_crust('');
            set_drizzle('');
        }
    }
    const handleTop1Change = (event) => {
        set_topping1(event.target.value);
    }
    const handleTop2Change = (event) => {
        set_topping2(event.target.value);
    }
    const handleTop3Change = (event) => {
        set_topping3(event.target.value);
    }
    const handleTop4Change = (event) => {
        set_topping4(event.target.value);
    }
    const handleSauceChange = (event) => {
        set_sauce(event.target.value);
    }
    const handleDrizzleChange = (event) => {
        set_drizzle(event.target.value);
    }
    const handleCheeseChange = (event) => {
        set_cheese_type(event.target.value);
    }
    const handleCrustChange = (event) => {
        set_default_crust(event.target.value);
    }
    const handleDrinkChange = (event) => {
        set_drink(event.target.value);
    }

    return (
        <Translator
            from='en'
            to={lang}
            googleApiKey={apiKey}
        >
        <div className={dark === 'dark' ? "container-form-dark" : "container"}>
            <table>
                <tr>
                    <td>
                        <div className={dark === 'dark' ? "form-group-dark" : "form-group"}>
                                <b><Translate> Enter Name for Order</Translate></b>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    name="name"
                                    value={name}
                                    onChange={(e) => set_name(e.target.value)}
                                />
                        </div>
                    </td>
                </tr>
            </table>
            <table>
                <tr>
                    <td width = "50%">
                        <div className={dark === 'dark' ? "form-group-dark" : "form-group"}>
                            <b><Translate>Select Pizza Type</Translate></b>
                            <TextField label="Select Pizza Type" select value={item_type} onChange={handleTypeChange} fullWidth>
                                {basePizzas.map(item => (
                                    <MenuItem value={item}><Translate>{item.menu_item}</Translate></MenuItem>
                                ))}
                                {presetPizzas.map(item => (
                                    <MenuItem value={item}><Translate>{item.menu_item}</Translate></MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className={dark === 'dark' ? "form-group-dark" : "form-group"}>
                            <b><Translate>Select Topping One</Translate></b>
                            <TextField label="Select Topping One" select value={topping1} onChange={handleTop1Change} fullWidth>
                                <MenuItem value=''><Translate>Remove Topping</Translate></MenuItem>
                                {toppingList.map(ingredient => (
                                    <MenuItem value={ingredient.ingredient_name}><Translate>{ingredient.ingredient_name}</Translate></MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className={dark === 'dark' ? "form-group-dark" : "form-group"}>
                            <b><Translate>Select Topping Two</Translate></b>
                            <TextField label="Select Topping Two" select value={topping2} onChange={handleTop2Change} fullWidth>
                                <MenuItem value=''><Translate>Remove Topping</Translate></MenuItem>
                                {toppingList.map(ingredient => (
                                    <MenuItem value={ingredient.ingredient_name}><Translate>{ingredient.ingredient_name}</Translate></MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className={dark === 'dark' ? "form-group-dark" : "form-group"}>
                            <b><Translate>Select Toppping Three</Translate></b>
                            <TextField label="Select Topping Three" select value={topping3} onChange={handleTop3Change} fullWidth>
                                <MenuItem value=''><Translate>Remove Topping</Translate></MenuItem>
                                {toppingList.map(ingredient => (
                                    <MenuItem value={ingredient.ingredient_name}><Translate>{ingredient.ingredient_name}</Translate></MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className={dark === 'dark' ? "form-group-dark" : "form-group"}>
                            <b><Translate>Select Topping Four</Translate></b>
                            <TextField label="Select Topping Four" select value={topping4} onChange={handleTop4Change} fullWidth>
                                <MenuItem value=''><Translate>Remove Topping</Translate></MenuItem>
                                {toppingList.map(ingredient => (
                                    <MenuItem value={ingredient.ingredient_name}><Translate>{ingredient.ingredient_name}</Translate></MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className={dark === 'dark' ? "form-group-dark" : "form-group"}>
                            <b><Translate>Select Sauce</Translate></b>
                            <TextField label="Select Sauce" select value={sauce} onChange={handleSauceChange} fullWidth>
                                {sauceList.map(sauce => (
                                    <MenuItem value={sauce.ingredient_name}><Translate>{sauce.ingredient_name}</Translate></MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </td>
                    <td width = "50%">
                        <div className={dark === 'dark' ? "form-group-dark" : "form-group"}>
                            <b><Translate>Select Drizzle</Translate></b>
                            <TextField label="Select Drizzle" select value={drizzle} onChange={handleDrizzleChange} fullWidth>
                                <MenuItem value=''><Translate>No Drizzle</Translate></MenuItem>
                                {drizzleList.map(drizzle => (
                                    <MenuItem value={drizzle.ingredient_name}><Translate>{drizzle.ingredient_name}</Translate></MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className={dark === 'dark' ? "form-group-dark" : "form-group"}>
                            <b><Translate>Select Cheese</Translate></b>
                            <TextField label="Select Cheese" select value={cheese_type} onChange={handleCheeseChange} fullWidth>
                                {cheeseList.map(cheese_type => (
                                    <MenuItem value={cheese_type.ingredient_name}><Translate>{cheese_type.ingredient_name}</Translate></MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className={dark === 'dark' ? "form-group-dark" : "form-group"}>
                            <b><Translate>Select Crust</Translate></b>
                            <TextField label="Select Crust" select value={default_crust} onChange={handleCrustChange} fullWidth>
                                {crustList.map(default_crust => (
                                    <MenuItem value={default_crust.ingredient_name}><Translate>{default_crust.ingredient_name}</Translate></MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className={dark === 'dark' ? "form-group-dark" : "form-group"}>
                            <b><Translate>Select Drink</Translate></b>
                            <TextField label="Select Drink" select value={drink} onChange={handleDrinkChange} fullWidth>
                                <MenuItem value=''><Translate>No Drink</Translate></MenuItem>
                                {drinks.map(item => (
                                    <MenuItem value={item.menu_item}><Translate>{item.menu_item}</Translate></MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className= {dark === 'dark' ? "form-group-dark" : "form-group"}>
                            <b><Translate>Select Quantity</Translate></b>
                            <input
                                type="number"
                                className="form-control form-control-lg"
                                id="quantity"
                                defaultValue={quantity}
                                placeholder={1}
                                name="alterQuantityAmt"
                                onChange={(e) => set_quantity(e.target.value)}
                            />
                        </div>
                        <div className={dark === 'dark' ? "form-group-dark" : "form-group"}>
                            <button onClick={AddPizza} className="btn btn-success btn-block"><Translate>Add Item</Translate></button>
                        </div>
                        <div className={dark === 'dark' ? "form-group-dark" : "form-group"}>
                            <button onClick={AddMenu} className="btn btn-success btn-block"><Translate>Place Order</Translate></button>
                        </div>
                        <div className={dark === 'dark' ? "form-group-dark" : "form-group"}>
                            <button onClick={CancelOrder} className = "btn btn-error"><Translate>Cancel Order</Translate></button>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        </Translator>
    )
}

export default OrderMenuForm;
