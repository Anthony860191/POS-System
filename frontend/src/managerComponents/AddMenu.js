import axios from 'axios';
import React, {useState} from 'react';
import Button from "@mui/material/Button";
import {useNavigate, useParams} from 'react-router-dom';
import {MenuItem, TextField} from "@mui/material";

const AddMenuForm = () => {

    let navigate = useNavigate();
    const {id} = useParams();

    const [menu_item, set_menu_item] = useState(null)
    const [item_type, set_item_type] = useState(null)
    const [price, set_price] = useState(null)
    const [topping1, set_topping1] = useState(null)
    const [topping2, set_topping2] = useState(null)
    const [topping3, set_topping3] = useState(null)
    const [topping4, set_topping4] = useState(null)
    const [sauce, set_sauce] = useState(null)
    const [drizzle, set_drizzle] = useState(null)
    const [cheese_type, set_cheese_type] = useState(null)
    const [default_crust, set_default_crust] = useState(null)

    const AddMenu = async () => {
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
            url: 'http://localhost:8000/ingredients/',
            data: formField
        }).then(response => {
            console.log(response.data);
            navigate('/Manager')
        })
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

    return (
        <div className="container">
            <div className="form-group">
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
                <TextField label="Select Item Type" select value={item_type} onChange={handleTypeChange} fullWidth>
                    <MenuItem value='BASE_PIZZA'>Base Pizza</MenuItem>
                    <MenuItem value='PRESET_PIZZA'>Preset Pizza</MenuItem>
                    <MenuItem value='DRINK'>Drink</MenuItem>
                    <MenuItem value='CRUST'>Crust</MenuItem>
                </TextField>
            </div>
            <div className="form-group">
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
                <TextField label="Select Topping One" select value={topping1} onChange={handleTypeChange} fullWidth>

                </TextField>
            </div>
            <button onClick={AddMenu} className="btn btn-primary btn-block">Add Menu Item</button>

        </div>
    )
}

export default AddMenuForm;