import axios from 'axios';
import React from 'react';
import Chart from 'chart.js/auto';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid } from '@mui/x-data-grid';
const excessColumns = [
    {field: 'ingr_name', headerName:'Ingredient', minWidth:200, flex: 1,  align:'center',headerAlign: 'center',},
    {field: 'stock', headerName:'Current Stock Used', minWidth:200, flex: 1,  align:'center',headerAlign: 'center',},
    {field: 'percentage_used', headerName:'% Used', minWidth:200, flex: 1, align:'center',headerAlign: 'center',},

]
class SalesDashboard extends React.Component {

    // Constructor 

    constructor(props) {
        super(props);
        this.state = {
            dailySales: [],
            loadedDailyData: false,
            value:"2022-1-1",
            ingrReport: []
        };
        this.dailySalesLineChart = null;
        this.handleChange = this.handleChange.bind(this);
     
        
    }
    handleChange(newValue) {
        this.setState({value: newValue}, this.getIngredientReport);
    };
    getIngredientReport()
    {
        const { value } = this.state;
      //  console.log("In here: ", `http://localhost:8000/ingredient_excess_report/?date=${value}`);
        axios.get(`http://localhost:8000/ingredient_excess_report/?date=${value}`)
            .then(res => {
                const res_data = res.data;
                this.setState({ ingrReport: res_data, loadedDailyData: true });
        })
        
    }

    getIngredientReportRows(data)
    {

        let rows = [];
        for(var i = 0; i < data.length; i++)
        {
            let row = {id:i, ingr_name: data[i]['ingr_name'], stock:data[i]["stock"], percentage_used:data[i]["percentage_used"]}
            rows.push(row);
        }
        return rows; 
    }
    // ComponentDidMount is used to
    // execute the code 
    componentDidMount() {
        axios.get("http://localhost:8000/daily_sales_total/")
            .then(res => {
                const res_data = res.data;
                this.setState({ dailySales: res_data, loadedDailyData: true });
            })
        this.getIngredientReport();

    }
    render() {
        const { dailySales, loadedDailyData, value, ingrReport } = this.state;
        if (!loadedDailyData) {
            return (<div>
                <h1> Loading available sales data </h1> <canvas id="dailysalestotal"> </canvas>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
          label="View Ingredient Usage Since"
          inputFormat="YYYY-MM-DD"
          value={value}
          defaultValue={'2022-01-01'}
          onChange={this.handleChange}
          renderInput={(params) => <TextField {...params} />}
        /> </LocalizationProvider>
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid columns={excessColumns} rows={[]}></DataGrid>
        </div>
               </div>);
        }
        else {
            if (this.dailySalesLineChart != null) {
                this.dailySalesLineChart.destroy();
            }
            console.log(value);
            let excessRows = this.getIngredientReportRows(ingrReport);
            this.dailySalesLineChart = new Chart(
                document.getElementById('dailysalestotal'),
                {
                    type: 'line',
                    data: {
                        labels: dailySales.map(item => item.order_date),
                        datasets: [
                            {
                                label: 'Daily Sales Total ($)',
                                data: dailySales.map(item => item.sales_total)
                            }
                        ]
                    }
                }
            );

            return (<div>
                <canvas id="dailysalestotal">

                </canvas>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
          label="View Ingredient Usage Since"
          inputFormat="YYYY-MM-DD"
          value={value}
          defaultValue={'2022-01-01'}
          onChange={this.handleChange}
          renderInput={(params) => <TextField {...params} />}
        /> </LocalizationProvider>
          <div style={{ height: 400, width: '100%' }}>
         
         <DataGrid columns={excessColumns} rows={excessRows}></DataGrid>
         </div>

                </div>

                
            );
        }
    }
}

export default SalesDashboard;
