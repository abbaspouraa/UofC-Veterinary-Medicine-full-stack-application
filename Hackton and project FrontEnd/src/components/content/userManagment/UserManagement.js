import "./UserManagement.css";
import React, { useState } from 'react';
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
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import EditIcon from '@mui/icons-material/Edit';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import SearchIcon from "@mui/icons-material/Search";

import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function UserManagement({token}){
    const [search, setSearch] = useState("");
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [ucid, setUcid] = useState(0);
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [addUser, setAddUser] = useState(true);
    const [items, setItems] = useState([]);

    const [user, setUser] = useState(null)

    const [anchorElAP, setAnchorElAP] = React.useState(null);
    const toggleEditPopup = (event, user) => {
        setUser(user);
        setAddUser(false);
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
        setAddUser(true);
        handleClickViewUser(event, user);
    }
    const handleClickViewUser = (event, user) => {
        setAnchorElAP(event.currentTarget);
        setIsAddOpen((previousOpen) => !previousOpen);
    };
    const canBeOpenAP = isAddOpen && Boolean(anchorElAP);

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
        setUcid(Number(value));
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

    const removeUser = (ucid) => {
        UserService.deleteUser(
            Number(token.UCID),
            token.password,
            Number(ucid)
        ).catch(error =>{
            console.log(error);
        })
        getUsers();
    }

    const blockUser = (ucid) =>{
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
                    {"\t"}
                <Button
                    size="large"
                    variant="contained"
                    type='submit'
                    endIcon={<SearchIcon />}
                >Search</Button>
                </div>
                <div className="UserButtons">

                </div>
                {canBeOpenAP && <Popup
                    content={<>
                        <div>
                            <AddEditUser user={user} token={token} addUser={addUser} />
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
                                <StyledTableCell >First Name</StyledTableCell>
                                <StyledTableCell align="right">Last Name</StyledTableCell>
                                <StyledTableCell align="right">UCID</StyledTableCell>
                                <StyledTableCell align="right">Email Address</StyledTableCell>
                                <StyledTableCell align="right">Role</StyledTableCell>
                                <StyledTableCell align="right">Blocked</StyledTableCell>
                                <StyledTableCell align="center">Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((row) => (
                                <StyledTableRow
                                    key={row.fname}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {row.fname}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.lname}</StyledTableCell>
                                    <StyledTableCell align="right">{row.userid}</StyledTableCell>
                                    <StyledTableCell align="right">{row.email}</StyledTableCell>
                                    <StyledTableCell align="right">{row.role}</StyledTableCell>
                                    <StyledTableCell align="right">{row.blocked}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button
                                            size="small"
                                            variant="contained"
                                            onClick={(e) => toggleEditPopup(e, row)}
                                            endIcon={<EditIcon />}
                                        >Edit</Button>
                                        {"\t"}
                                        <Button
                                            color="error"
                                            size="small"
                                            variant="contained"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => removeUser(row.userid)}
                                        >Delete</Button>
                                        {"\t"}
                                        <Button
                                            color="secondary"
                                            size="small"
                                            variant="contained"
                                            endIcon={<BlockIcon />}
                                            onClick={() => blockUser(row.userid)}
                                        >Block</Button>


                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            <
                Button
                size="large"
                variant="contained"
                endIcon={<ControlPointIcon />}
                onClick={toggleAddPopup}
            >Add User</Button>
        </div>
    );
}