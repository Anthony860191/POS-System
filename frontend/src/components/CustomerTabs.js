import * as React from 'react';
import { useEffect, useState } from "react";
import "./CustomerTabs.css";
import Popup from './Popup';
import {TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ButtonGroup from '@mui/material/ButtonGroup';
import { Translator, Translate } from 'react-auto-translate';
import MuiToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {styled, createTheme} from "@mui/material/styles";
import DeleteIcon from '@mui/icons-material/Delete';
import {green} from '@mui/material/colors';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const ToggleButton = styled(MuiToggleButton) ({
  paddingTop: "50px",
  paddingBottom: "50px",
  color: "black",
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: "#1976d2",
  }
})

const StyledToggleButtonGroup = styled(ToggleButtonGroup) (({theme}) => ({
  variant: "outlined",
  display: "grid",
  gridTemplateColumns: "auto auto auto auto",
  gridGap: "10px",
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    '&:not(:first-of-type)': {
      borderLeft: `1.5px solid ${theme.palette.action.selected}`,
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    }
  },
}));

const successButtons = createTheme({
  palette: {
    primary: {
      main: green[600],
      contrastText: "#ffffff"
    },
  },
});

/**
 * @author Anthony Mercado
 * Creates a page that controls all the tabs and components for the customer's view
 * @param {json} param0
 * @param {string} mode - The toggle for dark / light mode.
 * @returns {document} CustomerTabs
 */
