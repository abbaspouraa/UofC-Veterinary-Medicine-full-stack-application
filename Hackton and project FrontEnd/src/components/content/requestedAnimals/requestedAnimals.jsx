import React, {useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import AnimalService from '../../service/AnimalService'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

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

export default function ListRequestedAnimals({token}) {

    const [animal, setAnimal] = useState([])

    const findAll = () => {
        AnimalService.getRequestedAnimals(
            token.UCID,
            token.password,
            request
        ).then((Response) => {
            setAnimal(Response.data)
        }).catch(error =>{
            console.log(error);
        })
    }

    const reserveAnimal = (id, approval) => {
        if (id)
            AnimalService.updateAnimalRequest(
                Number(token.UCID),
                token.password,
                id,
                approval
            ).then((response) => {

            }).catch(error =>{
                console.log(error);
            })
    }

    const handleChange = (event) => {
        setRequest(event.target.value);
    };
    const [request, setRequest] = useState("Requested")
    const requestList = [
        {
            value: 'Requested',
            label: 'Requested',
        },
        {
            value: 'Approved',
            label: 'Approved',
        },
        {
            value: 'Available',
            label: 'Available',
        }
    ];


    return (
        <Box>
            <Box>
                <TextField
                    id="outlined-select-currency-native"
                    select
                    label="Request"
                    value={request}
                    onChange={handleChange}
                    SelectProps={{
                        native: true,
                    }}
                    helperText="Animal status"
                >
                    {requestList.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
                {"\t"}
                <Button
                    size="large"
                    variant="contained"
                    onClick={() => findAll()}
                >Find All</Button>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="right">Species</StyledTableCell>
                            <StyledTableCell align="right">Breed</StyledTableCell>
                            <StyledTableCell align="right">RFID</StyledTableCell>
                            <StyledTableCell align="right">Status</StyledTableCell>

                            <StyledTableCell align="center" >Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {animal.map((row) => (
                            <StyledTableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.species}</StyledTableCell>
                                <StyledTableCell align="right">{row.breed}</StyledTableCell>
                                <StyledTableCell align="right">{row.rfid}</StyledTableCell>
                                <StyledTableCell align="right">{row.status}</StyledTableCell>

                                {row.request ==="Requested" && <StyledTableCell align="center">
                                    <Button
                                        size="large"
                                        variant="contained"
                                        onClick={() => reserveAnimal(row.animalid, "Approved")}
                                    >Approve</Button>

                                    {"\t"}

                                    <Button
                                        color="error"
                                        size="large"
                                        variant="contained"
                                        onClick={() => reserveAnimal(row.animalid, "Available")}
                                    >Reject</Button>
                                </StyledTableCell>}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}