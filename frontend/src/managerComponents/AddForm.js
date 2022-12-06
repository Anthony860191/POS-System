import axios from 'axios';
import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { Translator, Translate } from 'react-auto-translate';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

function AddIngrForm({ lang, mode }) {

    let navigate = useNavigate();
    const { id } = useParams();

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
        <Translator
            from='en'
            to={lang}
            googleApiKey={apiKey}
        >
            <table>
                <tr>
                    <th><Translate>Add Ingredient</Translate></th>
                </tr>
                <tr>
                    <div className="form-group">
                        <b><Translate>Enter Ingredient Name</Translate></b>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter Ingredient Name"
                            name="ingredient_name"
                            value={ingredient_name}
                            onChange={(e) => set_ingr_name(e.target.value)}
                        />
                    </div>
                </tr>
                <tr>
                    <div className="form-group">
                        <b><Translate>Enter Quantity</Translate></b>
                        <input
                            type="number"
                            className="form-control form-control-lg"
                            placeholder="Enter Quantity"
                            name="quantity"
                            value={quantity}
                            onChange={(e) => set_quantity(e.target.value)}
                        />
                    </div>
                </tr>
                <tr>
                    <div className="form-group">
                    <b><Translate>Select Unit</Translate></b>
                        <TextField label="Select Unit" select value={units} onChange={handleUnitChange} fullWidth>
                            <MenuItem value='lbs'><Translate>lbs</Translate></MenuItem>
                            <MenuItem value='liters'><Translate>liters</Translate></MenuItem>
                        </TextField>
                    </div>
                </tr>
                <tr>
                    <div className="form-group">
                    <b><Translate>Select Ingredient Type</Translate></b>
                        <TextField label="Select Ingredient Type" select value={ingr_type} onChange={handleTypeChange}
                            fullWidth>
                            <MenuItem value='VEGGIES'><Translate>Vegetable</Translate></MenuItem>
                            <MenuItem value='MEAT'><Translate>Meat</Translate></MenuItem>
                            <MenuItem value='SAUCE'><Translate>Sauce</Translate></MenuItem>
                            <MenuItem value='DRIZZLE'><Translate>Drizzle</Translate></MenuItem>
                            <MenuItem value='CHEESE'><Translate>Cheese</Translate></MenuItem>
                            <MenuItem value='CRUST'><Translate>Crust</Translate></MenuItem>
                        </TextField>
                    </div>
                </tr>
                <tr>
                    <div className="form-group">
                        <b><Translate>Enter Usage Value</Translate></b>
                        <input
                            type="number"
                            className="form-control form-control-lg"
                            placeholder="Enter Usage Value"
                            name="usage_value"
                            value={usage_value}
                            onChange={(e) => set_usage_value(e.target.value)}
                        />
                    </div>
                </tr>
                <tr>
                    <button onClick={AddIngr} className="btn btn-primary btn-block"><Translate>Add Ingredient</Translate></button>
                </tr>
            </table>
        </Translator>
    )
}

export default AddIngrForm;