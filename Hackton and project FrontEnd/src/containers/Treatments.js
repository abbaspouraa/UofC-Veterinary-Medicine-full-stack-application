import React, { useState } from 'react';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';

export default function Treatments(){

    return(
        <div className='Treatments'>
            <h1>
                Animals Currently Under Treatment
            </h1>
            <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Name</TableCell>
                                <TableCell >Status</TableCell>
                                <TableCell >Problem/Procedure</TableCell>
                            </TableRow>
                        </TableHead>
                        {/* <TableBody>
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

                                </TableRow>
                            ))}
                        </TableBody> */}
                    </Table>
                </TableContainer>
        </div>
    )        
}