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

export default function TreatmentProcess({animalName}) {


    const [careattid, setCareAttId] = useState('');
    // const [animalName, setAnimalName] = useState('');
    const [date, setDate] = useState('');
    const [processDescription, setProcessDescription] = useState('');
    const [temperature, setTemperature] = useState('');
    const [weight, setWeight] = useState('');
    const [heartRate, setHeartRate] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [diagnoseDrug, setDiagnoseDrug] = useState('');
    const [vetid, setVetId] = useState('');
    //const [] = useState([]);


    const startTreatment = () => {

        TreatmentService.startNewTreatment(careattid,animalName,date,processDescription,temperature,weight,
            heartRate,symptoms,diagnoseDrug,vetid).catch(error =>{
            console.log(error);
        })
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

            <h1>test: {animalName}</h1>
            <h3>---  To be filled By Care Att. --- </h3>
            <TextField id="outlined-basic" label="Care Attendent ID" variant="outlined" value={careattid}
                            onChange={(e) => setCareAttId(e.target.value)}  />
            <TextField id="outlined-basic" label="Date" variant="outlined" value={date}
                            onChange={(e) => setDate(e.target.value)} />
            <TextField id="outlined-basic" label="Problem Description" variant="outlined" value={processDescription}
                            onChange={(e) => setProcessDescription(e.target.value)} />
            <TextField id="outlined-basic" label="Temperature" variant="outlined" value={temperature}
                            onChange={(e) => setTemperature(e.target.value)} />
            <TextField id="outlined-basic" label="Weight" variant="outlined" value={weight}
                            onChange={(e) => setWeight(e.target.value)} />
            <TextField id="outlined-basic" label="Heart Rate" variant="outlined" value={heartRate}
                            onChange={(e) => setHeartRate(e.target.value)} />
            <TextField id="outlined-basic" label="Symptoms" variant="outlined" value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)} />
            <h3>---  To be filled By Vet --- </h3>

            <TextField id="outlined-basic" label="Symptoms" variant="outlined" value={diagnoseDrug}
                            onChange={(e) => setDiagnoseDrug(e.target.value)} />
            <TextField id="outlined-basic" label="Symptoms" variant="outlined" value={vetid}
                            onChange={(e) => setVetId(e.target.value)} />

            <Button size="small" variant="contained"
                        onClick={startTreatment}
            >Submit</Button>

        </Box>
    );
}
