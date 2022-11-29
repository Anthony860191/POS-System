import React from 'react';
import MyMap from "./GoogleMaps"
import { Translator, Translate } from 'react-auto-translate';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;


const Home = ({ lang }) => {
    return (
        <Translator
            from='en'
            to={lang}
            googleApiKey={apiKey}
        >
            <div className="Home">
                <center>
                    <h1><Translate>Spin 'N Stone Pizza</Translate></h1>
                    <div>
                        <MyMap />
                    </div>
                </center>
            </div>
        </Translator>
    );
}

export default Home;