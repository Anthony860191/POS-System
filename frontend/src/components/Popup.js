import React from 'react'
import "./Popup.css";
import Button from "@mui/material/Button";

function Popup(props) {
    return (props.trigger) ? (
        <div className = "popup">
            <div className = "popup-inner">
                <Button 
                    variant = "contained" 
                    color = "error"
                    className = "close-btn" 
                    onClick={() => props.setTrigger(false)}
                >Cancel</Button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Popup