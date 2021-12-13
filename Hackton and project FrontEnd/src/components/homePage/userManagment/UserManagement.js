import "./UserManagement.css";
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Popup from './Popup';
import UserService from "../../service/UserService";
import AddEditUser from "./addEditUser";

export default function UserManagement({token}){
    const [search, setSearch] = useState("");
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [ucid, setUcid] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [items, setItems] = useState([]);

    const [user, setUser] = useState(null)

    const [anchorElAP, setAnchorElAP] = React.useState(null);
    const toggleEditPopup = (event, user) => {
        setUser(user);
        handleClickViewUser(event, user);
    }
    const toggleAddPopup = (event) => {
        setUser({
            fname:"",
            lname:"",
            userid:"",
            blocked:"No",
            email:"",
            role:"Student",
            password: "",
        })
        handleClickViewUser(event, user);
    }
    const handleClickViewUser = (event, user) => {
        setAnchorElAP(event.currentTarget);
        setIsAddOpen((previousOpen) => !previousOpen);
    };
    const canBeOpenAP = isAddOpen && Boolean(anchorElAP);
    
    useEffect(() => {
       getUsers();
    }, [])

    const getUsers = () => {
        UserService.getAllUsers(
            Number(token.UCID),
            token.password
        ).then((response) => {
            setItems(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

    function handleSearch(e){
        const value = e.target.value;
        setFName(value);
        setLName(value);
        setUcid(value);
        setEmail(value);
        setRole(value);
        setSearch(value);
    }

    const searchUsers = (e) => {
        e.preventDefault();
        UserService.searchUsers(
            Number(token.UCID),
            token.password,
            {
                fname: fname,
                lname: lname,
                userid: ucid,
                email: email,
                role: role
            }
        ).then((response) => {
            setItems(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

    const addUser = () => {
        toggleAddPopup();
        UserService.addUser(
            Number(token.UCID),
            token.password,
            {
                fname: fname,
                lname: lname,
                userid: ucid,
                email: email,
                role: role,
                password: password
            }
        ).catch(error =>{
            console.log(error);
        })
        getUsers();
    }

    const removeUser = () => {
        UserService.deleteUser(
            Number(token.UCID),
            token.password,
            Number(ucid)
        ).catch(error =>{
            console.log(error);
        })
        getUsers();
    }

    const blockUser = () =>{
        UserService.blockUser(
            Number(token.UCID),
            token.password,
            Number(ucid)
        ).catch(error =>{
            console.log(error);
        })
    }


    return(
        <div className='UserManagement'>
            <h1>
                Users
            </h1>
            <form onSubmit={searchUsers}>
                <div className="SearchUserBox">
                <TextField 
                    id="outlined-Search" 
                    label="Search" 
                    variant="outlined"
                    size="small"
                    value={search} 
                    onChange={handleSearch}
                />
                <Button variant="contained" type='submit'>Search</Button>
                </div>
                <div className="UserButtons">

                </div>
                {canBeOpenAP && <Popup
                    content={<>
                        <div>
                            <AddEditUser user={user} token={token} />
                            <Stack spacing={2} direction="row">
                                <Button variant="outlined" onClick={handleClickViewUser}>Close</Button>
                            </Stack>
                        </div>
                    </>}
                    handleClose={(e) => toggleEditPopup(e, user)}
                />}

            </form>
            <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >First Name</TableCell>
                                <TableCell align="right">Last Name</TableCell>
                                <TableCell align="right">UCID</TableCell>
                                <TableCell align="right">Email Address</TableCell>
                                <TableCell align="right">Role</TableCell>
                                <TableCell align="right">Blocked</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((row) => (
                                <TableRow
                                    key={row.fname}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.fname}
                                    </TableCell>
                                    <TableCell align="right">{row.lname}</TableCell>
                                    <TableCell align="right">{row.userid}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{row.role}</TableCell>
                                    <TableCell align="right">{row.blocked}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            size="small"
                                            variant="contained"
                                            onClick={(e) => toggleEditPopup(e, row)}
                                        >Edit User</Button>
                                        {"\t"}
                                        <Button
                                            color="error"
                                            size="small"
                                            variant="contained"
                                            onClick={() => removeUser(row.userid)}
                                        >Delete</Button>
                                        {"\t"}
                                        <Button
                                            color="error"
                                            size="small"
                                            variant="contained"
                                            onClick={() => blockUser(row.userid)}
                                        >Block</Button>


                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            <
                Button
                size="large"
                variant="contained"
                onClick={toggleAddPopup}
            >Add User</Button>
        </div>
    );
}