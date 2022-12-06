import React from 'react';
import MyMap from "./GoogleMaps"
import { Translator, Translate } from 'react-auto-translate';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const Home = ({ lang, mode }) => {
    return (
        <Translator
            from='en'
            to={lang}
            googleApiKey={apiKey}
        >
            <div className="Home">
                <center>
                    <h1>Spin 'N Stone Pizza</h1>
                    <p>
                        Welcome to Spin 'N Stone Pizza, located in the MSC at Texas A&M University! As Aggies, we are proud to offer delicious,
                        hand-crafted pizzas made with the freshest ingredients. Our dough is made fresh daily, and we top it with the finest meats,
                        vegetables, and cheeses. 
                        <br />
                        At Spin 'N Stone Pizza, we believe that great pizza is all about the details. Our skilled pizza
                        makers take the time to carefully craft each and every pie to perfection, ensuring that every bite is packed with flavor.
                        You can enjoy your pizza on the go – perfect for a quick meal between classes or to enjoy in the food court! 
                        <br />
                        We are proud to be a part of the A&M community, and we love serving our fellow Aggies. Come visit us at Spin 'N Stone Pizza 
                        and taste the difference for yourself. We look forward to serving you!
                    </p>
                    <div>
                        <MyMap />
                    </div>
                    <p>Come visit us at the MSC food court! Address provided in the map above</p>
                </center>
            </div>
        </Translator>
    );
}

export default Home;