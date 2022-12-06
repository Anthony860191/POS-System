import axios from 'axios';
import React from 'react';
import Chart from 'chart.js/auto';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { CardContent, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid } from '@mui/x-data-grid';
import { Translator, Translate } from 'react-auto-translate';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from '../Login';
import { GoogleLogout } from 'react-google-login';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import dayjs from 'dayjs';
import Chip from '@mui/material/Chip';
import CheckIcon from '@mui/icons-material/Check';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import WarningIcon from '@mui/icons-material/Warning';
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});
/**
 * 
 * @param {DataGrid} params 
 * @returns Chip Component for respective value
 */
function getChip(params) {
    let recVal = Number(params.value);
    if (recVal === 0) {
        return {
            icon: <CheckIcon style={{ fill: '#4caf50' }} />,
            label: "OK",
            style: {
                borderColor: '#4caf50'
            }
        };
    }
    if (recVal === 1) {
        return {
            icon: <AutorenewIcon style={{ fill: '#ffc107' }} />,
            label: "Restock Soon",
            style: {
                borderColor: '#ffc107'
            }
        };
    }
    if (recVal === 2) {
        return {
            icon: <WarningIcon style={{ fill: '#f44336' }} />,
            label: <Translate>Restock Immediately</Translate>,
            style: {
                borderColor: '#f44336'
            }
        };
    }

}

/**
 * 
 * @param {DataGrid} params 
 * @returns 
 */
