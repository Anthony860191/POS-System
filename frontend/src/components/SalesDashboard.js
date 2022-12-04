import axios from 'axios';
import React from 'react';
import Chart from 'chart.js/auto';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid } from '@mui/x-data-grid';
import { Translator, Translate } from 'react-auto-translate';
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

function parseWord(word)
{
   if(word.startsWith(","))
   {
    return word.substring(1);
   }
   else
   {
    return word; 
   }
}
class SalesDashboard extends React.Component {

    // Constructor 

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
    handleChange(newValue) {
        this.setState({ value: newValue }, this.getIngredientReport);
    }

    getDailySalesData() {
        const { startDate, endDate } = this.state;
        if (startDate.length === 0 || endDate.length === 0) {
            return 0;
        }
        //  console.log("In here: ", `http://localhost:8000/ingredient_excess_report/?date=${value}`);
        axios.get(`http://localhost:8000/daily_sales_total/?start_date=${startDate}&end_date=${endDate}`)
            .then(res => {
                const res_data = res.data;
                this.setState({ dailySales: res_data, loadedDailyData: true });
            })
    }

    updateStartDate(newValue) {
        this.setState({ startDate: newValue }, this.getDailySalesData);
    }
    updateEndDate(newValue) {
        console.log(newValue);
        this.setState({ endDate: newValue}, this.getDailySalesData);
    }
    getIngredientReport() {
        const { value } = this.state;
        //  console.log("In here: ", `http://localhost:8000/ingredient_excess_report/?date=${value}`);
        axios.get(`http://localhost:8000/ingredient_excess_report/?date=${value}`)
            .then(res => {
                const res_data = res.data;
                this.setState({ ingrReport: res_data, loadedDailyData: true });
            })

    }

    translateRowElement(element)
    {
        return <div> <Translate>{element}</Translate> </div>;
    }

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
