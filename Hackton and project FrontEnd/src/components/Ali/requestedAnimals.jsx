import React, {useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import AnimalService from '../service/AnimalService'
import Button from "@mui/material/Button";

const ListRequestedAnimals = () => {

    const [animal, setAnimal] = useState([])

    useEffect(() => {

        AnimalService.getAllAnimalByStatus("Requested").then((Response) => {
            setAnimal(Response.data)
        })
    }, [])


    const reserveAnimal = (id, approval) => {
        if (id)
            AnimalService.updateAnimalStatus(id, approval).then((response) => {

            }).catch(error =>{
                console.log(error);
            })
    }


    // const getAllAnimalByStatus = () => {
    //     AnimalService.getAllAnimal().then((response) => {
    //         setAnimal(response.data)
    //         console.log(response.data);
    //     }).catch(error =>{
    //         console.log(error);
    //     })
    //}

    // const deleteEmployee = (employeeId) => {
    //    EmployeeService.deleteEmployee(employeeId).then((response) =>{
    //     getAllEmployees();

    //    }).catch(error =>{
    //        console.log(error);
    //    })

    // }

    return (
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

                            <TableCell align="center">
                                <Button
                                    size="large"
                                    variant="contained"
                                    onClick={() => reserveAnimal(row.animalid, "Newly approved")}
                                >Approve</Button>

                                <Button
                                    size="large"
                                    variant="contained"
                                    onClick={() => reserveAnimal(row.animalid, "Rejected")}
                                >Reject</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ListRequestedAnimals