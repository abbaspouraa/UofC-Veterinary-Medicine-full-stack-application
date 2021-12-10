import * as React from 'react';
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useEffect, useState} from "react";
import {TableContainer} from "@mui/material";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import AnimalService from "../service/AnimalService";

export default function NewAnimalAdd() {

    const [animalid, setAnimalid] = useState(null);
    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [sex, setSex] = useState("");
    const [breed, setBreed] = useState("");
    const [age, setAge] = useState(null);
    const [rfid, setRfid] = useState("");
    const [altered, setAltered] = useState("");
    const [weight, setWeight] = useState("");
    const [specialProblem, setSpecialProblem] = useState("");
    const [continuousMedication, setContinuousMedication] = useState("");
    const [specialInstructions, setSpecialInstructions] = useState("");
    const [specialDiet, setSpecialDiet] = useState("");
    const [tatoo, setTatoo] = useState("");
    const [color, setColor] = useState("");
    const [status, setStatus] = useState("");
    const [bookedId, setBookedId] = useState(null);

    const handleSaveAnimal = (e) => {
        e.preventDefault();

        AnimalService.createAnimal(
            {
                animalid: animalid,
                species: species,
                name:name,
                sex: sex,
                breed: breed,
                age: age,
                rfid: rfid,
                altered: altered,
                weight: weight,
                specialProblem: specialProblem,
                continuousMedication: continuousMedication,
                specialInstructions: specialInstructions,
                specialDiet: specialDiet,
                tatoo: tatoo,
                color: color,
                status: status,
                bookedId: bookedId
            }
        ).then(r => {
        }).catch(error =>{console.log(error);
        })
    };


    return (
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">

                    <TableHead>
                        <TableRow>
                            <TableCell>Property</TableCell>
                            <TableCell align="right">Value</TableCell>
                        </TableRow>
                    </TableHead>


                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <TextField id="outlined-basic" label="Name" variant="outlined"
                                           onChange={(e) => setName(e.target.value)}
                                />
                            </TableCell>
                            <TableCell align="right">
                                {name}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                <TextField id="outlined-basic" label="ID" variant="outlined"
                                           onChange={(e) => setAnimalid(e.target.value)}
                                />
                            </TableCell>
                            <TableCell align="right">
                                {animalid}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                <TextField id="outlined-basic" label="Species" variant="outlined"
                                           onChange={(e) => setSpecies(e.target.value)}
                                />
                            </TableCell>
                            <TableCell align="right">
                                {species}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                <TextField id="outlined-basic" label="Sex" variant="outlined"
                                           onChange={(e) => setSex(e.target.value)}
                                />
                            </TableCell>
                            <TableCell align="right">
                                {sex}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                <TextField id="outlined-basic" label="breed" variant="outlined"
                                           onChange={(e) => setBreed(e.target.value)} />
                            </TableCell>
                            <TableCell align="right">
                                {breed}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                <TextField id="outlined-basic" label="age" variant="outlined"
                                           onChange={(e) => setAge(e.target.value)}
                                />
                            </TableCell>
                            <TableCell align="right">
                                {age}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                <TextField id="outlined-basic" label="rfid" variant="outlined"
                                           onChange={(e) => setRfid(e.target.value)}
                                />
                            </TableCell>
                            <TableCell align="right">
                                {rfid}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                <TextField id="outlined-basic" label="altered" variant="outlined"
                                           onChange={(e) => setAltered(e.target.value)}
                                />
                            </TableCell>
                            <TableCell align="right">
                                {altered}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                <TextField id="outlined-basic" label="weight" variant="outlined"
                                           onChange={(e) => setWeight(e.target.value)} />
                            </TableCell>
                            <TableCell align="right">
                                {weight}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                <TextField id="outlined-basic" label="specialProblem" variant="outlined"
                                           onChange={(e) => setSpecialProblem(e.target.value)}
                                />
                            </TableCell>
                            <TableCell align="right">
                                {specialProblem}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                <TextField id="outlined-basic" label="continuousMedication" variant="outlined"
                                           onChange={(e) => setContinuousMedication(e.target.value)}
                                />
                            </TableCell>
                            <TableCell align="right">
                                {continuousMedication}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                <TextField id="outlined-basic" label="specialInstructions" variant="outlined"
                                           onChange={(e) => setSpecialInstructions(e.target.value)}
                                />
                            </TableCell>
                            <TableCell align="right">
                                {specialInstructions}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                <TextField id="outlined-basic" label="specialDiet" variant="outlined"
                                           onChange={(e) => setSpecialDiet(e.target.value)} />
                            </TableCell>
                            <TableCell align="right">
                                {specialDiet}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                <TextField id="outlined-basic" label="tatoo" variant="outlined"
                                           onChange={(e) => setTatoo(e.target.value)}
                                />
                            </TableCell>
                            <TableCell align="right">
                                {tatoo}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                <TextField id="outlined-basic" label="color" variant="outlined"
                                           onChange={(e) => setColor(e.target.value)}
                                />
                            </TableCell>
                            <TableCell align="right">
                                {color}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                <TextField id="outlined-basic" label="status" variant="outlined"
                                           onChange={(e) => setStatus(e.target.value)}
                                />
                            </TableCell>
                            <TableCell align="right">
                                {status}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                <TextField id="outlined-basic" label="bookedId" variant="outlined"
                                           onChange={(e) => setBookedId(e.target.value)}
                                />
                            </TableCell>
                            <TableCell align="right">
                                {bookedId}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                            </TableCell>
                            <TableCell align="right">
                                <Button  variant="contained"
                                onClick={ (e) => handleSaveAnimal(e)}
                                >Save</Button>
                            </TableCell>
                        </TableRow>

                        {/*<h1>{animal.name} is added to the database!</h1>*/}

                    </TableBody>
                </Table>
            </TableContainer>
    );
}
