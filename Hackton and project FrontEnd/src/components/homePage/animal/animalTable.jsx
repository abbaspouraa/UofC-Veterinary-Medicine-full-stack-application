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
import DeleteIcon from "@mui/icons-material/Delete";
import PetsIcon from '@mui/icons-material/Pets';

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
                        <StyledTableCell >Name</StyledTableCell >
                        <StyledTableCell  align="right">Species</StyledTableCell >
                        <StyledTableCell  align="right">Breed</StyledTableCell >
                        <StyledTableCell  align="right">RFID</StyledTableCell >
                        <StyledTableCell  align="right">Status</StyledTableCell >
                        {token.token === "Instructor" && <StyledTableCell  align="right">Request</StyledTableCell >}
                        {token.token === "Admin" && <StyledTableCell  align="right">Requested By</StyledTableCell >}
                        <StyledTableCell  align="right">View Profile</StyledTableCell >
                        {token.token === "Instructor" && <StyledTableCell  align="right">Request animal</StyledTableCell >}
                        {token.token === "Admin" && <StyledTableCell  align="right">DELETE</StyledTableCell >}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((row) => (
                        <StyledTableRow
                            key={row.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.species}</StyledTableCell>
                            <StyledTableCell align="right">{row.breed}</StyledTableCell>
                            <StyledTableCell align="right">{row.rfid}</StyledTableCell>
                            <StyledTableCell align="right">{row.status}</StyledTableCell>

                            {token.token === "Instructor" && <StyledTableCell align="right">{row.request}</StyledTableCell>}
                            {token.token === "Admin" && <StyledTableCell align="right">{row.bookedId}</StyledTableCell>}

                            <StyledTableCell align="right">
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={(e) => handleClickViewAnimal(e, row)}
                                    startIcon={<PetsIcon />}
                                >Profile</Button>
                            </StyledTableCell>

                            {token.token === "Instructor" && <StyledTableCell align="right">
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={() => reserveAnimal(row.animalid)}
                                >request</Button>
                            </StyledTableCell>}

                            {token.token === "Admin" && <StyledTableCell align="right">
                                <Button
                                color="error"
                                size="small"
                                variant="contained"
                                onClick={() => deleteAnimal(row.animalid)}
                                startIcon={<DeleteIcon />}
                            >Delete</Button>
                            </StyledTableCell>}

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

                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}