import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { Translator, Translate } from 'react-auto-translate';
import {MenuItem, TextField} from "@mui/material";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

/**
 * @author Joshua Hillis
 * Creates a table that allows the user to set parameters and add a menu item to the menu.
 * @constructor
 * @param {string} lang - The language for the text to be in.
 * @param {string} mode - The toggle for dark / light mode.
 */
const AddMenuForm = ({lang, mode}) => {
    const dark = mode;
    useEffect(() => {

        // Obtain a list of all the separate ingredient types to display in our drop-down lists
        const fetchIngredients = async () => {
            const VegResponse = await fetch('http://localhost:8000/ingredients/?ingr_type=VEGGIES');
            const vegData = await VegResponse.json();
            const MeatResponse = await fetch('http://localhost:8000/ingredients/?ingr_type=MEAT');
            const meatData = await MeatResponse.json();
            const SauceResponse = await fetch('http://localhost:8000/ingredients/?ingr_type=SAUCE');
            const sauceData = await SauceResponse.json();
            const DrizzleResponse = await fetch('http://localhost:8000/ingredients/?ingr_type=DRIZZLE');
            const drizzleData = await DrizzleResponse.json();
            const CheeseResponse = await fetch('http://localhost:8000/ingredients/?ingr_type=CHEESE');
            const cheeseData = await CheeseResponse.json();
            const CrustResponse = await fetch('http://localhost:8000/ingredients/?ingr_type=CRUST');
            const crustData = await CrustResponse.json();
            var ingredientData = [...vegData, ...meatData];


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

    const [menu_item, set_menu_item] = useState('')
    const [item_type, set_item_type] = useState('')
    const [price, set_price] = useState('')
    const [topping1, set_topping1] = useState(null)
    const [topping2, set_topping2] = useState(null)
    const [topping3, set_topping3] = useState(null)
    const [topping4, set_topping4] = useState(null)
    const [toppingList, set_topping_list] = useState([{'ingredient_name':''}])
    const [sauce, set_sauce] = useState(null)
    const [sauceList, set_sauce_list] = useState([{'ingredient_name':''}])
    const [drizzle, set_drizzle] = useState(null)
    const [drizzleList, set_drizzle_list] = useState([{'ingredient_name':''}])
    const [cheese_type, set_cheese_type] = useState(null)
    const [cheeseList, set_cheese_list] = useState([{'ingredient_name':''}])
    const [default_crust, set_default_crust] = useState(null)
    const [crustList, set_crust_list] = useState([{'ingredient_name':''}])

    const AddMenu = async ({lang}) => {
        let formField = new FormData()

        formField.append('menu_item', menu_item)
        formField.append('item_type', item_type)
        formField.append('price', price)
        formField.append('topping1', topping1)
        formField.append('topping2', topping2)
        formField.append('topping3', topping3)
        formField.append('topping4', topping4)
        formField.append('sauce', sauce)
        formField.append('drizzle', drizzle)
        formField.append('cheese_type', cheese_type)
        formField.append('default_crust', default_crust)


        await axios({
            method: 'post',
            url: 'http://localhost:8000/menu/',
            data: formField
        }).then(response => {
            console.log(response.data);
            window.location.reload(false);
            navigate('/manager');
        })
    }

    const handleTypeChange = (event) => {
        set_item_type(event.target.value);
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

    return (
        <Translator
            from='en' to={lang} googleApiKey={apiKey}>
        <div className={dark === 'dark' ? "container-form-dark" : "container"}>
            <div className="form-group">
                <b><Translate>Enter Item Name</Translate></b>
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Item Name"
                    name="menu_item"
                    value={menu_item}
                    onChange={(e) => set_menu_item(e.target.value)}
                />
            </div>
            <div className="form-group">
                <b><Translate>Select Item Type</Translate></b>
                <TextField label="Select Item Type" select value={item_type} onChange={handleTypeChange} fullWidth>
                    <MenuItem value='BASE_PIZZA'><Translate>Pizza</Translate></MenuItem>
                    <MenuItem value='PRESET_PIZZA'><Translate>Preset Pizza</Translate></MenuItem>
                    <MenuItem value='DRINK'><Translate>Drink</Translate></MenuItem>
                    <MenuItem value='CRUST'><Translate>Crust</Translate></MenuItem>
                </TextField>
            </div>
            <div className="form-group">
                <b><Translate>Enter Item Price</Translate></b>
                <input
                    type="number"
                    className="form-control form-control-lg"
                    placeholder="Enter Item Price"
                    name="price"
                    value={price}
                    onChange={(e) => set_price(e.target.value)}
                />
            </div>
            <div className="form-group">
                <b><Translate> Select Topping One</Translate></b>
                <TextField label="Select Topping One" select value={topping1} onChange={handleTop1Change} fullWidth>
                    {toppingList.map(ingredient => (
                        <MenuItem value={ingredient.ingredient_name}><Translate>{ingredient.ingredient_name}</Translate></MenuItem>
                    ))}
                </TextField>
            </div>
            <div className="form-group">
                <b><Translate> Select Topping Two</Translate></b>
                <TextField label="Select Topping Two" select value={topping2} onChange={handleTop2Change} fullWidth>
                    {toppingList.map(ingredient => (
                        <MenuItem value={ingredient.ingredient_name}><Translate>{ingredient.ingredient_name}</Translate></MenuItem>
                    ))}
                </TextField>
            </div>
            <div className="form-group">
                <b><Translate> Select Topping Three</Translate></b>
                <TextField label="Select Topping Three" select value={topping3} onChange={handleTop3Change} fullWidth>
                    {toppingList.map(ingredient => (
                        <MenuItem value={ingredient.ingredient_name}><Translate>{ingredient.ingredient_name}</Translate></MenuItem>
                    ))}
                </TextField>
            </div>
            <div className="form-group">
                <b><Translate> Select Topping Four</Translate></b>
                <TextField label="Select Topping Four" select value={topping4} onChange={handleTop4Change} fullWidth>
                    {toppingList.map(ingredient => (
                        <MenuItem value={ingredient.ingredient_name}><Translate>{ingredient.ingredient_name}</Translate></MenuItem>
                    ))}
                </TextField>
            </div>
            <div className="form-group">
                <b><Translate>Select Item Sauce</Translate></b>
                <TextField label="Select Sauce" select value={sauce} onChange={handleSauceChange} fullWidth>
                    {sauceList.map(sauce => (
                        <MenuItem value={sauce.ingredient_name}><Translate>{sauce.ingredient_name}</Translate></MenuItem>
                    ))}
                </TextField>
            </div>
            <div className="form-group">
                <b><Translate>Select Item Drizzle</Translate></b>
                <TextField label="Select Drizzle" select value={drizzle} onChange={handleDrizzleChange} fullWidth>
                    {drizzleList.map(drizzle => (
                        <MenuItem value={drizzle.ingredient_name}><Translate>{drizzle.ingredient_name}</Translate></MenuItem>
                    ))}
                </TextField>
            </div>
            <div className="form-group">
                <b><Translate>Select Item Cheese</Translate></b>
                <TextField label="Select Cheese" select value={cheese_type} onChange={handleCheeseChange} fullWidth>
                    {cheeseList.map(cheese_type => (
                        <MenuItem value={cheese_type.ingredient_name}><Translate>{cheese_type.ingredient_name}</Translate></MenuItem>
                    ))}
                </TextField>
            </div>
            <div className="form-group">
                <b><Translate>Select Item Crust</Translate></b>
                <TextField label="Select Crust" select value={default_crust} onChange={handleCrustChange} fullWidth>
                    {crustList.map(default_crust => (
                        <MenuItem value={default_crust.ingredient_name}><Translate>{default_crust.ingredient_name}</Translate></MenuItem>
                    ))}
                </TextField>
            </div>
            <button onClick={AddMenu} className="btn btn-primary btn-block"><Translate>Add Menu Item</Translate></button>

        </div>
        </Translator>
    )
}

export default AddMenuForm;