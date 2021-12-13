import React, {useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TreatmentService from "./service/TreatmentService";

//added for style
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import OngoingCareService from "./service/OngoingCareService";
import { Box } from "@mui/system";



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


export default function AnimalHealthRecord({animalId, token}) {


    const [ongoingCare, setOngoingCare] = useState([])
    const [treatmentRecords, setTreatmentRecords] = useState([])

    useEffect(() => {

        OngoingCareService.getAnimalCareHistory(token.UCID, token.password,animalId).then((Response) => {
            setOngoingCare(Response.data)
        })

        TreatmentService.getAnimalStatusRecordsByAnimalId(Number(token.UCID), token.password, animalId).then((Response) => {
            setTreatmentRecords(Response.data)
        })
    }, [])


    return (
        <Box>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="customized table">
                <TableHead>
                <h2>Checkups</h2>
                    <TableRow>
                        <StyledTableCell align="center">Animal ID</StyledTableCell>
                        <StyledTableCell align="center">Care Provider ID</StyledTableCell>
                        <StyledTableCell align="center">Problem Description</StyledTableCell>
                        <StyledTableCell align="center">Weight</StyledTableCell>
                        <StyledTableCell align="center">Prescription</StyledTableCell>
                        <StyledTableCell align="center">Next Due</StyledTableCell>
                        <StyledTableCell align="center">Notes</StyledTableCell>
                        <StyledTableCell align="center">Date</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ongoingCare.map((row) => (
                        <StyledTableRow
                            key={row.ongoingCareId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <StyledTableCell align="center" component="th" scope="row">
                                {row.animalid}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.careAttId}</StyledTableCell>
                            <StyledTableCell align="center">{row.processDescription}</StyledTableCell>
                            <StyledTableCell align="center">{row.weight}</StyledTableCell>
                            <StyledTableCell align="center">{row.nextDue}</StyledTableCell>
                            <StyledTableCell align="center">{row.drug}</StyledTableCell>
                            <StyledTableCell align="center">{row.note}</StyledTableCell>
                            <StyledTableCell align="center">{row.createdAt}</StyledTableCell>
                            
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="customized table">
                <TableHead>
                <h2>Treatments</h2>
                    <TableRow>
                        <StyledTableCell align="center">Animal ID</StyledTableCell>
                        <StyledTableCell align="center">Care Provider ID</StyledTableCell>
                        <StyledTableCell align="center">Problem Description</StyledTableCell>
                        <StyledTableCell align="center">Weight</StyledTableCell>
                        <StyledTableCell align="center">Temperature</StyledTableCell>
                        <StyledTableCell align="center">Heart Rate</StyledTableCell>
                        <StyledTableCell align="center">Symptoms</StyledTableCell>
                        <StyledTableCell align="center">Prescription</StyledTableCell>
                        <StyledTableCell align="center">Health Tech. ID</StyledTableCell>
                        <StyledTableCell align="center">Date</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {treatmentRecords.map((row) => (
                        <StyledTableRow
                            key={row.statusid}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <StyledTableCell align="center" component="th" scope="row">
                                {row.animalid}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.careattid}</StyledTableCell>
                            <StyledTableCell align="center">{row.processDescription}</StyledTableCell>
                            <StyledTableCell align="center">{row.temperature}</StyledTableCell>
                            <StyledTableCell align="center">{row.weight}</StyledTableCell>
                            <StyledTableCell align="center">{row.heartRate}</StyledTableCell>
                            <StyledTableCell align="center">{row.symptoms}</StyledTableCell>
                            <StyledTableCell align="center">{row.diagnoseDrug}</StyledTableCell>
                            <StyledTableCell align="center">{row.vetid}</StyledTableCell>
                            <StyledTableCell align="center">{row.createdAt}</StyledTableCell>
                            <StyledTableCell align="center">{row.stage}</StyledTableCell>

                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Box>
        
    );
}
