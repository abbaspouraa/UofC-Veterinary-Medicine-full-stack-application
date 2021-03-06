import * as React from 'react';
import Paper from "@mui/material/Paper";
import TextField from '@mui/material/TextField';
import {useState} from "react";
import {TableContainer} from "@mui/material";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import AnimalService from "../../../service/AnimalService";
import SaveIcon from '@mui/icons-material/Save';

export default function AddEditAnimal({animal, token}) {

    const [name, setName] = useState(animal.name);
    const [species, setSpecies] = useState(animal.species);
    const [sex, setSex] = useState(animal.sex);
    const [breed, setBreed] = useState(animal.breed);
    const [age, setAge] = useState(animal.age);
    const [rfid, setRfid] = useState(animal.rfid);
    const [altered, setAltered] = useState(animal.altered);
    const [weight, setWeight] = useState(animal.weight);
    const [specialProblem, setSpecialProblem] = useState(animal.specialProblem);
    const [continuousMedication, setContinuousMedication] = useState(animal.continuousMedication);
    const [specialInstructions, setSpecialInstructions] = useState(animal.specialInstructions);
    const [specialDiet, setSpecialDiet] = useState(animal.specialDiet);
    const [tattoo, setTattoo] = useState(animal.tatoo);
    const [color, setColor] = useState(animal.color);
    const [status, setStatus] = useState(animal.status)

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const statusList = [
        {
            value: 'Healthy',
            label: 'Healthy',
        },
        {
            value: 'Under treatment',
            label: 'Under treatment',
        }
    ];

    const handleSaveAnimal = (e) => {
        e.preventDefault();
        AnimalService.createAnimal(
            Number(token.UCID),
            token.password,
            {
                animalid: animal.animalid,
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
                tatoo: tattoo,
                color: color,
                status: status,
                bookedid: animal.bookedid,
                request: animal.request
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
                            <TextField id="outlined-basic" label="tattoo" variant="outlined"
                                       onChange={(e) => setTattoo(e.target.value)}
                            />
                        </TableCell>
                        <TableCell align="right">
                            {tattoo}
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
                            <TextField
                                id="outlined-select-currency-native"
                                select
                                label="Status"
                                value={status}
                                onChange={handleChange}
                                SelectProps={{
                                    native: true,
                                }}
                                helperText="Animal status"
                            >
                                {statusList.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </TableCell>
                        <TableCell align="right">
                            <Button  variant="contained"
                                     endIcon={<SaveIcon />}
                                     onClick={ (e) => handleSaveAnimal(e)}
                            >Save</Button>
                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </TableContainer>
    );
}
