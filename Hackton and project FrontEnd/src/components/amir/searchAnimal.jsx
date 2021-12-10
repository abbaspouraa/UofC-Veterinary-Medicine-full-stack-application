import Box from "@mui/material/Box";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";
import {useEffect, useState} from "react";
import AnimalService from "../service/AnimalService";
import Stack from "@mui/material/Stack";
import AnimalPopup from "./AnimalPopup";
import NewAnimalAdd from "./newAnimalAdd";
import AnimalTable from "./animalTable";


export default function SearchAnimal({token}) {

    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [sex, setSex] = useState("")
    const [items, setItems] = useState([]);

    const [openAddAnimal, setOpenAddAnimal] = React.useState(false);
    const [anchorElAA, setAnchorElAA] = React.useState(null);

    const handleClickAddAnimal = (event) => {
        setAnchorElAA(event.currentTarget);
        setOpenAddAnimal((previousOpen) => !previousOpen);
    };

    const canBeOpenAA = openAddAnimal && Boolean(anchorElAA);


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
                <h1>Search Animal</h1>

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



            <AnimalTable items={items} token={token} />


            {/*Add animal button*/}
            {token.token === "Admin" && <
                Button
                size="large"
                variant="contained"
                onClick={handleClickAddAnimal}
            >Add a new animal</Button>}


            {canBeOpenAA && <AnimalPopup
                content={<>
                    <h3>New Animal</h3>
                    <div className="add-user">
                        <NewAnimalAdd />
                    </div>
                    <div>
                        <Stack spacing={1} direction="row">
                            <Button variant="outlined" onClick={handleClickAddAnimal}>Close</Button>
                        </Stack>
                    </div>
                </>}
                handleClose={handleClickAddAnimal}
            />}

        </div>
    );
}