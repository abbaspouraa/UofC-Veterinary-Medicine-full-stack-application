import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import AnimalPopup from "./AnimalPopup";
import AnimalProfile from "./animalProfile";
import Stack from "@mui/material/Stack";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import AnimalService from "../service/AnimalService";




export default function AnimalTable({items, token}) {


    const [openAnimalProfile, setOpenAnimalProfile] = React.useState(false);
    const [anchorElAP, setAnchorElAP] = React.useState(null);

    const handleClickViewAnimal = (event) => {
        setAnchorElAP(event.currentTarget);
        setOpenAnimalProfile((previousOpen) => !previousOpen);
    };

    const canBeOpenAP = openAnimalProfile && Boolean(anchorElAP);
    // const id = canBeOpen ? 'transition-popper' : undefined;

    const reserveAnimal = (id) => {
        if (id)
            AnimalService.updateAnimalStatus(id, "Requested").then((response) => {

            }).catch(error =>{
                console.log(error);
            })
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
                        <TableCell align="right">Request animal</TableCell>
                        {token.token === "Admin" && <TableCell align="right">View Profile</TableCell>}
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
                                        <AnimalProfile animal={row}/>
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
    );
}