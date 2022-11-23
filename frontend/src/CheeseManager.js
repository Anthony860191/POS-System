import axios from 'axios';
import React from 'react';
class CheeseManager extends React.Component {
   
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
            this.setState({ items:res_data, DataisLoaded:true });
          })

    }
    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return <div>
            <h1> Pleses wait some time.... </h1> </div> ;
   
        return (
        <div className="content-tabs">
             <table>
                        <tr>
                            <th>Ingredient Name</th>
                            <th>Current Amount</th>
                            <th>Alter Inventory</th>  </tr>
                            {
                items.map((item) => ( 
                <tr>
                    <td>{ item.ingredient_name }</td>
                    <td>{item.quantity} </td>
                    <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                </tr>
                ))
            }
            </table>
        </div>
    );
}
}
   
export default CheeseManager;