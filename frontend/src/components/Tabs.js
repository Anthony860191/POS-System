import * as React from 'react';
import { useEffect, useState } from "react";
import "./Tabs.css";
import Popup from './Popup';
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from  "@mui/material/Alert";
import ButtonGroup from '@mui/material/ButtonGroup';

function Tabs() {
    const [toggleState, setToggleState] = useState(1); // function to switch between tabs
    const [paymentPopup, setPaymentPopup]= useState(false); // function to open the payment popup
    const [name, setName] = useState(""); // function to set the customers name
    const [open, setOpen] = useState(false); // condition to show pizza added snackbar

    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    
    const toggleTab = (index) => {
            setToggleState(index);
    };
    
    const crustHandleClick = () => {
        alert("Selected Crust");
    };

    const sauceHandleClick = () => {
      alert("Selected Sauce");
    };

    const cheeseHandleClick = () => {
      alert("Selected Cheese");
    };

    const toppingHandleClick = () => {
      alert("Selected Toppings");
    };

    const drizzleHandleClick = () => {
      alert("Selected Drizzle");
    };

    return (
      <div className="container">
            <div className="bloc-tabs">
        <button
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
        >
            Crust
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
            Sauce
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
            Cheese
        </button>
        <button
          className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(4)}
        >
            Toppings
        </button>
        <button
          className={toggleState === 5 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(5)}
        >
            Drizzle
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <h2>Select your Crust</h2>
          <hr />
          <Button disableRipple variant="contained" sx= {{m: 1}} className="ingredientButton" onClick={crustHandleClick}>Cauliflower</Button>
          <Button disableRipple variant="contained" sx= {{m: 1}} className="ingredientButton" onClick={crustHandleClick}>Regular</Button>

        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h2>Select your Sauce</h2>
          <hr />
          <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={sauceHandleClick}>Zesty Red</Button>
          <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={sauceHandleClick}>Alfredo</Button>
          <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={sauceHandleClick}>Traditional Pizza Sauce</Button>
          <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={sauceHandleClick}>No Sauce</Button>
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <h2>Select your Cheese</h2>
          <hr />
          <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={cheeseHandleClick}>Houseblend</Button>
          <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={cheeseHandleClick}>Parmesan</Button>
        </div>
        <div
          className={toggleState === 4 ? "content  active-content" : "content"}
        >
          <h2>Select your Topping(s)</h2>
          <hr />
          <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={toppingHandleClick}>Pepperoni</Button>
          <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={toppingHandleClick}>Banana Peppers</Button>
          <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={toppingHandleClick}>Black Forest Ham</Button>
          <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={toppingHandleClick}>Black Olives</Button>
          <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={toppingHandleClick}>Broccoli</Button>
          <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={toppingHandleClick}>Green Peppers</Button>
          <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={toppingHandleClick}>Italian Sausage</Button>
          <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={toppingHandleClick}>Jalapenos</Button>
          <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={toppingHandleClick}>Meatballs</Button>
          <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={toppingHandleClick}>Mushrooms</Button>
          <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={toppingHandleClick}>Pineapple</Button>
          <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={toppingHandleClick}>Red Onions</Button>
          <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={toppingHandleClick}>Roasted Garlic</Button>
          <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={toppingHandleClick}>Smoked Chicken</Button>
          <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={toppingHandleClick}>Spinach</Button>
          <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={toppingHandleClick}>Tomatoes</Button>
        </div>
        <div
          className={toggleState === 5 ? "content  active-content" : "content"}
        >
          <h2>Select your Drizzle</h2>
          <hr />
          <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={drizzleHandleClick}>BBQ Sauce</Button>
          <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={drizzleHandleClick}>Ranch</Button>
          <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={drizzleHandleClick}>Balsamic Glaze</Button>
          <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={drizzleHandleClick}>Sriracha</Button>
          <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={drizzleHandleClick}>Olive Oil</Button>
          <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={drizzleHandleClick}>Oregano</Button>
          <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={drizzleHandleClick}>No Drizzle</Button>

        </div>
      </div>
      <ButtonGroup size = "large" sx = {{m:1}}>
        <Button variant="contained" color = "success" onClick={handleClick}>Add Pizza</Button>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%'}}>
            Pizza Added
          </Alert>
        </Snackbar>
        <Button variant="contained" color = "success" onClick={() => setPaymentPopup(true)}>Complete Order</Button>
        <Button variant="contained" color = "error">Cancel Order</Button>
      </ButtonGroup>
      <Popup trigger = {paymentPopup} setTrigger = {setPaymentPopup}>
          <h3>Complete Order</h3>
          <TextField 
            sx = {{mt: 2,  mb: 2}}
            id = "nameField"
            value = {name}
            label = "Enter your name"
            onChange = {(e) => {
              setName(e.target.value);
            }}
          />
          <h3>Total Price: $0.00</h3>
          <Button variant="contained" sx= {{m: 1}}> Credit Card</Button> 
          <Button variant="contained" sx= {{m: 1}}> Debit Card</Button>
          <Button variant="contained" sx= {{m: 1}}> Meal Swipes</Button>
      </Popup>
    </div>
  );
}

export default Tabs;