import axios from 'axios';
import React, {useState} from 'react';
import Button from "@mui/material/Button";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useNavigate, useParams} from 'react-router-dom';

const AddIngrForm = () => {

    let navigate = useNavigate();
    const {id} = useParams();

    const [ingredient_name, set_ingr_name] = useState(null)
    const [quantity, set_quantity] = useState(null)
    const [units, set_units] = useState('')
    const [ingr_type, set_ingr_type] = useState(null)
    const [usage_value, set_usage_value] = useState(null)

    const AddIngr = async () => {
        let formField = new FormData()

        formField.append('ingredient_name', ingredient_name)
        formField.append('quantity', quantity)
        formField.append('units', units)
        formField.append('ingr_type', ingr_type)
        formField.append('usage_value', usage_value)

        console.log(formField)


        await axios({
            method: 'post',
            url: 'http://localhost:8000/ingredients/',
            data: formField
        }).then(response => {
            console.log(response.data);
            window.location.reload(false);
            navigate('/manager');
        })
    }

    const handleUnitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        set_units(event.target.value);
    }

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        set_ingr_type(event.target.value);
    }

    return (
        <div className="container">
            <div className="form-group">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Ingredient Name"
                    name="ingredient_name"
                    value={ingredient_name}
                    onChange={(e) => set_ingr_name(e.target.value)}
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Quantity"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => set_quantity(e.target.value)}
                />
            </div>
            <div className="form-group">
                <TextField label="Select Unit" select value={units} onChange={handleUnitChange} fullWidth>
                    <MenuItem value='lbs'>lbs</MenuItem>
                    <MenuItem value='liters'>liters</MenuItem>
                </TextField>
            </div>
            <div className="form-group">
                <TextField label="Select Ingredient Type" select value={ingr_type} onChange={handleTypeChange} fullWidth>
                    <MenuItem value='VEGGIES'>Vegetable</MenuItem>
                    <MenuItem value='MEAT'>Meat</MenuItem>
                    <MenuItem value='SAUCE'>Sauce</MenuItem>
                    <MenuItem value='DRIZZLE'>Drizzle</MenuItem>
                    <MenuItem value='CHEESE'>Cheese</MenuItem>
                    <MenuItem value='CRUST'>Crust</MenuItem>
                </TextField>
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Usage Value"
                    name="usage_value"
                    value={usage_value}
                    onChange={(e) => set_usage_value(e.target.value)}
                />
            </div>
            <button onClick={AddIngr} className="btn btn-primary btn-block">Add Ingredient</button>

        </div>
    )
}

export default AddIngrForm;