import axios from 'axios';
import React, {Fragment} from 'react';
import Button from "@mui/material/Button";

class AddIngrForm extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            ingredientName: '',
            ingredientType: ''
        };
        this.state = this.initialState;
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    submitForm = async () => {
        const itemData = new FormData();
        itemData.append("ingredient_name", AddIngrForm.ingredientName)
        itemData.append("quantity", '0.00')
        itemData.append("units", "lbs")
        itemData.append("ingr_type", AddIngrForm.ingredientType)
        itemData.append("usage_value", "0.10")

        const other = {
            "ingredient_name": "",
            "quantity": null,
            "units": "",
            "ingr_type": "",
            "usage_value": null
        }

        try {
            const response = await axios({
                method: "post",
                url: "http://localhost:8000/ingredients/",
                data: itemData
            })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const {name, job} = this.state;

        return (
            <form action="/ingredients/" method="post">
                <table>
                    <tr>
                        <th>
                            <label htmlFor="ingredient_name">Name </label>
                        </th>
                        <th>
                            <label htmlFor="units">Units </label>
                        </th>
                        <th>
                            <label htmlFor="ingredient_type">Type </label>
                        </th>
                        <th>
                            <label htmlFor="usage_value">Usage </label>
                        </th>
                    </tr>
                    <tr>
                        <td>
                            <input id="ingredient_name" type="text" name="ingredient_name" placeholder="Insert Name"/>
                        </td>
                        <td>
                            <select id="units" name="units">
                                <option value="lbs">lbs</option>
                                <option value="liters">liters</option>
                            </select>
                        </td>
                        <td>
                            <select id="ingredient_type" name="ingredient_type">
                                <option value="VEGGIES">Vegetables</option>
                                <option value="MEAT">Meat</option>
                                <option value="SAUCE">Sauce</option>
                                <option value="DRIZZLE">Drizzle</option>
                                <option value="CHEESE">Cheese</option>
                                <option value="CRUST">Crust</option>
                            </select>
                        </td>
                        <td>
                            <input id="usage_value" name="usage_value"
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                        </td>
                        <td>
                            <input type="submit" value="Add Ingredient"/>
                        </td>
                    </tr>
                </table>
            </form>
        )
    }
}

export default AddIngrForm;

