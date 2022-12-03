import * as React from 'react';
import { useEffect, useState } from "react";
import "./CustomerTabs.css";
import Popup from './Popup';
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ButtonGroup from '@mui/material/ButtonGroup';
import { Translator, Translate } from 'react-auto-translate';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function CustomerTabs({ lang }) {
  const [toggleState, setToggleState] = useState(1); // function to switch between tabs
  const [paymentPopup, setPaymentPopup] = useState(false); // function to open the payment popup
  const [name, setName] = useState(""); // function to set the customers name
  const [paymentType, setPaymentType] = useState(""); // variable and function to store the payment type
  const [pizzaNotifaction, setPizzaNotification] = useState(false); // condition to show pizza added snackbar
  const [toppingNotification, setToppingNotification] = useState(false); // condition to show max number of toppings added snackbar
  const [ingredients, setIngredients] = useState([]); // variable to store the ingredients fetched from the database
  const [menuItems, setMenuItems] = useState([]); // variable to store the the menu items available
  const [maxToppings, setMaxToppings] = useState(4);
  const [currToppings, setCurrToppings] = useState(0);
  const url = 'http://localhost:8000/';

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
function CustomerTabs() {
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
    const url = 'http://localhost:8000/';
    
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
      }
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
      const response = await fetch(`${url}price?pizzatype=${currentOrder[0]}&crusttype=${currentOrder[1]}&drinktype=`);
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
      setCrust("");
      setSauce("");
      setCheese("");
      setToppings([]);
      setCurrentOrder(Array(9).fill(""));
      setTotalPrice(0);
    };

    const deleteByIndex = index => {
      console.log(allOrders[index]);
      setAllOrders(oldValues => {
        return oldValues.filter((_, i) => i !== index)
      })
    }

    let [totalPrice, setTotalPrice] = useState(0) // variable to store the total price of the order
    // function to POST order to database
    const placeOrder = async() => {
      setPaymentPopup(false);
      setCompleteNotification(true);
      const current = new Date();
      const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
      
      const responsePrice = await fetch(`${url}price?pizzatype=${currentOrder[0]}&crusttype=${crust}&drinktype=`);
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
        body: JSON.stringify({
          "orderid": parseInt(resultId[0].id),
          "pizza_type": currentOrder[0],
          "cheese_type": cheese,
          "crust": crust,
          "sauce": sauce,
          "drizzle": currentOrder[8],
          "drink": "",
          "topping1": toppings.length < 1 ? null : toppings[0],
          "topping2": toppings.length < 2  ? null : toppings[1],
          "topping3": toppings.length < 3  ? null : toppings[2],
          "topping4": toppings.length < 4  ? null : toppings[3],
          "price": parseFloat(resultPrice.price)
        })
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
        "pizza_type": currentOrder[0],
        "cheese_type": currentOrder[3],
        "crust": currentOrder[1],
        "sauce": currentOrder[2],
        "drizzle": currentOrder[8],
        "drink": "",
        "topping1": currentOrder[4] === "" ? null : currentOrder[4],
        "topping2": currentOrder[5] === "" ? null : currentOrder[5],
        "topping3": currentOrder[6] === "" ? null : currentOrder[6],
        "topping4": currentOrder[7] === "" ? null : currentOrder[7],
        "price": parseFloat(resultPrice.price)
      })
    });
    setAllOrders([]);
    setCurrentOrder(Array(9).fill(""));
    setTotalPrice(0);
  };

  // array to store the current pizza order information
  const [currentOrder, setCurrentOrder] = useState(Array(9).fill(""));
  // array to store all of the pizza orders besides the current one
  const [allOrders, setAllOrders] = useState([]);

  // notify when pizza has been added to the order
  const addPizzaHandleClick = async () => {
    setPizzaNotification(true);
    const responsePrice = await fetch(`${url}price?pizzatype=${currentOrder[0]}&crusttype=${currentOrder[1]}&drinktype=`);
    const resultPrice = await responsePrice.json();

    const responseId = await fetch(`${url}orders/?latest=true`);
    const resultId = await responseId.json();

    var pizzaOrder = {
      "orderid": 1 + parseInt(resultId[0].id),
      "pizza_type": currentOrder[0],
      "cheese_type": currentOrder[3],
      "crust": currentOrder[1],
      "sauce": currentOrder[2],
      "drizzle": currentOrder[8],
      "drink": "",
      "topping1": currentOrder[4] === "" ? null : currentOrder[4],
      "topping2": currentOrder[5] === "" ? null : currentOrder[5],
      "topping3": currentOrder[6] === "" ? null : currentOrder[6],
      "topping4": currentOrder[7] === "" ? null : currentOrder[7],
      "price": parseFloat(resultPrice.price)
    }

    var jsonPizzaOrder = JSON.stringify(pizzaOrder);
    allOrders.push(jsonPizzaOrder);
    setCurrentOrder(Array(9).fill(""));
    setTotalPrice(totalPrice + parseFloat(resultPrice.price));
  };

    const customPizzaClick = (pizzaType) => {
      currentOrder[0] = pizzaType;
      if(pizzaType === "1 Topping") {
        setMaxToppings(1);
      } else {
        setMaxToppings(4);
      }
      setToggleState(2);
    }

    const presetPizzaClick = (pizzaType) => {
      currentOrder[0] = pizzaType.menu_item;
      setCrust(pizzaType.default_crust);
      setSauce(pizzaType.sauce);
      setCheese(pizzaType.cheese_type);
      currentOrder[4] = pizzaType.topping1;
      currentOrder[5] = pizzaType.topping2;
      currentOrder[6] = pizzaType.topping3;
      currentOrder[7] = pizzaType.topping4;
      currentOrder[8] = pizzaType.drizzle;
    }

    // functions to store the pizza ingredient selections on button presses
    const [crust, setCrust] = React.useState("");
    const crustHandleClick = (event, crustType) => {
      setCrust(crustType);
    };

    const [sauce, setSauce] = React.useState("");
    const sauceHandleClick = (event, sauceType) => {
      setSauce(sauceType);
    };

    const [cheese, setCheese] = React.useState("");
    const cheeseHandleClick = (event, cheeseType) => {
      setCheese(cheeseType);
    };

    const [toppings, setToppings] = React.useState([]);
    const toppingHandleClick = (event, toppingType) => {
      if(toppingType.length <= maxToppings) {
        setToppings(toppingType);
      } else {
        setToppingNotification(true); 
      }
    };

  const drizzleHandleClick = (drizzleType) => {
    currentOrder[8] = drizzleType;
  };

  const customizeTabs = [];
  customizeTabs.push(
    <Translator
      from='en'
      to={lang}
      googleApiKey={apiKey}
    >
      <div className="container">
        <div className="bloc-tabs">
          <button
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            <Translate>Pizza Type</Translate>
          </button>
          <button
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            <Translate>Crust</Translate>
          </button>
          <button
            className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(3)}
          >
            <Translate>Sauce</Translate>
          </button>
          <button
            className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(4)}
          >
            <Translate>Cheese</Translate>
          </button>
          <button
            className={toggleState === 5 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(5)}
          >
            <Translate>Toppings</Translate>
          </button>
          <button
            className={toggleState === 6 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(6)}
          >
            <Translate>Drizzle</Translate>
          </button>
        </div>

      <div className="content-tabs">
      <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <h2>Select your Pizza</h2>
          <hr />
          {basePizzas && basePizzas.map (itemName => (
            <Button variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={() => customPizzaClick(itemName)} >{itemName}</Button>
          ))}
          {presetPizzas && presetPizzas.map (itemName => (
            <Button variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={() => presetPizzaClick(itemName)} >{itemName.menu_item}</Button>
          ))}
        </div>
        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h2>Select your Crust</h2>
          <hr />
          <ToggleButtonGroup
            sx={{
              display: "grid",
              gridTemplateColumns: "auto auto auto auto",
              gridGap: "20px",
              padding: "10px",
              
            }}
            value = {crust}
            exclusive
            onChange={crustHandleClick}
            aria-label = "crust selection"
            >
              {crustOptions && crustOptions.map (itemName => (
                <ToggleButton value = {itemName} aria-label={itemName}>{itemName}</ToggleButton>
                ))}
          </ToggleButtonGroup>
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <h2>Select your Sauce</h2>
          <hr />
          <ToggleButtonGroup
            sx={{
              display: "grid",
              gridTemplateColumns: "auto auto auto auto",
              gridGap: "20px",
              padding: "10px",
              
            }}
            value = {sauce}
            exclusive
            onChange={sauceHandleClick}
            aria-label = "sauce selection"
            >
              {sauceOptions && sauceOptions.map (itemName => (
                <ToggleButton value = {itemName} aria-label={itemName}>{itemName}</ToggleButton>
                ))}
          </ToggleButtonGroup>
        </div>

        <div
          className={toggleState === 4 ? "content  active-content" : "content"}
        >
          <h2>Select your Cheese</h2>
          <hr />
          <ToggleButtonGroup
            sx={{
              display: "grid",
              gridTemplateColumns: "auto auto auto auto",
              gridGap: "20px",
              padding: "10px",
              
            }}
            value = {cheese}
            exclusive
            onChange={cheeseHandleClick}
            aria-label = "cheese selection"
            >
              {cheeseOptions && cheeseOptions.map (itemName => (
                <ToggleButton value = {itemName} aria-label={itemName}>{itemName}</ToggleButton>
                ))}
          </ToggleButtonGroup>
        </div>
        <div
          className={toggleState === 5 ? "content  active-content" : "content"}
        >
          <h2>Select your Topping(s)</h2>
          <hr />
          <ToggleButtonGroup
            sx={{
              display: "grid",
              gridTemplateColumns: "auto auto auto auto",
              gridGap: "20px",
              padding: "10px",
              
            }}
            value = {toppings}
            onChange={toppingHandleClick}
            aria-label = "topping selection"
            >
              {toppingsOptions && toppingsOptions.map (itemName => (
                <ToggleButton value = {itemName} aria-label={itemName}>{itemName}</ToggleButton>
                ))}
          </ToggleButtonGroup>
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
          {drizzleOptions && drizzleOptions.map (itemName => (
            <Button variant="contained" sx= {{m: 1}} className = "ingredientButton" onClick={() => drizzleHandleClick(itemName)} >{itemName}</Button>
          ))}
        </div>
      </div>
      <ButtonGroup size = "large" sx = {{m:1}}>
        <Button variant="contained" color = "success" onClick={addPizzaHandleClick}>Add Pizza</Button>
        <Snackbar open={pizzaNotifaction} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%'}}>
            Pizza Added
          </Alert>
        </Snackbar>
        <Button variant="contained" color = "success" onClick={paymentPopupHandleClick}>Complete Order</Button>
        <Snackbar open={completeNotifcation} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%'}}>
            Order Completed
          </Alert>
        </Snackbar>
        <Button variant="contained" color = "error" onClick={cancelHandleClick}>Cancel Order</Button>
        <Snackbar open={cancelNotification} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%'}}>
            Order Deleted
          </Alert>
        </Snackbar>
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
          <h3>Total Price: {displayPrice.toFixed(2)}</h3>
          <ul>
            {allOrders.map((pizza, index) => {
              return (
                <li key={pizza.pizza_type}>
                  <span>{pizza.pizza_type}</span>
                  <button onClick={() => deleteByIndex(index)}>Delete</button>
                </li>
              )
            })}
          </ul>
          <div>
            <Button variant="contained" sx={{ m: 1 }} onClick={() => setPaymentType("CREDIT CARD")}> <Translate>Credit Card</Translate></Button>
            <Button variant="contained" sx={{ m: 1 }} onClick={() => setPaymentType("DEBIT CARD")}> <Translate>Debit Card</Translate></Button>
            <Button variant="contained" sx={{ m: 1 }} onClick={() => setPaymentType("MEAL SWIPE")}> <Translate>Meal Swipes</Translate></Button>
          </div>
          <Button variant="contained" color="success" sx={{ m: 1 }} onClick={() => placeOrder()}> <Translate>Place Order</Translate></Button>
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