import axios from 'axios';
import React from 'react';
class VegetableManager extends React.Component {

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
        axios.get("http://localhost:8000/ingredients/?ingr_type=VEGGIES")
            .then(res => {
                const veggies = res.data;
                this.setState({ items: veggies, DataisLoaded: true });
            })

    }
    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return <div>
            <h1> Please wait some time.... </h1> </div>;

        return (
            //  <div className="content-tabs">
            <table>
                <tr>
                    <th>Ingredient Name</th>
                    <th>Current Amount</th>
                    <th>Alter Inventory</th>  </tr>
                {
                    items.map((item) => (
                        <tr>
                            <td>{item.ingredient_name}</td>
                            <td>{item.quantity} </td>
                            <td><input
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                            /></td>
                        </tr>
                    ))
                }
            </table>
            // </div>
        );
    }
}

export default VegetableManager;