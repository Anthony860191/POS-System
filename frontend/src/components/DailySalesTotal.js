import axios from 'axios';
import React from 'react';
import Chart from 'chart.js/auto';

/**
 * @author Shantanu Thorat
 * Creates a page that displays the daily sales data.
 * @class
 */
class DailySalesTotal extends React.Component {

    // Constructor 
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            DataisLoaded: false
        };
        this.barchart = null; 
    }

    // ComponentDidMount is used to
    // execute the code 
    componentDidMount() {
        axios.get("http://localhost:8000/daily_sales_total/")
            .then(res => {
                const res_data = res.data;
                this.setState({ items: res_data, DataisLoaded: true });
            })

    }
    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) {
            return (<div>
                <h1> Loading available sales data </h1> <canvas id="dailysalestotal">

                </canvas></div>);
        }
        else {
            if(this.barchart != null)
            {
                this.barchart.destroy();
            }
            this.barchart = new Chart(
                document.getElementById('dailysalestotal'),
                {
                  type: 'line',
                  data: {
                    labels: items.map(item => item.order_date),
                    datasets: [
                      {
                        label: 'Daily Sales Total ($)',
                        data: items.map(item => item.sales_total)
                      }
                    ]
                  }
                }
              );

            return (<div>
                <canvas id="dailysalestotal">

                </canvas></div>
            );
        }
    }
}

export default DailySalesTotal;
