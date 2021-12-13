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
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Species</TableCell>
                            <TableCell align="right">Breed</TableCell>
                            <TableCell align="right">RFID</TableCell>
                            <TableCell align="right">Status</TableCell>

                            <TableCell align="center" >Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {animal.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.species}</TableCell>
                                <TableCell align="right">{row.breed}</TableCell>
                                <TableCell align="right">{row.rfid}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>

                                {row.request ==="Requested" && <TableCell align="center">
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
                                </TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}