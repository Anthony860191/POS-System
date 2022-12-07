import React from 'react'
import "./Popup.css";
import Button from "@mui/material/Button";

/**
 * @author Anthony Mercado
 * Creates a popup window to prompt the user with.
 * @constructor
 */
function Popup(props) {
    return (props.trigger) ? (
        <div className = "popup">
            <div className = "popup-inner">
                <Button
                    variant = "contained"
                    sx = {{backgroundColor : 'red'}}
                    className = "close-btn"
                    onClick={() => props.setTrigger(false)}
                >Cancel</Button>
                <Button
                    variant = "contained"
                    sx = {{backgroundColor : 'green'}}
                    className = "accept-btn"
                    onClick={() => props.setTrigger(false)}
                    >Accept</Button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Popup