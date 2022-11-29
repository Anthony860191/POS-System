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
      })

  }, []);

  // variables to store the different ingredients types
  const crust = [];
  const sauce = [];
  const cheese = [];
  const toppings = [];
  const drizzle = [];

  // get the different types of customization options
  for (let i = 0; i < ingredients.length; i++) {
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

    setPizzaNotification(false);
    setToppingNotification(false);
  };

  // function to change the content displayed dependent on the tab selected
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [displayPrice, setDisplayPrice] = useState(0)
  const paymentPopupHandleClick = async () => {
    setPaymentPopup(true);
    const response = await fetch(`${url}price?pizzatype=${currentOrder[0]}&crusttype=${currentOrder[1]}&drinktype=`);
    const result = await response.json();
    if (result.price != null) {
      setDisplayPrice(totalPrice + parseFloat(result.price)); // obtain the total price of the order to display it
    } else {
      setDisplayPrice(totalPrice);
    }
  };

  let [totalPrice, setTotalPrice] = useState(0) // variable to store the total price of the order
  // function to POST order to database
  const placeOrder = async () => {
    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;

    const responsePrice = await fetch(`${url}price?pizzatype=${currentOrder[0]}&crusttype=${currentOrder[1]}&drinktype=`);
    const resultPrice = await responsePrice.json();
    totalPrice += parseFloat(resultPrice.price); // store the price obtained as a number in the price variable      

    fetch(`${url}orders/`, {
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
    currentOrder[4] = "";
    currentOrder[5] = "";
    currentOrder[6] = "";
    currentOrder[7] = "";
    if (pizzaType === "1 TOPPING") {
      setMaxToppings(1);
      setCurrToppings(0);
    } else {
      setMaxToppings(4);
      setCurrToppings(0);
    }
    setToggleState(2);
  }

  const presetPizzaClick = (pizzaType) => {
    currentOrder[0] = pizzaType.menu_item;
    currentOrder[1] = pizzaType.default_crust;
    currentOrder[2] = pizzaType.sauce;
    currentOrder[3] = pizzaType.cheese_type;
    currentOrder[4] = pizzaType.topping1;
    currentOrder[5] = pizzaType.topping2;
    currentOrder[6] = pizzaType.topping3;
    currentOrder[7] = pizzaType.topping4;
    currentOrder[8] = pizzaType.drizzle;
  }

  // functions to store the pizza ingredient selections on button presses
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
    if (currToppings < maxToppings) {
      currentOrder[4 + currToppings] = toppingType;
      setCurrToppings(currToppings + 1);

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
            <h2><Translate>Select your Pizza</Translate></h2>
            <hr />
            {basePizzas && basePizzas.map(itemName => (
              <Button variant="contained" sx={{ m: 1 }} className="ingredientButton" onClick={() => customPizzaClick(itemName)} ><Translate>{itemName}</Translate></Button>
            ))}
            {presetPizzas && presetPizzas.map(itemName => (
              <Button variant="contained" sx={{ m: 1 }} className="ingredientButton" onClick={() => presetPizzaClick(itemName)} >{itemName.menu_item}</Button>
            ))}
          </div>
          <div
            className={toggleState === 2 ? "content  active-content" : "content"}
          >
            <h2>Select your Crust</h2>
            <hr />
            {crust && crust.map(itemName => (
              <Button variant="contained" sx={{ m: 1 }} className="ingredientButton" onClick={() => crustHandleClick(itemName)} >{itemName}</Button>
            ))}
          </div>

          <div
            className={toggleState === 3 ? "content  active-content" : "content"}
          >
            <h2>Select your Sauce</h2>
            <hr />
            {sauce && sauce.map(itemName => (
              <Button variant="contained" sx={{ m: 1 }} className="ingredientButton" onClick={() => sauceHandleClick(itemName)} >{itemName}</Button>
            ))}
          </div>

          <div
            className={toggleState === 4 ? "content  active-content" : "content"}
          >
            <h2>Select your Cheese</h2>
            <hr />
            {cheese && cheese.map(itemName => (
              <Button variant="contained" sx={{ m: 1 }} className="ingredientButton" onClick={() => cheeseHandleClick(itemName)} >{itemName}</Button>
            ))}
          </div>
          <div
            className={toggleState === 5 ? "content  active-content" : "content"}
          >
            <h2>Select your Topping(s)</h2>
            <hr />
            {toppings && toppings.map(itemName => (
              <Button variant="contained" sx={{ m: 1 }} className="ingredientButton" onClick={() => toppingHandleClick(itemName)} >{itemName}</Button>
            ))}
            <Snackbar open={toppingNotification} autoHideDuration={3000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                Can't Select More Toppings
              </Alert>
            </Snackbar>
          </div>
          <div
            className={toggleState === 6 ? "content  active-content" : "content"}
          >
            <h2>Select your Drizzle</h2>
            <hr />
            {drizzle && drizzle.map(itemName => (
              <Button variant="contained" sx={{ m: 1 }} className="ingredientButton" onClick={() => drizzleHandleClick(itemName)} >{itemName}</Button>
            ))}
          </div>
        </div>
        <ButtonGroup size="large" sx={{ m: 1 }}>
          <Button variant="contained" color="success" onClick={addPizzaHandleClick}>Add Pizza</Button>
          <Snackbar open={pizzaNotifaction} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Pizza Added
            </Alert>
          </Snackbar>
          <Button variant="contained" color="success" onClick={paymentPopupHandleClick}>Complete Order</Button>
          <Button variant="contained" color="error">Cancel Order</Button>
        </ButtonGroup>
        <Popup trigger={paymentPopup} setTrigger={setPaymentPopup}>
          <h3>Complete Order</h3>
          <TextField
            sx={{ mt: 2, mb: 2 }}
            id="nameField"
            value={name}
            label="Enter your name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <h3>Total Price: {displayPrice.toFixed(2)}</h3>
          <div>
            <Button variant="contained" sx={{ m: 1 }} onClick={() => setPaymentType("CREDIT CARD")}> Credit Card</Button>
            <Button variant="contained" sx={{ m: 1 }} onClick={() => setPaymentType("DEBIT CARD")}> Debit Card</Button>
            <Button variant="contained" sx={{ m: 1 }} onClick={() => setPaymentType("MEAL SWIPE")}> Meal Swipes</Button>
          </div>
          <Button variant="contained" color="success" sx={{ m: 1 }} onClick={() => placeOrder()}> Place Order</Button>
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