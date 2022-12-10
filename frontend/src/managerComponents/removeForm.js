import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { Translator, Translate } from 'react-auto-translate';
import {MenuItem, TextField} from "@mui/material";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

/**
 * @author Joshua Hillis
 * Creates a table that allows the user to remove a menu item from the menu.
 * @constructor
 * @param {string} lang - The language for the text to be in.
 * @param {string} mode - The toggle for dark / light mode.
 */
const RemoveMenuForm = ({lang, mode}) => {
    const url = process.env.REACT_APP_API_ROOT;
    const dark = mode;
    // fetch list of menu items from the database for the user to select
    useEffect(() => {
        const controller = new AbortController();
        const fetchIngredients = async () => {
            const menuResponse = await fetch(`${url}menu/`,{signal:controller.signal});
            const menuData = await menuResponse.json();

            set_menu_list(menuData);

        };
        fetchIngredients();
        return () => {
            controller.abort();
          };
    }, [])

    let navigate = useNavigate();
    const {id} = useParams();

    const [menu_item, set_menu_item] = useState('')
    const [menuList, set_menu_list] = useState([{'menu_item':''}])


    const RemoveMenu = async ({lang}) => {
        let formField = new FormData();
        await axios({
            method: 'delete',
                    url: `${url}menu/${menu_item}`,
            data: formField
        }).then(response => {
            console.log(response.data);
            window.location.reload(false);
            navigate('/manager');
        })
    }

    const handleMenuChange = (event) => {
        set_menu_item(event.target.value);
    }

    return (
        <Translator
            from='en' to={lang} googleApiKey={apiKey}>
        <div className={dark === 'dark' ? "container-form-dark" : "container"}>
            <div className="form-group">
                <b><Translate>Select Menu Item to Remove</Translate></b>
                <TextField label="Select Menu Item to Remove" select value={menu_item} onChange={handleMenuChange} fullWidth>
                    {menuList.map(menu => (
                        <MenuItem value={menu.menu_item}><Translate>{menu.menu_item}</Translate></MenuItem>
                    ))}
                </TextField>
            </div>
            <button onClick={RemoveMenu} className="btn btn-primary btn-block"><Translate>Remove Menu Item</Translate></button>

        </div>
        </Translator>
    )
}

export default RemoveMenuForm;