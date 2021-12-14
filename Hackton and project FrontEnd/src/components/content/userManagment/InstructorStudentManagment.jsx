import "./UserManagement.css";
import React, { useState } from 'react';
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UserService from "../../service/UserService";
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import { useEffect } from "react";

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

export default function InstructorStudentManagment({token}){

    const [students, setStudents] = useState([])

    useEffect(() => {

        UserService.getAllUsersByRole(Number(token.UCID), token.password ,"Student").then((Response) => {
            setStudents(Response.data)
        })
    }, [])


    const removeUser = (ucid) => {
        UserService.deleteUser(
            Number(token.UCID),
            token.password,
            Number(ucid)
        ).catch(error =>{
            console.log(error);
        })
        // getUsers();
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
                            {students.map((row) => (
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
           
    );
}