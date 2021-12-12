import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import * as React from 'react';
import Box from '@mui/material/Box';
import TreatmentService from './service/TreatmentService';

export default function TreatmentProcess({animalId, token}) {

    // const [statusid, setStatusIs]= useState(null);
    // const [careattid, setCareAttId] = useState('');
    // const [date, setDate] = useState('');
    const [briefDescription, setBriefDescription] = useState('');
    const [temp, setTemp] = useState('');
    const [weight, setWeight] = useState('');
    const [heartRate, setHeartRate] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [diagnoseDrug, setDiagnoseDrug] = useState('');
    const [vetid, setVetId] = useState('');
    //const [] = useState([]);


    const startTreatment = (e) => {
        e.preventDefault();

        TreatmentService.startNewTreatment({
        
            stage: 'started',
            careattid: token.UCID,
            animalid: animalId,
            processDescription: briefDescription,
            temperature: temp,
            weight: weight,
            heartRate: heartRate,
            symptoms: symptoms,
            diagnoseDrug: diagnoseDrug,
            vetid: vetid
        }).then(r => {console.log(r);})
    }

    // const reserveAnimal = (id) => {
    //     if (id)
    //         AnimalService.updateAnimalStatus(id, "Requested").then((response) => {

    //     }).catch(error =>{
    //         console.log(error);
    //     })
    // }


    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '30ch' },
            }}
            noValidate
            autoComplete="off"
        >
            {/* <TextField id="outlined-basic" label="Animal ID" variant="outlined" value={fname}
                            onChange={(e) => setFName(e.target.value)} /> */}

            <h1>test: {animalId}</h1>

            <h2> Care Att: {token.UCID}</h2>
            <h3>---  To be filled By Care Att. --- </h3>
            {/* <TextField id="outlined-basic" label="Care Attendent ID" variant="outlined" value={careattid}
                            onChange={(e) => setCareAttId(e.target.value)}  /> */}
            {/* <TextField id="outlined-basic" label="Date" variant="outlined" value={date}
                            onChange={(e) => setDate(e.target.value)} /> */}
            <TextField id="outlined-multiline-static" label="Problem Description" variant="outlined" multiline 
                    maxRows={4} value={briefDescription}
                            onChange={(e) => setBriefDescription(e.target.value)} />
            <TextField id="outlined-basic" label="Temperature" variant="outlined" value={temp}
                            onChange={(e) => setTemp(e.target.value)} />
            <TextField id="outlined-basic" label="Weight" variant="outlined" value={weight}
                            onChange={(e) => setWeight(e.target.value)} />
            <TextField id="outlined-basic" label="Heart Rate" variant="outlined" value={heartRate}
                            onChange={(e) => setHeartRate(e.target.value)} />
            <TextField id="outlined-multiline-static" label="Symptoms" variant="outlined" multiline 
                    maxRows={4} value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)} />
            {/* <h3>---  To be filled By Vet --- </h3> */}

            {/* <TextField id="outlined-basic" label="Diagnosed Drug" variant="outlined" value={diagnoseDrug}
                            onChange={(e) => setDiagnoseDrug(e.target.value)} /> */}
            {/* <TextField id="outlined-basic" label="Vet ID" variant="outlined" value={vetid}
                            onChange={(e) => setVetId(e.target.value)} />


            <TextField
                    id="outlined-multiline-static"
                    label="Diagnosed Drug"
                    multiline 
                    maxRows={4}
                    value={diagnoseDrug}
                    onChange={(e) => setDiagnoseDrug(e.target.value)}
                    variant="outlined"
                    /> */}

            <Button size="small" variant="contained"
                        onClick={(e) => startTreatment(e)}
            >Submit</Button>

        </Box>
    );
}