function CustomerTabs({ lang, mode }) {
    const dark = mode;
    const [toggleState, setToggleState] = useState(1); // function to switch between tabs
    const [paymentPopup, setPaymentPopup]= useState(false); // function to open the payment popup
    const [name, setName] = useState(""); // function to set the customers name
    const [paymentType, setPaymentType] = useState(""); // variable and function to store the payment type
    const [pizzaNotifaction, setPizzaNotification] = useState(false); // condition to show pizza added snackbar
    const [cancelNotification, setCancelNotification] = useState(false); // condition to show order canceled snackbar
    const [completeNotifcation, setCompleteNotification] = useState(false); // condition to show order completed snackbar
    const [toppingNotification, setToppingNotification] = useState(false); // condition to show max number of toppings added snackbar
    const [ingredients, setIngredients] = useState([]); // variable to store the ingredients fetched from the database
    const [menuItems, setMenuItems] = useState([]); // variable to store the the menu items available
    const [maxToppings, setMaxToppings] = useState(0);
    const url = 'http://localhost:8000/api/';
    
    useEffect(() => {
      Promise.all([
        fetch(`${url}menu/`),
        fetch(`${url}ingredients/`)
      ])
        .then(([resMenu, resIngr]) =>
          Promise.all([resMenu.json(), resIngr.json()])
        )
        .then(([dataMenu, dataIngr]) => {
          setMenuItems(dataMenu);
          setIngredients(dataIngr);
      })

  }, []);

    // variables to store the different ingredients types
    const crustOptions = [];
    const sauceOptions = [];
    const cheeseOptions = [];
    const toppingsOptions = [];
    const drizzleOptions = [];
    const drinkOptions = [];

    // get the different types of customization options
    for(let i = 0; i < ingredients.length; i++) {
      if (ingredients[i].ingr_type === "CRUST") {
        crustOptions.push(ingredients[i].ingredient_name);
      } else if (ingredients[i].ingr_type === "SAUCE") {
        sauceOptions.push(ingredients[i].ingredient_name);
      } else if (ingredients[i].ingr_type === "CHEESE") {
        cheeseOptions.push(ingredients[i].ingredient_name);
      } else if (ingredients[i].ingr_type === "VEGGIES" || ingredients[i].ingr_type === "MEAT") {
        toppingsOptions.push(ingredients[i].ingredient_name);
      } else if (ingredients[i].ingr_type === "DRIZZLE") {
        drizzleOptions.push(ingredients[i].ingredient_name);
      } else if (ingredients[i].ingr_type === "DRINK") {
        drinkOptions.push(ingredients[i].ingredient_name);
      }
    }
  

  // variables to store the different pizza menu items
  const basePizzas = [];
  const presetPizzas = [];

  for (let i = 0; i < menuItems.length; i++) {
    if (menuItems[i].item_type === "BASE_PIZZA") {
      basePizzas.push(menuItems[i].menu_item);
    } else if (menuItems[i].item_type === "PRESET_PIZZA") {
      presetPizzas.push(menuItems[i]);
    }
  }
    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
  
    // close snackbar notifications
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      
      // set all snackbars to false 
      setPizzaNotification(false);
      setToppingNotification(false);
      setCancelNotification(false);
      setCompleteNotification(false);
    };
    
    // function to change the content displayed dependent on the tab selected
    const toggleTab = (index) => {
      setToggleState(index);
    };

    const [displayPrice, setDisplayPrice] = useState(0)
    const paymentPopupHandleClick = async() => {
      console.log(sauce, crust, cheese, toppings);
      setPaymentPopup(true);
      const response = await fetch(`${url}price?pizzatype=${pizzaType}&crusttype=${crust}&drinktype=${drink}`);
      const result = await response.json();
      if(result.price != null) {
        setDisplayPrice(totalPrice + parseFloat(result.price)); // obtain the total price of the order to display it
      } else {
        setDisplayPrice(totalPrice);
      }
    };

    const cancelHandleClick = () => {
      setCancelNotification(true);
      setAllOrders([]);
      setPizzaType("");
      setCrust("");
      setSauce("");
      setCheese("");
      setToppings([]);
      setDrizzle("");
      setDrink("");
      setTotalPrice(0);
      setDisplayPrice(0);
      setName("");
    };

    const deleteByIndex = (index) => {
      var selectedPizza = JSON.parse(allOrders[index]);
      setDisplayPrice(displayPrice - selectedPizza.price);
      setTotalPrice(totalPrice - selectedPizza.price);
      setAllOrders(oldValues => {
        return oldValues.filter((_, i) => i !== index)
      })
    }

    const deleteCurrentPizza = () => {
      setDisplayPrice(totalPrice);
      setPizzaType("");
      setCrust("");
      setSauce("");
      setCheese("");
      setToppings([]);
      setDrizzle("");
      setDrink("");
    }

    let [totalPrice, setTotalPrice] = useState(0) // variable to store the total price of the order
    // function to POST order to database
    const placeOrder = async() => {
      setToggleState(1);
      setPaymentPopup(false);
      setCompleteNotification(true);
      const current = new Date();
      const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
      
      const responsePrice = await fetch(`${url}price?pizzatype=${pizzaType}&crusttype=${crust}&drinktype=${drink}`);
      const resultPrice = await responsePrice.json();
      totalPrice += parseFloat(resultPrice.price); // store the price obtained as a number in the price variable      
      
      fetch(`${url}orders/`,  {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "order_date": date, 
          "price": totalPrice,
          "payment_type": paymentType, 
          "customer_name": name
        })
      });

    const responseId = await fetch(`${url}orders/?latest=true`);
    const resultId = await responseId.json();

    if (allOrders.length > 0) {
      fetch(`${url}pizzas/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: allOrders
      });
    }
    fetch(`${url}pizzas/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "orderid": parseInt(resultId[0].id),
        "pizza_type": pizzaType === "" ? null : pizzaType,
        "cheese_type": cheese,
        "crust": crust,
        "sauce": sauce,
        "drizzle": drizzle,
        "drink": drink,
        "topping1": toppings.length < 1 ? null : toppings[0],
        "topping2": toppings.length < 2 ? null : toppings[1],
        "topping3": toppings.length < 3 ? null : toppings[2],
        "topping4": toppings.length < 4 ? null : toppings[3],
        "price": parseFloat(resultPrice.price)
      })
    });
    
    setAllOrders([]);
    setPizzaType("");
    setCrust("");
    setSauce("");
    setCheese("");
    setToppings([]);
    setDrizzle("");
    setDrink("");
    setTotalPrice(0);
    setName("");
  };

  // array to store all of the pizza orders besides the current one
  const [allOrders, setAllOrders] = useState([]);

  // notify when pizza has been added to the order
  const addPizzaHandleClick = async () => {
    if(pizzaType === "" && drink === "") {
      return;
    }
    const responsePrice = await fetch(`${url}price?pizzatype=${pizzaType}&crusttype=${crust}&drinktype=${drink}`);
    const resultPrice = await responsePrice.json();

    const responseId = await fetch(`${url}orders/?latest=true`);
    const resultId = await responseId.json();

    var pizzaOrder = {
      "orderid": 1 + parseInt(resultId[0].id),
      "pizza_type": pizzaType === "" ? null : pizzaType,
      "cheese_type": cheese,
      "crust": crust,
      "sauce": sauce,
      "drizzle": drizzle,
      "drink": drink,
      "topping1": toppings.length < 1 ? null : toppings[0],
      "topping2": toppings.length < 2 ? null : toppings[1],
      "topping3": toppings.length < 3 ? null : toppings[2],
      "topping4": toppings.length < 4 ? null : toppings[3],
      "price": parseFloat(resultPrice.price)
    }

    var jsonPizzaOrder = JSON.stringify(pizzaOrder);
    allOrders.push(jsonPizzaOrder);
    setPizzaNotification(true);
    setToggleState(1);
    setPizzaType("");
    setCrust("");
    setSauce("");
    setCheese("");
    setToppings([]);
    setDrizzle("");
    setDrink("");
    setTotalPrice(totalPrice + parseFloat(resultPrice.price));
    
  };
    const [pizzaType, setPizzaType] = React.useState("");
    const customPizzaClick = (pizza) => {
      setPizzaType(pizza);
      setCrust("");
      setSauce("");
      setCheese("");
      setToppings([]);
      setDrizzle("");
      if(pizza === "1 Topping") {
        setMaxToppings(1);
      } else {
        setMaxToppings(4);
      }
      setTimeout(() => setToggleState(2), 200);
    }

    const presetPizzaClick = (pizza) => {
      setPizzaType(pizza.menu_item);
      setCrust(pizza.default_crust);
      setSauce(pizza.sauce);
      setCheese(pizza.cheese_type);
      setToppings([pizza.topping1, pizza.topping2, pizza.topping3, pizza.topping4]);
      setDrizzle(pizza.drizzle);
    }

    // functions to store the pizza ingredient selections on button presses
    const [crust, setCrust] = React.useState("");
    const crustHandleClick = (event, crustType) => {
      setCrust(crustType);
      setTimeout(() => setToggleState(3), 200);
    };

    const [sauce, setSauce] = React.useState("");
    const sauceHandleClick = (event, sauceType) => {
      setSauce(sauceType);
      setTimeout(() => setToggleState(4), 200);
    };

    const [cheese, setCheese] = React.useState("");
    const cheeseHandleClick = (event, cheeseType) => {
      setCheese(cheeseType);
      setTimeout(() => setToggleState(5), 200);
    };

    const [toppings, setToppings] = React.useState([]);
    const toppingHandleClick = (event, toppingType) => {
      if(toppingType.length <= maxToppings) {
        setToppings(toppingType);
      } else {
        setToppingNotification(true); 
      }
    };

  const [drizzle, setDrizzle] = React.useState("");
  const drizzleHandleClick = (event, drizzleType) => {
    setDrizzle(drizzleType);
    setTimeout(() => setToggleState(7), 200);
  };

  const [drink, setDrink] = React.useState("");
  const drinkHandleClick = (event, drinkType) => {
    setDrink(drinkType);
  };

  const customizeTabs = [];
  customizeTabs.push(
    <Translator
      from='en'
      to={lang}
      googleApiKey={apiKey}
    >
      <div className={dark === 'dark' ? "container-dark" : "container"}>
        <div className="bloc-tabs">
          <button
            className={toggleState === 1 ? (dark === 'dark' ? "tabs active-tabs-dark" : "tabs active-tabs") : "tabs"} 
            id = {dark === 'dark' ? "darkButton" : ""}
            onClick={() => toggleTab(1)}
          >
            <Translate>Pizza Type</Translate>
          </button>
          <button
            className={toggleState === 2 ? (dark === 'dark' ? "tabs active-tabs-dark" : "tabs active-tabs") : "tabs"} 
            id = {dark === 'dark' ? "darkButton" : ""}
            onClick={() => toggleTab(2)}
          >
            <Translate>Crust</Translate>
          </button>
          <button
            className={toggleState === 3 ? (dark === 'dark' ? "tabs active-tabs-dark" : "tabs active-tabs") : "tabs"} 
            id = {dark === 'dark' ? "darkButton" : ""}
            onClick={() => toggleTab(3)}
          >
            <Translate>Sauce</Translate>
          </button>
          <button
            className={toggleState === 4 ? (dark === 'dark' ? "tabs active-tabs-dark" : "tabs active-tabs") : "tabs"} 
            id = {dark === 'dark' ? "darkButton" : ""}
            onClick={() => toggleTab(4)}
          >
            <Translate>Cheese</Translate>
          </button>
          <button
            className={toggleState === 5 ? (dark === 'dark' ? "tabs active-tabs-dark" : "tabs active-tabs") : "tabs"} 
            id = {dark === 'dark' ? "darkButton" : ""}
            onClick={() => toggleTab(5)}
          >
            <Translate>Toppings</Translate>
          </button>
          <button
            className={toggleState === 6 ? (dark === 'dark' ? "tabs active-tabs-dark" : "tabs active-tabs") : "tabs"} 
            id = {dark === 'dark' ? "darkButton" : ""}
            onClick={() => toggleTab(6)}
          >
            <Translate>Drizzle</Translate>
          </button>
          <button
            className={toggleState === 7 ? (dark === 'dark' ? "tabs active-tabs-dark" : "tabs active-tabs") : "tabs"} 
            id = {dark === 'dark' ? "darkButton" : ""}
            onClick={() => toggleTab(7)}
          >
            <Translate>Drink</Translate>
          </button>
        </div>

      <div className="content-tabs">
      <div
          className={toggleState === 1 ? (dark === 'dark' ? "content  active-content-dark" : "content active-content") : "content"}
        >
          <h2><Translate>Select your Pizza</Translate></h2>
          <hr />
          {basePizzas && basePizzas.map (itemName => (
            <Button variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={() => customPizzaClick(itemName)} ><Translate>{itemName}</Translate></Button>
          ))}
          {presetPizzas && presetPizzas.map (itemName => (
            <Button variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={() => presetPizzaClick(itemName)} ><Translate>{itemName.menu_item}</Translate></Button>
          ))}
        </div>
        <div
          className={toggleState === 2 ? (dark === 'dark' ? "content  active-content-dark" : "content active-content") : "content"}
        >
          <h2><Translate>Select your Crust</Translate></h2>
          <hr />
          <StyledToggleButtonGroup
            value = {crust}
            exclusive
            onChange={crustHandleClick}
            aria-label = "crust selection"
            >
              {crustOptions && crustOptions.map (itemName => (
                <ToggleButton value = {itemName} aria-label={itemName}><Translate>{itemName}</Translate></ToggleButton>
                ))}
          </StyledToggleButtonGroup>
        </div>

        <div
          className={toggleState === 3 ? (dark === 'dark' ? "content  active-content-dark" : "content active-content") : "content"}
        >
          <h2><Translate>Select your Sauce</Translate></h2>
          <hr />
          <StyledToggleButtonGroup
            value = {sauce}
            exclusive
            onChange={sauceHandleClick}
            aria-label = "sauce selection"
            >
              {sauceOptions && sauceOptions.map (itemName => (
                <ToggleButton value = {itemName} aria-label={itemName}><Translate>{itemName}</Translate></ToggleButton>
                ))}
          </StyledToggleButtonGroup>
        </div>

        <div
          className={toggleState === 4 ? (dark === 'dark' ? "content  active-content-dark" : "content active-content") : "content"}
        >
          <h2><Translate>Select your Cheese</Translate></h2>
          <hr />
          <StyledToggleButtonGroup
            value = {cheese}
            exclusive
            onChange={cheeseHandleClick}
            aria-label = "cheese selection"
            >
              {cheeseOptions && cheeseOptions.map (itemName => (
                <ToggleButton value = {itemName} aria-label={itemName}><Translate>{itemName}</Translate></ToggleButton>
                ))}
          </StyledToggleButtonGroup>
        </div>
        <div
          className={toggleState === 5 ? (dark === 'dark' ? "content  active-content-dark" : "content active-content") : "content"}
        >
          <h2><Translate>Select your Topping(s)</Translate></h2>
          <hr />
          <StyledToggleButtonGroup
            value = {toppings}
            onChange={toppingHandleClick}
            aria-label = "topping selection"
            >
              {toppingsOptions && toppingsOptions.map (itemName => (
                <ToggleButton value = {itemName} aria-label={itemName}><Translate>{itemName}</Translate></ToggleButton>
                ))}
          </StyledToggleButtonGroup>
          <Snackbar open={toppingNotification} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info" sx={{ width: '100%'}}>
              Can't Select More Toppings
            </Alert>
          </Snackbar>
        </div>
        <div
          className={toggleState === 6 ? (dark === 'dark' ? "content  active-content-dark" : "content active-content") : "content"}
        >
          <h2><Translate>Select your Drizzle</Translate></h2>
          <hr />
          <StyledToggleButtonGroup
            value = {drizzle}
            exclusive
            onChange={drizzleHandleClick}
            aria-label = "drizzle selection"
            >
              {drizzleOptions && drizzleOptions.map (itemName => (
                <ToggleButton value = {itemName} aria-label={itemName}><Translate>{itemName}</Translate></ToggleButton>
                ))}
          </StyledToggleButtonGroup>
        </div>
        <div
          className={toggleState === 7 ? (dark === 'dark' ? "content  active-content-dark" : "content active-content") : "content"}
        >
          <h2><Translate>Select your Drink</Translate></h2>
          <hr />
          <StyledToggleButtonGroup
            value = {drink}
            exclusive
            onChange={drinkHandleClick}
            aria-label = "drink selection"
            >
              {drinkOptions && drinkOptions.map (itemName => (
                <ToggleButton value = {itemName} aria-label={itemName}><Translate>{itemName}</Translate></ToggleButton>
              ))}
          </StyledToggleButtonGroup>
        </div>
      </div>
      <div>
        <div className = "order-info">
          <p><strong><Translate>Current Order:</Translate></strong></p>
          <ul>
            {(pizzaType !== "" || drink !== "") && 
              <>
                <span><strong><Translate>Pizza:</Translate></strong> <Translate>{pizzaType}</Translate></span>
                <span><strong><Translate>Crust:</Translate></strong> <Translate>{crust}</Translate></span>
                <span><strong><Translate>Sauce:</Translate></strong> <Translate>{sauce}</Translate></span> 
                <span><strong><Translate>Cheese:</Translate></strong> <Translate>{cheese}</Translate></span> 
                <span><strong><Translate>Toppings:</Translate></strong> <Translate>{toppings.join(", ")}</Translate></span>
                <span><strong><Translate>Drizzle:</Translate></strong> <Translate>{drizzle}</Translate></span>
                <span><strong><Translate>Drink:</Translate></strong> <Translate>{drink}</Translate></span>
                <button className = "icon" onClick={deleteCurrentPizza}> <DeleteIcon style ={{ color: "red" }}/> </button>
              </>
            }
            {allOrders.map((pizza, index) => {
              return (
                <li key={pizza.pizza_type}>
                  <span><strong><Translate>Pizza:</Translate></strong> <Translate>{JSON.parse(pizza).pizza_type}</Translate></span>
                  <span><strong><Translate>Crust:</Translate></strong> <Translate>{JSON.parse(pizza).crust}</Translate></span>
                  <span><strong><Translate>Sauce:</Translate></strong> <Translate>{JSON.parse(pizza).sauce}</Translate></span> 
                  <span><strong><Translate>Cheese:</Translate></strong> <Translate>{JSON.parse(pizza).cheese_type}</Translate></span> 
                  <span><strong><Translate>Toppings:</Translate></strong> <Translate>{JSON.parse(pizza).topping1}</Translate></span>
                  <span><strong><Translate>Drizzle:</Translate></strong> <Translate>{JSON.parse(pizza).drizzle}</Translate></span>
                  <span><strong><Translate>Drink:</Translate></strong> <Translate>{JSON.parse(pizza).drink}</Translate></span>
                  <button className = "icon" onClick={() => deleteByIndex(index)}> <DeleteIcon style={{ color: "red" }} /> </button>
                </li>
              )
            })}
          </ul>
        </div>
        <ButtonGroup size = "large" sx = {{m:1}}>
          <Button variant="contained" theme = {successButtons} onClick={addPizzaHandleClick}><Translate>Add Item</Translate></Button>
          <Snackbar open={pizzaNotifaction} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} sx={{ width: '100%', backgroundColor: green[600]}}>
              <Translate> Item Added </Translate>
            </Alert>
          </Snackbar>
          <Button variant="contained" theme = {successButtons} onClick={paymentPopupHandleClick}><Translate>Complete Order</Translate></Button>
          <Snackbar open={completeNotifcation} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} sx={{ width: '100%', backgroundColor: green[600]}}>
              <Translate>Order Completed</Translate>
            </Alert>
          </Snackbar>
          <Button variant="contained" color = "error" onClick={cancelHandleClick}><Translate>Cancel Order</Translate></Button>
          <Snackbar open={cancelNotification} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%'}}>
              <Translate>Order Deleted</Translate>
            </Alert>
          </Snackbar>
        </ButtonGroup>
      </div>
      <Popup lang = {lang} trigger = {paymentPopup} dark = {dark} setTrigger = {setPaymentPopup}>
          <h3><Translate>Complete Order</Translate></h3>
          <TextField 
            sx = {{mt: 2,  mb: 2}}
            id = "nameField"
            value = {name}
            label = "Enter your name"
            onChange = {(e) => {
              setName(e.target.value);
            }}
          />
          <h3><Translate>Total Price: {displayPrice.toFixed(2)}</Translate></h3>
          <ul>
            {allOrders.map((pizza, index) => {
              return (
                <li key={pizza.pizza_type}>
                  <span><Translate>{JSON.parse(allOrders[index]).pizza_type}</Translate></span>
                  {(JSON.parse(pizza).pizza_type !== "" && JSON.parse(pizza).drink)? <span><Translate> w/ {JSON.parse(pizza).drink}</Translate></span> : <span><Translate>{JSON.parse(pizza).drink  }</Translate></span>}
                  <button className = "icon" onClick={() => deleteByIndex(index)}> <DeleteIcon style={{ color: "red" }} /> </button>
                </li>
              )
            })}
            {(pizzaType !== "" || drink !== "") &&
              <li key={pizzaType}>
                  <span><Translate>{pizzaType}</Translate></span>
                  {(pizzaType !== "" && drink !== "")? <span><Translate> w/ {drink}</Translate></span> : <span><Translate>{drink}</Translate></span>}
                  <button className = "icon" onClick={deleteCurrentPizza}> <DeleteIcon style ={{ color: "red" }}/> </button>
              </li>
            }
          </ul>
          <div>
            <Button variant="contained" sx={{ m: 1 }} onClick={() => setPaymentType("CREDIT CARD")}> <Translate>Credit Card</Translate></Button>
            <Button variant="contained" sx={{ m: 1 }} onClick={() => setPaymentType("DEBIT CARD")}> <Translate>Debit Card</Translate></Button>
            <Button variant="contained" sx={{ m: 1 }} onClick={() => setPaymentType("MEAL SWIPE")}> <Translate>Meal Swipes</Translate></Button>
          </div>
          <Button variant="contained" theme={successButtons} sx={{ m: 1 }} onClick={() => placeOrder()}> <Translate>Place Order</Translate></Button>
        </Popup>
      </div>
    </Translator>
  );

  return (
    <div>
      {customizeTabs}
    </div>
  )
}

export default CustomerTabs;