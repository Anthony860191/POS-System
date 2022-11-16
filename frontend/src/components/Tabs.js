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
    const [pizzaNotifaction, setPizzaNotification] = useState(false); // condition to show pizza added snackbar
    const [toppingNotification, setToppingNotification] = useState(false); // condition to show max number of toppings added snackbar
    const [ingredients, setIngredients] = useState([]); // variable to store the ingredients fetched from the database
    const [menuItems, setMenuItems] = useState([]); // variable to store the the menu items available
    const [maxToppings, setMaxToppings] = useState(4);
    const [currToppings, setCurrToppings] = useState(0);
    
    
    useEffect(() => {
      Promise.all([
        fetch("http://127.0.0.1:8000/menu/"),
        fetch("http://127.0.0.1:8000/ingredients/")
      ])
        .then(([resMenu, resIngr]) =>
          Promise.all([resMenu.json(), resIngr.json()])
        )
        .then(([dataMenu, dataIngr]) => {
          setMenuItems(dataMenu);
          setIngredients(dataIngr);
      })
      
    },[]);

    // variables to store the different ingredients types
    const crust = [];
    const sauce = [];
    const cheese = [];
    const toppings = [];
    const drizzle = [];

    // get the different types of customization options
    for(let i = 0; i < ingredients.length; i++) {
      if (ingredients[i].ingr_type === "CRUST") {
        crust.push(ingredients[i].ingredient_name);
      } else if (ingredients[i].ingr_type === "SAUCE") {
        sauce.push(ingredients[i].ingredient_name);
      } else if (ingredients[i].ingr_type === "CHEESE") {
        cheese.push(ingredients[i].ingredient_name);
      } else if (ingredients[i].ingr_type === "VEGGIES" || ingredients[i].ingr_type === "MEAT") {
        toppings.push(ingredients[i].ingredient_name);
      } else if (ingredients[i].ingr_type === "DRIZZLE") {
        drizzle.push(ingredients[i].ingredient_name);
      }
    }

    // variables to store the different pizza menu items
    const basePizzas = [];
    const presetPizzas = [];

    for(let i = 0; i < menuItems.length; i++) {
      if(menuItems[i].item_type === "BASE_PIZZA") {
        basePizzas.push(menuItems[i].menu_item); 
      } else if (menuItems[i].item_type === "PRESET_PIZZA") {
        presetPizzas.push(menuItems[i].menu_item)
      }
    }
  
    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClick = () => {
      setPizzaNotification(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setPizzaNotification(false);
      setToppingNotification(false);
    };
    
    const toggleTab = (index) => {
      setToggleState(index);
    };
    
    // variable to store the current pizza order information
    const [currentOrder, setCurrentorder] = useState(Array(9).fill(""));

    const customPizzaClick = (pizzaType) => {
      currentOrder[0] = pizzaType;
      currentOrder[4] = "";
      currentOrder[5] = "";
      currentOrder[6] = "";
      currentOrder[7] = "";
      if(pizzaType === "1 TOPPING") {
        setMaxToppings(1);
        setCurrToppings(0);
      } else {
        setMaxToppings(4);
        setCurrToppings(0);
      }
      setToggleState(2);
    }

    const presetPizzaClick = (pizzaType) => {
      currentOrder[0] = pizzaType;
      
    }

    const crustHandleClick = (crustType) => {
      currentOrder[1] = crustType;
    };

    const sauceHandleClick = (sauceType) => {
      currentOrder[2] = sauceType;
    };

    const cheeseHandleClick = (cheeseType) => {
      currentOrder[3] = cheeseType;
    };

    const toppingHandleClick = (toppingType) => {
      if(currToppings < maxToppings) {
        currentOrder[4+currToppings] = toppingType;
        setCurrToppings(currToppings+1);
        
      } else {
        setToppingNotification(true); 
      }
      alert(currentOrder);
    };

    const drizzleHandleClick = (drizzleType) => {
      currentOrder[8] = drizzleType;
    };

    const customize = [];
    customize.push (
      <div className="container">
        <div className="bloc-tabs">
        <button
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
        >
            Pizza Type
        </button>
        <button
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
        >
            Crust
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
            Sauce
        </button>
        <button
          className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(4)}
        >
            Cheese
        </button>
        <button
          className={toggleState === 5 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(5)}
        >
            Toppings
        </button>
        <button
          className={toggleState === 6 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(6)}
        >
            Drizzle
        </button>
      </div>

      <div className="content-tabs">
      <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <h2>Select your Pizza</h2>
          <hr />
          {basePizzas && basePizzas.map (itemName => (
            <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={() => customPizzaClick(itemName)} >{itemName}</Button>
          ))}
          {presetPizzas && presetPizzas.map (itemName => (
            <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={() => presetPizzaClick(itemName)} >{itemName}</Button>
          ))}
        </div>
        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h2>Select your Crust</h2>
          <hr />
          {crust && crust.map (itemName => (
            <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={() => crustHandleClick(itemName)} >{itemName}</Button>
          ))}
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <h2>Select your Sauce</h2>
          <hr />
          {sauce && sauce.map (itemName => (
            <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={() => sauceHandleClick(itemName)} >{itemName}</Button>
          ))}
        </div>

        <div
          className={toggleState === 4 ? "content  active-content" : "content"}
        >
          <h2>Select your Cheese</h2>
          <hr />
          {cheese && cheese.map (itemName => (
            <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={() => cheeseHandleClick(itemName)} >{itemName}</Button>
          ))}
        </div>
        <div
          className={toggleState === 5 ? "content  active-content" : "content"}
        >
          <h2>Select your Topping(s)</h2>
          <hr />
          {toppings && toppings.map (itemName => (
            <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={() => toppingHandleClick(itemName)} >{itemName}</Button>
          ))}
          <Snackbar open={toppingNotification} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info" sx={{ width: '100%'}}>
              Can't Select More Toppings
            </Alert>
          </Snackbar>
        </div>
        <div
          className={toggleState === 6 ? "content  active-content" : "content"}
        >
          <h2>Select your Drizzle</h2>
          <hr />
          {drizzle && drizzle.map (itemName => (
            <Button disableRipple variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={() => drizzleHandleClick(itemName)} >{itemName}</Button>
          ))}
        </div>
      </div>
      <ButtonGroup size = "large" sx = {{m:1}}>
        <Button variant="contained" color = "success" onClick={handleClick}>Add Pizza</Button>
        <Snackbar open={pizzaNotifaction} autoHideDuration={3000} onClose={handleClose}>
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
          <h3>Total Price: $8.99</h3>
          <div>
            <Button variant="contained" sx= {{m: 1}}> Credit Card</Button> 
            <Button variant="contained" sx= {{m: 1}}> Debit Card</Button>
            <Button variant="contained" sx= {{m: 1}}> Meal Swipes</Button>
          </div>
          <Button variant="contained" color = "success" sx= {{m: 1}}> Place Order</Button>
      </Popup>
    </div>
  );

  return (
    <div>
      {customize}
    </div>
  )
}

export default Tabs;