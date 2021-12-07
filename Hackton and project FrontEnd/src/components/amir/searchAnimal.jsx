import Box from "@mui/material/Box";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import {useEffect, useState} from "react";
import AnimalService from "../service/AnimalService";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AnimalProfile from "./animalProfile";
import Stack from "@mui/material/Stack";
import AnimalPopup from "./AnimalPopup";
import NewAnimalAdd from "./newAnimalAdd";


export default function SearchAnimal({token}) {

    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [sex, setSex] = useState("")

    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);


    const [openAnimalProfile, setOpenAnimalProfile] = React.useState(false);
    const [anchorElAP, setAnchorElAP] = React.useState(null);

    const handleClickViewAnimal = (event) => {
        setAnchorElAP(event.currentTarget);
        setOpenAnimalProfile((previousOpen) => !previousOpen);
    };

    const canBeOpenAP = openAnimalProfile && Boolean(anchorElAP);
    // const id = canBeOpen ? 'transition-popper' : undefined;

    const [openAddAnimal, setOpenAddAnimal] = React.useState(false);
    const [anchorElAA, setAnchorElAA] = React.useState(null);

    const handleClickAddAnimal = (event) => {
        setAnchorElAA(event.currentTarget);
        setOpenAddAnimal((previousOpen) => !previousOpen);
    };

    const canBeOpenAA = openAddAnimal && Boolean(anchorElAA);


    useEffect(() => {
        // getAllAnimals();
       searchAnimals();
    }, [])

    const searchAnimals = () => {
        AnimalService.getSearchAnimal(name, species, sex).then((response) => {
            setItems(response.data)
        }).catch(error =>{
            console.log(error);
        })
    }

    const getAllAnimals = () => {
        AnimalService.getAllAnimal().then((response) => {
            setItems(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }


    const reserveAnimal = (id) => {
        if (id)
            AnimalService.updateAnimalStatus(id, "Requested").then((response) => {

        }).catch(error =>{
            console.log(error);
        })
    }


    if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (
            <div>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m: 1, width: '25ch'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>Search Animal</div>

                    <TextField
                        id="outlined-basic"
                        label="Name"
                        value={name}
                        variant="outlined"
                        onChange={(event) => setName(event.target.value)}
                    />

                    <TextField
                        id="filled-basic"
                        label="Species"
                        value={species}
                        variant="outlined"
                        onChange={(event) => setSpecies(event.target.value)}
                    />

                    <TextField
                        id="standard-basic"
                        label="Sex"
                        value={sex}
                        variant="outlined"
                        onChange={(event) => setSex(event.target.value)}
                    />

                    <Button
                        size="large"
                        variant="contained"
                        onClick={() => searchAnimals()}
                    >Search</Button>
                </Box>

                {/*<AnimalLists />*/}
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Species</TableCell>
                                <TableCell align="right">Breed</TableCell>
                                <TableCell align="right">RFID</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Request animal</TableCell>
                                {token.token === "Admin" && <TableCell align="right">View Profile</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((row) => (
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

                                    <TableCell align="right">
                                        <Button
                                            size="small"
                                            variant="contained"
                                            onClick={() => reserveAnimal(row.animalid)}
                                        >request</Button>
                                    </TableCell>

                                    {token.token === "Admin" && <TableCell align="right">
                                        <Button
                                            size="small"
                                            variant="contained"
                                            onClick={handleClickViewAnimal}
                                        >View Profile</Button>
                                    </TableCell>}

                                    {canBeOpenAP && <AnimalPopup
                                        content={<>
                                            <h3>Animal Profile</h3>
                                            <div className="add-user">
                                                <AnimalProfile animal={row} />
                                            </div>
                                            <div>
                                                <Stack spacing={2} direction="row">
                                                    <Button variant="outlined" onClick={handleClickViewAnimal}>Close</Button>
                                                </Stack>
                                            </div>
                                        </>}
                                        handleClose={handleClickViewAnimal}
                                    />}

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


                <div>{token.token === "Admin" && <
                    Button
                    size="large"
                    variant="contained"
                    onClick={handleClickAddAnimal}
                >Add a new animal</Button>}
                </div>

                {canBeOpenAA && <AnimalPopup
                    content={<>
                        <h3>New Animal</h3>
                        <div className="add-user">
                            <NewAnimalAdd />
                        </div>
                        <div>
                            <Stack spacing={2} direction="row">
                                <Button className="save-icon" variant="outlined" onClick={handleClickAddAnimal}>Save</Button>
                                <Button className="close-icon" variant="outlined" onClick={handleClickAddAnimal}>Cancel</Button>
                            </Stack>
                        </div>
                    </>}
                    handleClose={handleClickAddAnimal}
                />}

            </div>
        );
    }
}