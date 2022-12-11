import React from 'react';
import MyMap from "./GoogleMaps"
import "./Home.css"
import { Translator, Translate } from 'react-auto-translate';


const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
/**
 * @author Oliver Carver
 * Home page for the website
 * @param {string} lang - The language the web page needs to be using 
 * @param {string} mode - The theme mode for CSS styling
 * @returns HTML home page
 */

const Home = ({ lang , mode}) => {
    const dark = mode;
    return (
        <Translator
            from='en'
            to={lang}
            googleApiKey={apiKey}
        >
            <div className={dark === 'dark' ? "Home-dark" : "Home-light"}>
                <center>
                    <h1>Spin 'N Stone Pizza</h1>
                    <p>
                        <Translate>
                        Welcome to Spin 'N Stone Pizza, located in the MSC at Texas A&M University! As Aggies, we are proud to offer delicious,
                        hand-crafted pizzas made with the freshest ingredients. Our dough is made fresh daily, and we top it with the finest meats,
                        vegetables, and cheeses. </Translate>
                        <br /><br />
                        <Translate>At Spin 'N Stone Pizza, we believe that great pizza is all about the details. Our skilled pizza
                        makers take the time to carefully craft each and every pie to perfection, ensuring that every bite is packed with flavor.
                        You can enjoy your pizza on the go – perfect for a quick meal between classes or to enjoy in the food court! </Translate>
                        <br /><br />
                        <Translate>
                        We are proud to be a part of the A&M community, and we love serving our fellow Aggies. Come visit us at Spin 'N Stone Pizza 
                        and taste the difference for yourself. We look forward to serving you!
                        </Translate>
                    </p>
                    <br />
                    <div>
                        <MyMap />
                    </div>
                    <br />
                    <p><Translate>Come visit us at the MSC food court! Address provided in the map above</Translate></p>
                </center>
            </div>
        </Translator>
    );
}

export default Home;