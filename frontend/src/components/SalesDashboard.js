import axios from 'axios';
import React from 'react';
import Chart from 'chart.js/auto';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid } from '@mui/x-data-grid';
import { Translate } from 'react-auto-translate';

/**
 * SalesDashboard Component in charge of displaying inventory and sales data.
 */
class SalesDashboard extends React.Component {

    // Constructor 
    /**
     * Default constructor for sales dashboard. 
     * @param {*} props Any property values to pass into parent. 
     * @param {string} lang Language code to use for Google Translate. Defaults to "en". 
     */
    constructor(props, lang="en") {
        super(props);
        this.lang = lang; 
        this.state = {
            dailySales: [],
            loadedDailyData: false,
            value: "2022-1-1",
            ingrReport: [],
            startDate: "2022-9-1",
            endDate: "2022-9-9",
        };
        this.dailySalesLineChart = null;
        this.handleChange = this.handleChange.bind(this);
        this.updateEndDate = this.updateEndDate.bind(this);
        this.updateStartDate = this.updateStartDate.bind(this);
        
         this.excessColumns = [
            { field: 'ingr_name', headerName: <Translate>Ingredient</Translate>, minWidth: 200, flex: 1, align: 'center', headerAlign: 'center', renderCell: (params) =>{return <Translate> {params.value}</Translate>;}},
            { field: 'stock', headerName: <Translate>Current Stock Used</Translate>, minWidth: 200, flex: 1, align: 'center', headerAlign: 'center', },
            { field: 'percentage_used', headerName: <Translate>% Used</Translate>, minWidth: 200, flex: 1, align: 'center', headerAlign: 'center', },
        
        ]

    }
    /**
     * Updates date for excess report. 
     * @param {string} newValue 
     * New value of string to use
     */
    handleChange(newValue) {
        this.setState({ value: newValue }, this.getIngredientReport);
    }
    /**
     * Gets daily sales data from startDate and endDate.
     * @returns void
     */
    getDailySalesData() {
        const { startDate, endDate } = this.state;
        if (startDate.length === 0 || endDate.length === 0) {
            return;
        }
        //  console.log("In here: ", `http://localhost:8000/ingredient_excess_report/?date=${value}`);
        axios.get(`http://localhost:8000/daily_sales_total/?start_date=${startDate}&end_date=${endDate}`)
            .then(res => {
                const res_data = res.data;
                this.setState({ dailySales: res_data, loadedDailyData: true });
            })
    }
    /**
     * Update start date for daily sales data range.
     * @param {string} newValue new valid date
     */
    updateStartDate(newValue) {
        this.setState({ startDate: newValue }, this.getDailySalesData);
    }

    /**
     * Updates end date for daily sales data range. 
     * @param {string} newValue new end date
     */
    updateEndDate(newValue) {
        console.log(newValue);
        this.setState({ endDate: newValue}, this.getDailySalesData);
    }

    /**
     * Sets excess report data for ingredients. 
     */
    getIngredientReport() {
        const { value } = this.state;
        //  console.log("In here: ", `http://localhost:8000/ingredient_excess_report/?date=${value}`);
        axios.get(`http://localhost:8000/ingredient_excess_report/?date=${value}`)
            .then(res => {
                const res_data = res.data;
                this.setState({ ingrReport: res_data, loadedDailyData: true });
            })

    }
   
    /**
     * Gets individual rows for excess report. 
     * @param {array} data 
     * @returns array of JSON objects
     */

    getIngredientReportRows(data) {

        let rows = [];
        for (var i = 0; i < data.length; i++) {
 
            let row = { id: i, ingr_name: data[i]['ingr_name'], stock: data[i]["stock"], percentage_used: data[i]["percentage_used"] }
            rows.push(row);
         
        }
        return rows;
    }
    // ComponentDidMount is used to
    // execute the code 
    /**
     * Sets up default page.
     */
    componentDidMount() {
        /*
        axios.get("http://localhost:8000/daily_sales_total/")
            .then(res => {
                const res_data = res.data;
                this.setState({ dailySales: res_data, loadedDailyData: true });
            })*/
        this.getDailySalesData();
        this.getIngredientReport();

    }
    /**
     * Returns HTML code to be rendered for sales dashboard. 
     * @returns
     */
    render() {
        const { dailySales, loadedDailyData, value, ingrReport, startDate, endDate } = this.state;
        if (!loadedDailyData) {
            return (<div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        label="Start Date"
                        inputFormat="YYYY-MM-DD"
                        value={startDate}
                        defaultValue={'2022-01-01'}
                        onChange={this.updateStartDate}
                        renderInput={(params) => <TextField {...params} />}
                    /> </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        label="End Date"
                        inputFormat="YYYY-MM-DD"
                        value={endDate}
                        defaultValue={'2022-01-01'}
                        onChange={this.updateEndDate}
                        renderInput={(params) => <TextField {...params} />}
                    /> </LocalizationProvider>

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
                    <DataGrid columns={this.excessColumns} rows={[]}></DataGrid>
                </div>
            </div>);
        }
        else {
            if (this.dailySalesLineChart != null) {
                this.dailySalesLineChart.destroy();
            }
            
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
                 
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        label="Start Date"
                        inputFormat="YYYY-MM-DD"
                        value={startDate}
                        defaultValue={'2022-01-01'}
                        onChange={this.updateStartDate}
                        renderInput={(params) => <TextField {...params} />}
                    /> </LocalizationProvider>
             
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        label="End Date"
                        inputFormat="YYYY-MM-DD"
                        value={endDate}
                        defaultValue={'2022-01-01'}
                        onChange={this.updateEndDate}
                        renderInput={(params) => <TextField {...params} />}
                    /> </LocalizationProvider>
                <canvas id="dailysalestotal" height={"50%"}>

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

                    <DataGrid columns={this.excessColumns} rows={excessRows}></DataGrid>
                </div>
            
            </div>


            );
        }
    }
}

export default SalesDashboard;
