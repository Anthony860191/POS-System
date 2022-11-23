import axios from 'axios';
import React, {Fragment} from 'react';
import Button from "@mui/material/Button";

class RemoveForm extends React.Component {
    constructor (props) {
        super(props);
        this.initialState = {
            ingredientName:''
        };
        this.state = this.initialState;
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    submitForm = () => {
        this.props.handleSubmit(this.state);
        this.setState(this.initialState);
    }

      render (){
    const {name, job} = this.state;

    return (
      <form>
            <input
                type="text"
                name="ingredientName"
                value={name}
                placeholder={"Ingredient Name"}
                onChange={this.handleChange} />
            <Button type='submit' id="removeIngrButton" variant="contained" onClick={() => this.submitForm}>Remove</Button>
      </form>
    )
  }
}

export default RemoveForm;

