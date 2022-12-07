import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Button from "@mui/material/Button";
import {json, useNavigate, useParams} from 'react-router-dom';
import {MenuItem, TextField} from "@mui/material";

/**
 * @author Anthony Mercado
 * @author Joshua Hillis
 * Creates a page that allows for the server to efficiently place orders with less considerations for accessibility.
 * @constructor
 * @param {string} lang - The language for the text to be in.
 */
const OrderMenuForm = ({ lang }) => {
    const url = 'http://localhost:8000';

    // Obtain a list of all the separate ingredient types
    useEffect(() => {
        const fetchIngredients = async () => {
            const PizzaReponse = await fetch(`${url}/menu`);
            const pizzaData = await PizzaReponse.json();
            const VegResponse = await fetch(`${url}/ingredients/?ingr_type=VEGGIES`);
            const vegData = await VegResponse.json();
            const MeatResponse = await fetch(`${url}/ingredients/?ingr_type=MEAT`);
            const meatData = await MeatResponse.json();
            const SauceResponse = await fetch(`${url}/ingredients/?ingr_type=SAUCE`);
            const sauceData = await SauceResponse.json();
            const DrizzleResponse = await fetch(`${url}/ingredients/?ingr_type=DRIZZLE`);
            const drizzleData = await DrizzleResponse.json();
            const CheeseResponse = await fetch(`${url}/ingredients/?ingr_type=CHEESE`);
            const cheeseData = await CheeseResponse.json();
            const CrustResponse = await fetch(`${url}/ingredients/?ingr_type=CRUST`);
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
    }, [])

    let navigate = useNavigate();
    const {id} = useParams();

    const [name, set_name] = useState('')
    const [item_type, set_item_type] = useState('')
    const [totalPrice, set_totalPrice] = useState('')
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
        if (item_type === '') {
            return;
        }
        const responseId = await fetch(`${url}/orders/?latest=true`);
        const resultId = await responseId.json();

        const responsePrice = await fetch(`${url}/price?pizzatype=${item_type}&crusttype=${default_crust}&drinktype=${drink}`);
        const resultPrice = await responsePrice.json();

        var pizzaOrder = {
            "orderid": 1 + parseInt(resultId[0].id),
            "pizza_type": item_type,
            "cheese_type": cheese_type,
            "crust": default_crust,
            "sauce": sauce,
            "drizzle": drizzle,
            "drink": drink,
            "topping1": topping1 === '' ? '' : topping1,
            "topping2": topping2 === '' ? '' : topping2,
            "topping3": topping3 === '' ? '' : topping3,
            "topping4": topping4 === '' ? '' : topping4,
            "price": parseFloat(resultPrice.price)
        }
        var jsonPizzaOrder = JSON.stringify(pizzaOrder);

        for(let i = 0; i < quantity; i++) {
            allOrders.push(jsonPizzaOrder);
            set_totalPrice(totalPrice + parseFloat(resultPrice.price));
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
    }

    const AddMenu = async () => {
        if (item_type === '' && allOrders.length === 0) {
            return;
        }
        const responsePrice = await fetch(`${url}/price?pizzatype=${item_type}&crusttype=${default_crust}&drinktype=${drink}`);
        const resultPrice = await responsePrice.json();
        
        const current = new Date();
        const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;

        const responseId = await fetch(`${url}/orders/?latest=true`);
        const resultId = await responseId.json();

        var pizzaOrder = {
            "orderid": 1 + parseInt(resultId[0].id),
            "pizza_type": item_type,
            "cheese_type": cheese_type,
            "crust": default_crust,
            "sauce": sauce,
            "drizzle": drizzle,
            "drink": drink,
            "topping1": topping1 === '' ? '' : topping1,
            "topping2": topping2 === '' ? '' : topping2,
            "topping3": topping3 === '' ? '' : topping3,
            "topping4": topping4 === '' ? '' : topping4,
            "price": parseFloat(resultPrice.price)
        }
        var jsonPizzaOrder = JSON.stringify(pizzaOrder);

        for(let i = 0; i < quantity; i++) {
            allOrders.push(jsonPizzaOrder);
            set_totalPrice(totalPrice + parseFloat(resultPrice.price));
        }

        console.log(date, totalPrice, name);
        /*await axios({
            method: 'post',
            url: `${url}/orders/`,
            data: JSON.stringify({
                "order_date": date, 
                "price": totalPrice,
                "payment_type": "card", 
                "customer_name": name
            })
        }).then(response => {
            console.log(response.data);
            window.location.reload(false);
            navigate('/server');
        })*/

        /*
        fetch(`${url}/pizzas/`, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: allOrders
        });
    */

        console.log (allOrders);

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
    }

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        set_item_type(event.target.value);
    }
    const handleTop1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        set_topping1(event.target.value);
    }
    const handleTop2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        set_topping2(event.target.value);
    }
    const handleTop3Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        set_topping3(event.target.value);
    }
    const handleTop4Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        set_topping4(event.target.value);
    }
    const handleSauceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        set_sauce(event.target.value);
    }
    const handleDrizzleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        set_drizzle(event.target.value);
    }
    const handleCheeseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        set_cheese_type(event.target.value);
    }
    const handleCrustChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        set_default_crust(event.target.value);
    }
    const handleDrinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        set_drink(event.target.value);
    }

    return (
        <div className="container">
            <div className="form-group">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Name for Order"
                    name="name"
                    value={name}
                    onChange={(e) => set_name(e.target.value)}
                />
            </div>
            <div className="form-group">
                <TextField label="Select Pizza Type" select value={item_type} onChange={handleTypeChange} fullWidth>
                    {basePizzas.map(item => (
                        <MenuItem value={item.menu_item}>{item.menu_item}</MenuItem>
                    ))}
                    {presetPizzas.map(item => (
                        <MenuItem value={item.menu_item}>{item.menu_item}</MenuItem>
                    ))}
                </TextField>
            </div>
            <div className="form-group">
                <TextField label="Select Topping One" select value={topping1} onChange={handleTop1Change} fullWidth>
                    <MenuItem value=''>Remove Topping</MenuItem>
                    {toppingList.map(ingredient => (
                        <MenuItem value={ingredient.ingredient_name}>{ingredient.ingredient_name}</MenuItem>
                    ))}
                </TextField>
            </div>
            <div className="form-group">
                <TextField label="Select Topping Two" select value={topping2} onChange={handleTop2Change} fullWidth>
                    <MenuItem value=''>Remove Topping</MenuItem>
                    {toppingList.map(ingredient => (
                        <MenuItem value={ingredient.ingredient_name}>{ingredient.ingredient_name}</MenuItem>
                    ))}
                </TextField>
            </div>
            <div className="form-group">
                <TextField label="Select Topping Three" select value={topping3} onChange={handleTop3Change} fullWidth>
                    <MenuItem value=''>Remove Topping</MenuItem>
                    {toppingList.map(ingredient => (
                        <MenuItem value={ingredient.ingredient_name}>{ingredient.ingredient_name}</MenuItem>
                    ))}
                </TextField>
            </div>
            <div className="form-group">
                <TextField label="Select Topping Four" select value={topping4} onChange={handleTop4Change} fullWidth>
                    <MenuItem value=''>Remove Topping</MenuItem>
                    {toppingList.map(ingredient => (
                        <MenuItem value={ingredient.ingredient_name}>{ingredient.ingredient_name}</MenuItem>
                    ))}
                </TextField>
            </div>
            <div className="form-group">
                <TextField label="Select Sauce" select value={sauce} onChange={handleSauceChange} fullWidth>
                    {sauceList.map(sauce => (
                        <MenuItem value={sauce.ingredient_name}>{sauce.ingredient_name}</MenuItem>
                    ))}
                </TextField>
            </div>
            <div className="form-group">
                <TextField label="Select Drizzle" select value={drizzle} onChange={handleDrizzleChange} fullWidth>
                    <MenuItem value=''>No Drizzle</MenuItem>
                    {drizzleList.map(drizzle => (
                        <MenuItem value={drizzle.ingredient_name}>{drizzle.ingredient_name}</MenuItem>
                    ))}
                </TextField>
            </div>
            <div className="form-group">
                <TextField label="Select Cheese" select value={cheese_type} onChange={handleCheeseChange} fullWidth>
                    {cheeseList.map(cheese_type => (
                        <MenuItem value={cheese_type.ingredient_name}>{cheese_type.ingredient_name}</MenuItem>
                    ))}
                </TextField>
            </div>
            <div className="form-group">
                <TextField label="Select Crust" select value={default_crust} onChange={handleCrustChange} fullWidth>
                    {crustList.map(default_crust => (
                        <MenuItem value={default_crust.ingredient_name}>{default_crust.ingredient_name}</MenuItem>
                    ))}
                </TextField>
            </div>
            <div className="form-group">
                <TextField label="Select Drink" select value={drink} onChange={handleDrinkChange} fullWidth>
                    <MenuItem value=''>No Drink</MenuItem>
                    {drinks.map(item => (
                        <MenuItem value={item.menu_item}>{item.menu_item}</MenuItem>
                    ))}
                </TextField>
            </div>
            <div classname = "form-group">
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
            <br></br>
            <button onClick={AddPizza} className="btn btn-success btn-block">Add Item</button>
            <br></br>
            <button onClick={AddMenu} className="btn btn-primary btn-block">Place Order</button>

        </div>
    )
}

export default OrderMenuForm;