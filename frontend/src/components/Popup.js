import React from 'react'
import "./Popup.css";
import Button from "@mui/material/Button";
import { Translator, Translate } from 'react-auto-translate';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

function Popup(lang, props) {
    return (props.trigger) ? (
        <Translator
            from='en'
            to={lang}
            googleApiKey={apiKey}
        >
            <div className="popup">
                <div className="popup-inner">
                    <Button
                        variant="contained"
                        color="error"
                        className="close-btn"
                        onClick={() => props.setTrigger(false)}
                    ><Translate>Cancel</Translate></Button>
                    {props.children}
                </div>
            </div>
        </Translator>
    ) : "";
}

export default Popup