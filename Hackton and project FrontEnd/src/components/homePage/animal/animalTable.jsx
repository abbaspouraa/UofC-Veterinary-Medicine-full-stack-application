import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import AnimalPopup from "./animalProfile/AnimalPopup";
import Stack from "@mui/material/Stack";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import AnimalService from "../../service/AnimalService";
import AnimalTabs from "./animalProfile/animalTabs";
import {useState} from "react";


export default function AnimalTable({items, token}) {

    const [openAnimalProfile, setOpenAnimalProfile] = React.useState(false);
    const [anchorElAP, setAnchorElAP] = React.useState(null);

    const [chosenAnimal, setChosenAnimal] = useState(0);

    const handleClickViewAnimal = (event, animal) => {
        setChosenAnimal(animal);
        setAnchorElAP(event.currentTarget);
        setOpenAnimalProfile((previousOpen) => !previousOpen);
    };

    const canBeOpenAP = openAnimalProfile && Boolean(anchorElAP);

    const reserveAnimal = (id) => {
        if (id)
            AnimalService.updateAnimalRequest(
                Number(token.UCID),
                token.password,
                id,
                "Requested"
            ).then((response) => {

            }).catch(error =>{
                console.log(error);
            })
    }

    const deleteAnimal = (id) => {
      AnimalService.deleteAnimal(
          Number(token.UCID),
          token.password,
          id
      ).then(r => {
          console.log(r);
      });
    }


    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Species</TableCell>
                        <TableCell align="right">Breed</TableCell>
                        <TableCell align="right">RFID</TableCell>
                        <TableCell align="right">Status</TableCell>
                        {token.token === "Instructor" && <TableCell align="right">Request</TableCell>}
                        {token.token === "Admin" && <TableCell align="right">Requested By</TableCell>}
                        <TableCell align="right">View Profile</TableCell>
                        {token.token === "Instructor" && <TableCell align="right">Request animal</TableCell>}
                        {token.token === "Admin" && <TableCell align="right">DELETE</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.species}</TableCell>
                            <TableCell align="right">{row.breed}</TableCell>
                            <TableCell align="right">{row.rfid}</TableCell>
                            <TableCell align="right">{row.status}</TableCell>

                            {token.token === "Instructor" && <TableCell align="right">{row.request}</TableCell>}
                            {token.token === "Admin" && <TableCell align="right">{row.bookedId}</TableCell>}

                            <TableCell align="right">
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={(e) => handleClickViewAnimal(e, row)}
                                >Profile</Button>
                            </TableCell>

                            {token.token === "Instructor" && <TableCell align="right">
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={() => reserveAnimal(row.animalid)}
                                >request</Button>
                            </TableCell>}

                            {token.token === "Admin" && <TableCell align="right">
                                <Button
                                color="error"
                                size="small"
                                variant="contained"
                                onClick={() => deleteAnimal(row.animalid)}
                            >Delete</Button>
                            </TableCell>}

                            {canBeOpenAP && <AnimalPopup
                                content={<>
                                    <div>
                                        <AnimalTabs animal={chosenAnimal} token={token}/>
                                    </div>
                                    <div>
                                        <Stack spacing={2} direction="row">
                                            <Button variant="outlined" onClick={handleClickViewAnimal}>Close</Button>
                                        </Stack>
                                    </div>
                                </>}
                                handleClose={(e) => handleClickViewAnimal(e, chosenAnimal)}
                            />}

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}