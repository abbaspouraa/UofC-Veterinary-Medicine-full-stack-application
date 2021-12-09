import "./UserManagement.css";
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Popup from './Popup';
import UserService from "../components/service/UserService";

export default function UserManagement(){
    const [search, setSearch] = useState("");
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isRemoveOpen, setIsRemoveOpen] = useState(false);
    const [isBlockOpen, setIsBlockOpen] = useState(false);
    const [name, setName] = useState("");
    const [ucid, setUcid] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [items, setItems] = useState([]);
    
    useEffect(() => {
       getUsers();
    }, [])

    const getUsers = () => {
        UserService.getAllUsers().then((response) => {
            setItems(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

    function handleSearch(e){
        const value = e.target.value;
        setName(value);
        setUcid(value);
        setEmail(value);
        setRole(value);
        setSearch(value);
    }

    const searchUsers = (e) => {
        e.preventDefault();
        UserService.searchUsers(name, ucid, email, role).then((response) => {
            setItems(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

    const toggleAddPopup = () => {
        setIsAddOpen(!isAddOpen);
    }

    const toggleEditPopup = () => {
        setIsEditOpen(!isEditOpen);
    }

    const toggleRemovePopup = () => {
        setIsRemoveOpen(!isRemoveOpen);
    }

    const toggleBlockPopup = () => {
        setIsBlockOpen(!isBlockOpen);
    }

    function handleSubmit(e){
        e.preventDefault();
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
                    // onChange={(e) => 
                    //     setName(e.target.value),
                    //     setUcid(e.target.value),
                    //     setEmail(e.target.value),
                    //     setRole(e.target.value)
                    //     } 
                    onChange={handleSearch}
                />
                <Button variant="contained" type='submit'>Search</Button>
                </div>
                <div className="UserButtons">
                <Stack spacing={2} direction="row">
                    <Button variant="outlined" onClick={toggleAddPopup}>Add User</Button>
                    <Button variant="outlined" onClick={toggleRemovePopup}>Remove User</Button>
                    <Button variant="outlined" onClick={toggleBlockPopup}>Block User</Button>
                    <Button variant="outlined" onClick={toggleEditPopup}>Edit User</Button>
                </Stack>
                </div>
                {isAddOpen && <Popup
                    content={<>
                        <h3>Add User</h3>
                        <div className="add-user">
                        <TextField 
                            id="outlined-Name" 
                            label="Name" 
                            variant="outlined"
                            size="small"
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                        /> 
                        <TextField 
                            id="outlined-UCID" 
                            label="UCID" 
                            variant="outlined"
                            size="small"
                            value={ucid}
                            onChange={(e) => setUcid(e.target.value)} 
                        /> 
                        <TextField 
                            id="outlined-Email" 
                            label="Email" 
                            variant="outlined"
                            size="small"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        /> 
                        <TextField 
                            id="outlined-Role" 
                            label="Role" 
                            variant="outlined"
                            size="small"
                            value={role}
                            onChange={(e) => setRole(e.target.value)} 
                        /> 
                        </div>
                        <div>
                        <Stack spacing={2} direction="row">
                            <Button variant="outlined" onClick={toggleAddPopup}>Confirm</Button>
                            <Button variant="outlined" onClick={toggleAddPopup}>Cancel</Button>
                        </Stack>
                        </div>    
                    </>}
                    handleClose={toggleAddPopup}
                />}
                {isEditOpen && <Popup
                    content={<>
                        <h3>Edit User</h3>
                        <div className="edit-user">
                        <TextField 
                            id="outlined-Name" 
                            label="Name" 
                            variant="outlined"
                            size="small"
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                        /> 
                        <TextField 
                            id="outlined-UCID" 
                            label="UCID" 
                            variant="outlined"
                            size="small"
                            value={ucid}
                            onChange={(e) => setUcid(e.target.value)} 
                        /> 
                        <TextField 
                            id="outlined-Email" 
                            label="Email" 
                            variant="outlined"
                            size="small"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        /> 
                        <TextField 
                            id="outlined-Role" 
                            label="Role" 
                            variant="outlined"
                            size="small"
                            value={role}
                            onChange={(e) => setRole(e.target.value)} 
                        /> 
                        </div>
                        <div>
                        <Stack spacing={2} direction="row">
                            <Button variant="outlined" onClick={toggleEditPopup}>Confirm</Button>
                            <Button variant="outlined" onClick={toggleEditPopup}>Cancel</Button>
                        </Stack>
                        </div>    
                    </>}
                    handleClose={toggleEditPopup}
                />}
                {isRemoveOpen && <Popup
                    content={<>
                        <h3>Remove User</h3>
                        <div className="remove-user">
                        <TextField 
                            id="outlined-UCID" 
                            label="UCID" 
                            variant="outlined"
                            size="small"
                            value={ucid}
                            onChange={(e) => setUcid(e.target.value)} 
                        /> 
                        </div>
                        <div>
                        <Stack spacing={2} direction="row">
                            <Button variant="outlined" onClick={toggleRemovePopup}>Confirm</Button>
                            <Button variant="outlined" onClick={toggleRemovePopup}>Cancel</Button>
                        </Stack>
                        </div>    
                    </>}
                    handleClose={toggleRemovePopup}
                />}
                {isBlockOpen && <Popup
                    content={<>
                        <h3>Block User</h3>
                        <div className="block-user">
                        <TextField 
                            id="outlined-UCID" 
                            label="UCID" 
                            variant="outlined"
                            size="small"
                            value={ucid}
                            onChange={(e) => setUcid(e.target.value)} 
                        /> 
                        </div>
                        <div>
                        <Stack spacing={2} direction="row">
                            <Button variant="outlined" onClick={toggleBlockPopup}>Confirm</Button>
                            <Button variant="outlined" onClick={toggleBlockPopup}>Cancel</Button>
                        </Stack>
                        </div>    
                    </>}
                    handleClose={toggleBlockPopup}
                />}
            </form>
            <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Name</TableCell>
                                <TableCell align="right">UCID</TableCell>
                                <TableCell align="right">Email Address</TableCell>
                                <TableCell align="right">Role</TableCell>
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
                                    <TableCell align="right">{row.userid}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{row.role}</TableCell>
                                    
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        </div>
    );
}