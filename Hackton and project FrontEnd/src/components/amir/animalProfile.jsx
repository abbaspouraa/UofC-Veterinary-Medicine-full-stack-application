import React, {useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {TabPanel} from "./homelPageTabs";
import {Box} from "@mui/material";
import Comments from "./comments";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";


function AnimalProfile({animal}) {
    const [value, setValue] = React.useState(0);

    function createData(animalItem, animalData) {
        return { animalItem, animalData };
    }

    const rows = [
        createData('Name', animal.name),
        createData('ID', animal.id),
        createData('Species', animal.species),
        createData('Sex', animal.sex),
        createData('Breed', animal.breed),
        createData('Age', animal.age),
        createData('RFID', animal.rfid),
        createData('Alerted', animal.altered),
        createData('Weight', animal.weight),
        createData('Special Problem', animal.specialproblem),
        createData('Continues Medication', animal.continuesmedication),
        createData('Special Instructions', animal.specialinstruction),
        createData('Special Diet', animal.diet),
        createData('Tattoo', animal.tatoo),
        createData('City tattoo', animal.citytatoo),
        createData('Coat color', animal.color),
        createData('Status', animal.status),
        createData('Microchip', animal.microchip),
    ]

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="AnimalProfile" {...a11yProps(0)} />
                    <Tab label="Comments" {...a11yProps(1)} />
                </Tabs>
            </Box>
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

            <TabPanel value={value} index={1}>
                <Comments />
            </TabPanel>
        </Box>
    );
}

export default AnimalProfile;