function getIcon(params) {
    let pc = Number(params.value);
    let number = pc.toFixed(2);

    if (isNaN(number)) {
        return "N/A";
    }

    if (pc < 0) {
        return <div>{number}%<ArrowDownwardIcon style={{ fill: '#ff1744' }} /></div>;

    }
    else {

        return <div>{number}%<ArrowUpwardIcon style={{ fill: '#4caf50' }} /></div>;

    }
}


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
    constructor(props, lang = "en", theme = "dark", token = "") {
        super(props);
        this.theme = theme;
        this.lang = lang;
        this.clientId = clientId;

        if (this.theme === "dark") {
            Chart.defaults.color = "#ffffff";
        }
        else {
            Chart.defaults.color = "#000000";
        }
        let curr = new Date(); // get current date
        let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        let last = first - 7; // last day is the first day + 6
        let startDate = new Date(curr.setDate(first));
        startDate = "" + (startDate.getFullYear()) + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
        let endDate = new Date(curr.setDate(last));
        endDate = "" + (endDate.getFullYear()) + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate();
        this.state = {
            dailySales: [],
            isLogin: false,
            loadedDailyData: false,
            value: "2022-9-1",
            ingrReport: [],
            token: token,
            startDate: endDate,
            endDate: startDate,
            lastWeeksSales: 0.0,
            loadedLastWeekSales: false,
            loadedExcess: false,
            lastWeeksTotalPizzas: 0,
            loadedLastWeeksPizzas: false,
            popularPizza: ["", 0],
            loadedBreakdown: false,
            breakDownData: []
        };

        this.dailySalesLineChart = null;
        this.breakDownChart = null;
        this.handleChange = this.handleChange.bind(this);
        this.updateEndDate = this.updateEndDate.bind(this);
        this.updateStartDate = this.updateStartDate.bind(this);
        this.logout = this.logout.bind(this);
        this.excessColumns = [
            { field: 'ingr_name', headerName: <Translate>Ingredient</Translate>, minWidth: 200, flex: 1, align: 'center', headerAlign: 'center', renderCell: (params) => { return <Translate> {params.value}</Translate>; } },
            { field: 'stock', headerName: <Translate>Current Stock Used</Translate>, minWidth: 200, flex: 1, align: 'center', headerAlign: 'center', type: "number" },
            { field: 'percentage_used', headerName: <Translate>% Used</Translate>, minWidth: 200, flex: 1, align: 'center', headerAlign: 'center', type: "number" },
            { field: 'rec_amount', headerName: <Translate>Next Week's Recommendation Restock </Translate>, minWidth: 200, flex: 1, align: 'center', headerAlign: 'center', type: "number" },
            { field: 'status', headerName: <Translate> Status </Translate>, minWidth: 100, flex: 1, align: 'center', headerAlign: 'center', type: "number", renderCell: (params) => { return <Chip variant="outlined" {...getChip(params)} />; } },

        ]
        this.breakDownRows = [

            { field: 'item_type', headerName: <Translate>Item</Translate>, minWidth: 200, flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'revenue', headerName: <Translate>Revenue</Translate>, minWidth: 200, flex: 1, align: 'center', headerAlign: 'center', type: "number" },
            { field: 'percent', headerName: <Translate> % </Translate>, minWidth: 200, flex: 1, align: 'center', headerAlign: 'center', type: "number" },

        ];
        this.dailySalesColumns = [

            { field: 'order_date', headerName: <Translate>Date</Translate>, minWidth: 200, flex: 1, align: 'center', headerAlign: 'center' },
            { field: 'sales_total', headerName: <Translate>Revenue</Translate>, minWidth: 200, flex: 1, align: 'center', headerAlign: 'center', type: "number" },
            { field: 'percent_change', headerName: <Translate>Daily Percent Change</Translate>, minWidth: 200, flex: 1, align: 'center', headerAlign: 'center', type: "number", renderCell: (params) => { return getIcon(params); } },

        ];

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
     * Gets Daily Sales rows.  
     */
    getDailySalesRows() {
        const { dailySales } = this.state;
        let rows = [];
        for (var i = 0; i < dailySales.length; i++) {
            let percentChange = NaN;
            if (i !== 0) {
                percentChange = (dailySales[i]["sales_total"] - dailySales[i - 1]["sales_total"]) / dailySales[i - 1]["sales_total"] * 100.0;
            }
            // console.log(dailySales[i]);
            let row = { id: i, order_date: dailySales[i]["order_date"], sales_total: dailySales[i]["sales_total"], percent_change: percentChange };
            rows.push(row);

        }
        return rows;
    }
    /**
     * Logout function
     */
    logout() {

        this.setState({ isLogin: false, token: '' });
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
                this.setState({ dailySales: res_data, loadedExcess: true });
            })
    }
    /**
     * Helper function to standardize large numbers. 
     * @param {any} x numerical to convert to string 
     * @returns comma separated value
     */
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    /**
     * Sets breakdown data. 
     */
    setSalesBreakdownData() {
        const { startDate, endDate } = this.state;
        axios.get(`http://localhost:8000/sales_breakdown/?start_date=${startDate}&end_date=${endDate}`)
            .then(res => {
                const res_data = res.data;
                this.setState({ breakDownData: res_data, loadedBreakdown: true });
            })
    }

    /**
     * Sets last weeks pizza counts. 
     */
    setLastWeeksPizzaCounts() {
        axios.get(`http://localhost:8000/pizza_counts/`)
            .then(res => {
                const res_data = res.data;
                let totalCounts = 0;
                let popPizza = "";
                let maxCount = 0;
                for (var i = 0; i < res_data.length; i++) {
                    totalCounts += res_data[i]["amount_purchased"];
                    if (res_data[i]["amount_purchased"] > maxCount) {
                        popPizza = res_data[i]["pizza_type"];
                        maxCount = res_data[i]["amount_purchased"]
                    }
                }
                this.setState({ lastWeeksTotalPizzas: this.numberWithCommas(totalCounts), popularPizza: [popPizza, maxCount], loadedLastWeeksPizzas: true });
            })
    }
    /**
     * sets LastWeeksSales from API.
     */
    setLastWeeksSales() {
        axios.get(`http://localhost:8000/last_week_sales/`)
            .then(res => {
                const res_data = res.data;
                this.setState({ lastWeeksSales: this.numberWithCommas(res_data["last_week_total"]), loadedLastWeekSales: true });
            })
    }
    /**
     * Update start date for daily sales data range.
     * @param {string} newValue new valid date
     */
    updateStartDate(newValue) {
        this.setState({ startDate: newValue }, this.getDailySalesData);
    }
    getTheme() {
        if (this.theme === "light") {
            return lightTheme;
        }
        return darkTheme;
    }
    /**
     * Updates end date for daily sales data range. 
     * @param {string} newValue new end date
     */
    updateEndDate(newValue) {
       
        this.setState({ endDate: newValue }, this.getDailySalesData);
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

    getIngredientReportRows(data, dateParam) {

        let rows = [];
        for (var i = 0; i < data.length; i++) {
            let amountUsedSoFar = data[i]["stock"] / 7.0;
            let d1 = dayjs(dateParam);
            let d2 = dayjs();
            let dayDiff = d2.diff(d1, 'day');
         
            let dailyUsage = amountUsedSoFar / dayDiff;
            let targetAmount = dailyUsage * 7;
            let iStatus = 0;

            let recAmount = 0;
            console.log(targetAmount, data[i]["amount_now"], data[i]["ingr_name"]);
            if (data[i]["amount_now"] === 0) {
                recAmount = targetAmount;
            }
            else if (targetAmount >= data[i]["amount_now"]) {
                recAmount = targetAmount - data[i]["amount_now"];
                iStatus = 2;

            }
            else if ((data[i]["amount_now"] - targetAmount) / data[i]["amount_now"] * 100 <= 10) {
                recAmount = (data[i]["amount_now"] - targetAmount) * 1.2;
                iStatus = 1;
            }
            console.log(recAmount);
            let row = { id: i, ingr_name: data[i]['ingr_name'], stock: data[i]["stock"], percentage_used: data[i]["percentage_used"], rec_amount: recAmount, status: iStatus };
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
        this.setLastWeeksSales();
        this.setLastWeeksPizzaCounts();
        this.setSalesBreakdownData();

    }
    /**
     * Helper function that gets sales data formatted nicely. 
     * @param {JSON} responseData 
     * @returns data for pie chart
     */
    getSalesBreakdownData(responseData) {
        let keys = [];
        let labelID = "";
        let salesData = [];

        for (var i = 0; i < responseData.length; i++) {
            let item_type = responseData[i]["crusttype"] + " " + responseData[i]["pizzatype"];

            keys.push(item_type);
            salesData.push(responseData[i]["salescost"]);
        }
        return { labels: keys, datasets: [{ label: labelID, data: salesData }] };

    }

    getSalesBreakdownRows(responseData) {
        let rows = [];
        let totalSales = 0; 
        for (var i = 0; i < responseData.length; i++) {
           
             totalSales += Number(responseData[i]["salescost"]);
           
        }
      
        for (i = 0; i < responseData.length; i++) {
            let item_type = responseData[i]["crusttype"] + " " + responseData[i]["pizzatype"];
            let sales = responseData[i]["salescost"];
            let pc = (sales/totalSales * 100).toFixed(2); 
            
            let row = {id: i, item_type:item_type, revenue: responseData[i]["salescost"],percent:pc};
           rows.push(row);
        }
       return rows; 

    }
    getOptions() {
        if (this.theme === "dark") {
            return {
                scales: {
                    y: {
                        grid: {
                            color: 'white'
                        }
                    },
                    x: {
                        grid: {
                            color: 'white'
                        }
                    }
                }
            };
        }
        return {};
    }
    /**
     * Returns HTML code to be rendered for sales dashboard. 
     * @returns HTML code to be rendered for sales dashboard
     */
    render() {
        let selectTheme = this.getTheme();
        let graphOptions = this.getOptions();

        const { loadedExcess, isLogin, breakDownData, loadedBreakdown, popularPizza, loadedLastWeeksPizzas, lastWeeksTotalPizzas, dailySales, loadedDailyData, value, ingrReport, startDate, endDate, loadedLastWeekSales, lastWeeksSales } = this.state;
        if (!isLogin) {
            return (
                <>
                    <Login lang={this.lang} setToken={(newToken) => this.setState({ token: newToken, isLogin: true })} />
                    <canvas id="dailysalestotal" height={"50%"} >

                    </canvas>

                    <canvas id="breakdownchart" height={"50%"}>

                    </canvas>
                </>
            );
        }
        if (!(loadedDailyData && loadedLastWeekSales && loadedLastWeeksPizzas && loadedBreakdown && loadedExcess)) {
            return (
                <div className="Logout">
                    <center>
                        <GoogleLogout
                            clientId={clientId}
                            onLogoutSuccess={this.logout}
                        >
                            <Translate>Logout</Translate>
                        </GoogleLogout>
                    </center>
                    <div>  <ThemeProvider theme={darkTheme}>Loading Sales Dashboard...

                        <canvas id="dailysalestotal" height={"50%"}>

                        </canvas>

                        <canvas id="breakdownchart" height={"50%"}>

                        </canvas></ThemeProvider>
                    </div> </div>)
        }
        else {
            if (this.dailySalesLineChart != null) {
                this.dailySalesLineChart.destroy();
            }

            if (this.breakDownChart != null) {
                this.breakDownChart.destroy();
            }

            let excessRows = this.getIngredientReportRows(ingrReport, value);
            let breakPie = this.getSalesBreakdownData(breakDownData);
            let breakdownRows = this.getSalesBreakdownRows(breakDownData);
            this.breakDownChart = new Chart(
                document.getElementById("breakdownchart"),
                {
                    type: 'pie',
                    data: breakPie,
                    options: { responsive: true }
                },
            );
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
                    },
                    options:
                        graphOptions
                }
            );
            let dailyRows = this.getDailySalesRows();

            return (<div>




                <ThemeProvider theme={selectTheme}>
                    <CssBaseline />
                    <br></br>

                    <h1 style={{ textAlign: "center" }}><Translate>Weekly Summary</Translate></h1>
                    <div>
                        <Grid
                            container
                            spacing={20}
                            direction="column"
                            alignItems="center"
                            justify="center"
                            justifyContent="center"


                        >
                            <Grid item xs={3}>
                                <Card sx={{ minWidth: 275, display: "inline-block" }}>
                                    <CardContent>
                                        <div align="center">
                                            <Typography sx={{ fontSize: 25 }} gutterBottom>
                                                <Translate> Last 7 Days of Revenue </Translate>
                                            </Typography>
                                            <Typography sx={{ fontSize: 40 }} gutterBottom>
                                                ${lastWeeksSales}
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card sx={{ minWidth: 275, display: "inline-block" }}>

                                    <CardContent>
                                        <div align="center">
                                            <Typography sx={{ fontSize: 25 }} gutterBottom>
                                                <Translate> Number of Pizzas Sold Since Last Week </Translate>
                                            </Typography>
                                            <Typography sx={{ fontSize: 40 }} gutterBottom>
                                                {lastWeeksTotalPizzas}
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card sx={{ minWidth: 275, display: "inline-block", margin: "auto" }}>
                                    <CardContent>
                                        <div align="center">
                                            <Typography sx={{ fontSize: 25 }} gutterBottom>
                                                <Translate>   Most Popular Pizza  </Translate>
                                            </Typography>
                                            <Typography sx={{ fontSize: 40 }} gutterBottom>
                                                <Translate> {popularPizza[0]} </Translate>
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid></Grid>
                    </div>
                    <br></br>
                    <h1 style={{ textAlign: "center" }}> <Translate>Daily Sales Tracker</Translate></h1>
                    <br></br>
                    <h2><Translate>Daily Sales Over Time</Translate></h2>
                    <div style={{ justify: 'center', justifyContent: 'center', justifyItems: 'center' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Start Date"
                                inputFormat="YYYY-MM-DD"
                                value={startDate}
                                defaultValue={'2022-01-01'}
                                onChange={this.updateStartDate}
                                renderInput={(params) => <TextField {...params}
                                />}
                            /> </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="End Date"
                                inputFormat="YYYY-MM-DD"
                                value={endDate}
                                defaultValue={'2022-01-01'}
                                onChange={this.updateEndDate}
                                renderInput={(params) => <TextField {...params}
                                />}
                            /> </LocalizationProvider>
                    </div>
                    <div style={{ marginTop: '50px', marginLeft: '50px', marginRight: '50px', marginBottom: '50px' }}>
                        <canvas id="dailysalestotal" height={"50%"}>

                        </canvas>
                    </div>
                    <div style={{ height: 400, width: '100%' }}>

                        <DataGrid columns={this.dailySalesColumns} rows={dailyRows}></DataGrid>
                    </div>


                    <h2><Translate>Breakdown By Item</Translate></h2>
                    <div style={{ width: '25%', margin: 'auto' }}>
                        <canvas id="breakdownchart" height={"25%"} width={"25%"}>   </canvas>
                    </div>
                    <br></br>
                    <div style={{ height: 400, width: '100%' }}>

                        <DataGrid columns={this.breakDownRows} rows={breakdownRows}></DataGrid></div>
                        <br></br>
                    <h1 style={{ textAlign: "center" }}><Translate>Ingredient Tracker</Translate></h1>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>


                        <DesktopDatePicker
                            label={<Translate>View Ingredient Usage Since</Translate>}
                            inputFormat="YYYY-MM-DD"
                            value={value}
                            defaultValue={'2022-01-01'}
                            onChange={this.handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        /> </LocalizationProvider>
                    <div style={{ height: 400, width: '100%' }}>

                        <DataGrid initialState={{
                            sorting: {
                                sortModel: [{ field: 'status', sort: 'desc' }],
                            },
                        }} columns={this.excessColumns} rows={excessRows}></DataGrid>
                    </div>
                    <center>
                        <div class="Logout">
                            <GoogleLogout
                                clientId={clientId}
                                onLogoutSuccess={this.logout}>
                                <Translate> Logout</Translate>
                            </GoogleLogout>
                        </div>
                    </center>
                </ThemeProvider>

            </div>


            );
        }
    }
}

export default SalesDashboard;
