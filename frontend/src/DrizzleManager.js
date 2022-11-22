import axios from 'axios';
import React from 'react';
class DrizzleManager extends React.Component {
   
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
        axios.get("http://localhost:8000/ingredients/?ingr_type=DRIZZLE")
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
                            <th>Alter Amount in Inventory</th>
                        </tr>
                            {
                items.map((item) => (
                <tr>
                    <td>{ item.ingredient_name }</td>
                    <input
                        type="number"
                        className="form-control form-control-lg"
                        id="alterInventoryAmt"
                        defaultValue={item.quantity}
                        placeholder={item.quantity}
                        name="alterInventoryAmt"
                    />
                </tr>
                ))
            }
            </table>
        </div>
    );
}
}
   
export default DrizzleManager;