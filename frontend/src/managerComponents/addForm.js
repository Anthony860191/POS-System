import axios from 'axios';
import React, {Fragment} from 'react';
import Button from "@mui/material/Button";

class AddForm extends React.Component {
    constructor (props) {
        super(props);
        this.initialState = {
            ingredientName:'',
            ingredientType:''
        };
        this.state = this.initialState;
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    submitForm = async() => {
        const itemData = new FormData();
        itemData.append("ingredient_name", AddForm.ingredientName)
        itemData.append("quantity", '0.00')
        itemData.append("units", "lbs")
        itemData.append("ingr_type", AddForm.ingredientType)
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
        } catch(error) {
            console.log(error)
        }
    }

      render (){
    const {name, job} = this.state;

    return (
      <form onSubmit={this.submitForm}>
            <input
                type="text"
                name="ingredientName"
                value={name}
                placeholder={"Ingredient Name"}
                onChange={this.handleChange} />
            <input
                type="text"
                name="ingredientType"
                value={name}
                placeholder={"Ingredient Type"}
                onChange={this.handleChange} />
            <Button variant="contained" onClick={() => this.submitForm}>Add</Button>
      </form>
    )
  }
}

export default AddForm;

