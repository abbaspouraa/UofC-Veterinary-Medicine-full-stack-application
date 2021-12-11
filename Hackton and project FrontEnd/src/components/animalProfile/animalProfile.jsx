import React, {useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {TabPanel} from "../homePage/homelPageTabs";


export default function AnimalProfile({animal}) {
    const [value, setValue] = React.useState(0);

    function createData(animalItem, animalData) {
        return { animalItem, animalData };
    }

    const rows = [
        createData('Name', animal.name),
        createData('ID', animal.animalid),
        createData('Species', animal.species),
        createData('Sex', animal.sex),
        createData('Breed', animal.breed),
        createData('Age', animal.age),
        createData('RFID', animal.rfid),
        createData('Alerted', animal.altered),
        createData('Weight', animal.weight),
        createData('Special Problem', animal.specialProblem),
        createData('Continues Medication', animal.continuousMedication),
        createData('Special Instructions', animal.specialInstructions),
        createData('Special Diet', animal.specialDiet),
        createData('Tattoo', animal.tatoo),
        createData('City tattoo', animal.citytatoo),
        createData('Coat color', animal.color),
        createData('Status', animal.status),
        createData('Microchip', animal.microchip),
    ]

    return (
        // <Box>
        <TableContainer component={Paper}>
            <TabPanel value={value} index={0}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Item</TableCell>
                                <TableCell align="left">Data</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.animalItem}
                                    </TableCell>
                                    <TableCell align="left">{row.animalData}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>
        </TableContainer>
        // </Box>
    );
}