import axios from 'axios';
import React, { Fragment } from "react";

class MenuManager extends React.Component {

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
        axios.get("http://localhost:8000/menu/")
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
                 <thead>
                     <tr>
                        <th>Item Name</th>
                        <th>Item Type</th>
                        <th>Price</th>
                        <th>Toppings</th>
                        <th>Sauce</th>
                        <th>Drizzle</th>
                        <th>Cheese</th>
                    </tr>
                 </thead>
                 <tbody>
                    {items.map((item) => (
                        <tr>
                            <td>{ item.menu_item }</td>
                            <td>{item.item_type} </td>
                            <td>{item.price} </td>
                            <td>
                                <select id="menuSelect">
                                    <option value={item.topping1}>{item.topping1}</option>
                                    <option value={item.topping2}>{item.topping2}</option>
                                    <option value={item.topping3}>{item.topping3}</option>
                                    <option value={item.topping4}>{item.topping4}</option>
                                </select>
                            </td>
                            <td>{item.sauce} </td>
                            <td>{item.drizzle} </td>
                            <td>{item.cheese_type} </td>
                        </tr>
                ))
            }
                 </tbody>
            </table>
        </div>
    );
}
}

export default MenuManager;