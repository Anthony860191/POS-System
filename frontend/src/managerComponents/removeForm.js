import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { Translator, Translate } from 'react-auto-translate';
import {MenuItem, TextField} from "@mui/material";

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const RemoveMenuForm = ({lang}) => {

    useEffect(() => {
        const fetchIngredients = async () => {
            const menuResponse = await fetch('http://localhost:8000/menu');
            const menuData = await menuResponse.json();

            set_menu_list(menuData);

        };
        fetchIngredients();
    }, [])

    let navigate = useNavigate();
    const {id} = useParams();

    const [menu_item, set_menu_item] = useState('')
    const [menuList, set_menu_list] = useState([{'menu_item':''}])


    const RemoveMenu = async ({lang}) => {
        let formField = new FormData();
        await axios({
            method: 'delete',
            url: 'http://localhost:8000/menu/' + menu_item,
            data: formField
        }).then(response => {
            console.log(response.data);
            window.location.reload(false);
            navigate('/manager');
        })
    }

    const handleMenuChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        set_menu_item(event.target.value);
    }

    return (
        <Translator
            from='en' to={lang} googleApiKey={apiKey}>
        <div className="container">
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