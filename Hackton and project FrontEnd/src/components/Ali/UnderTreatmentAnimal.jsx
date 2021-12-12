import React, {useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TreatmentService from "./service/TreatmentService";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AnimalPopup from "../amir/AnimalPopup";
import FinalizeTreatment from "./FilledPrescriptionForm";
//added for style
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
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


export default function UnderTreatmentAnimal() {


    const [openAlert, setOpenAlert] = React.useState(false);
    const [anchorElAP, setAnchorElAP] = React.useState(null);

    const handleClickViewAlert = (event, animalStatus) => {
        setChosenAnimalStatus(animalStatus);
        setAnchorElAP(event.currentTarget);
        setOpenAlert((previousOpen) => !previousOpen);
    };

    const canBeOpenAP = openAlert && Boolean(anchorElAP);




    const [animalStatus, setAnimalStatus] = useState([])

    useEffect(() => {

        TreatmentService.getAlertingAnimalStatus("Under Treatment").then((Response) => {
            setAnimalStatus(Response.data)
        })
    }, [])


    const [chosenAnimalStatus, setChosenAnimalStatus] = useState(0)


    

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Animal ID</StyledTableCell>
                        <StyledTableCell align="center">Problem Description</StyledTableCell>
                        <StyledTableCell align="center">Prescription</StyledTableCell>
                        <StyledTableCell align="center" >Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {animalStatus.map((row) => (
                        <StyledTableRow
                            key={row.statusid}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <StyledTableCell align="center" component="th" scope="row">
                                {row.animalid}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.processDescription}</StyledTableCell>
                            <StyledTableCell align="center">{row.diagnoseDrug}</StyledTableCell>
                        
                            <StyledTableCell align="center">
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={(e) => handleClickViewAlert(e, row)}
                                >View Prescription</Button>
                            </StyledTableCell>

                            {canBeOpenAP && <AnimalPopup
                                        content={<>
                                            <h3>Prescription Form</h3>
                                            <div className="add-user">
                                                <FinalizeTreatment statusId={chosenAnimalStatus.statusid} />
                                            </div>
                                            <div>
                                                <Stack spacing={2} direction="row">
                                                    <Button variant="outlined" onClick={handleClickViewAlert}>Close</Button>
                                                </Stack>
                                            </div>
                                        </>}
                                        handleClose={handleClickViewAlert}
                             />}


                            {/* <TableCell align="center">
                                <Button
                                    size="large"
                                    variant="contained"
                                    onClick={() => reserveAnimal(row.animalid, "Newly approved")}
                                >Approve</Button>
                            </TableCell> */}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
