import React, { useState } from 'react';
import "./Login.css";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import axios from 'axios';
import Popup from './Popup';

export default function Login({ setToken }){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();

        const credentials = {username, password}
        console.log(credentials);

        axios({
            method: 'post',
            url: 'http://localhost:8090/user/login',
            data: {
                "ucid" : username,
                "password" : password
            }
        })
        .then((response) => {
            console.log(response.data);

            if(response.data != null){
                setToken(response.data)
            }
        });
    }

    function validate(){
        return username.length > 0 && password.length > 0;
    }

    return (
        <div className="Login">
            <h1>
                University of Calgary <br></br>
                Faculty of Veterinary Medicine <br></br>
            </h1>
            <h3>Animal Management Application</h3>
            
            <form onSubmit={handleSubmit}>
                <TextField 
                    required
                    id="outlined-ucid" 
                    label="UCID" 
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <TextField 
                    required
                    id="outlined-password" 
                    label="Password" 
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <br></br>
                <Button className="loginButton" variant="contained" type='submit'>Sign in</Button>
            </form>
        </div>

    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}