import axios from 'axios';
import React from 'react';
import Button from "@mui/material/Button";
const cheeseHandleClick = () => {
    alert("Selected Cheese");
  };

class CustomerCheeseSelection extends React.Component {

    // Constructor 
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            DataisLoaded: false
        };
    }

    // ComponentDidMount is used to
    // execute the code 
    componentDidMount() {
        axios.get("http://localhost:8000/ingredients/?ingr_type=CHEESE")
            .then(res => {
                const res_data = res.data;
                this.setState({ items: res_data, DataisLoaded: true });
            })

    }
    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return <div>
            <h1> Loading Buttons </h1> </div>;

        return (
            <div>
                {items.map((item) => (<Button disableRipple variant="contained" sx={{ m: 1 }} className="ingredientButton" onClick={cheeseHandleClick}>{item.ingredient_name}</Button>))}
            </div>
        );
    }
}

export default CustomerCheeseSelection;
