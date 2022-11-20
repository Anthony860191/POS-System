import axios from 'axios';
import React, {useState} from 'react';
import Button from "@mui/material/Button";
import {useNavigate, useParams} from 'react-router-dom';

const AddIngrForm = () => {

    let navigate = useNavigate();
    const {id} = useParams();

    const [ingredient_name, set_ingr_name] = useState(null)
    const [quantity, set_quantity] = useState(null)
    const [units, set_units] = useState(null)
    const [ingr_type, set_ingr_type] = useState(null)
    const [usage_value, set_usage_value] = useState(null)

    const AddIngr = async () => {
        let formField = new FormData()

        formField.append('ingredient_name', ingredient_name)
        formField.append('quantity', quantity)
        formField.append('units', units)
        formField.append('ingr_type', ingr_type)
        formField.append('usage_value', usage_value)


        await axios({
            method: 'post',
            url: 'http://localhost:8000/ingredients/',
            data: formField
        }).then(response => {
            console.log(response.data);
            navigate('/Manager')
        })
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
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Units"
                    name="units"
                    value={units}
                    onChange={(e) => set_units(e.target.value)}
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Ingredient Type"
                    name="ingredient_name"
                    value={ingr_type}
                    onChange={(e) => set_ingr_type(e.target.value)}
                />
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

