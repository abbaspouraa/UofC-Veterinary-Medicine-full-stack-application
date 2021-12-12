import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
// import Stack from '@mui/material/Stack';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, {tableCellClasses} from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import * as React from 'react';
import Box from '@mui/material/Box';
import TreatmentService from './service/TreatmentService';

//For changing animal status
import AnimalService from '../service/AnimalService';

export default function TreatmentProcess({animalId, token}) {

    const [careattid, setCareAttId] = useState(token.UCID);
    const [animalid, setAnimalId] = useState(animalId);
    const [briefDescription, setBriefDescription] = useState('');
    const [temp, setTemp] = useState('');
    const [weight, setWeight] = useState('');
    const [heartRate, setHeartRate] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [diagnoseDrug, setDiagnoseDrug] = useState('');
    const [vetid, setVetId] = useState('');


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


    //  To update animal status to Sick
    const updateAnimalToSick = (e) => {
        if (animalId)
            AnimalService.updateAnimalStatus(animalId, "Under Treatment").then((response) => {

        }).catch(error =>{
            console.log(error);
        })
    }

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '30ch' },
            }}
            noValidate
            autoComplete="off"
        >
            

           
            <h3>---  To be filled By Care Att. --- </h3>
            <TextField disabled id="outlined-disabled" label="Care Attendent ID" variant="outlined" value={careattid}
                            onChange={(e) => setCareAttId(e.target.value)}  />

            <TextField disabled id="outlined-disabled" label="Animal ID" variant="outlined" value={animalid}
                            onChange={(e) => setAnimalId(e.target.value)}  />
           
            <TextField  required id="outlined-error" label="Problem Description" helperText="please fill this part before submiting" variant="outlined" multiline 
                    maxRows={4} value={briefDescription}
                            onChange={(e) => setBriefDescription(e.target.value)} />
            <TextField id="outlined-basic" label="Temperature" variant="outlined" value={temp}
                            onChange={(e) => setTemp(e.target.value)} />
            <TextField id="outlined-basic" label="Weight" variant="outlined" value={weight}
                            onChange={(e) => setWeight(e.target.value)} />
            <TextField id="outlined-basic" label="Heart Rate" variant="outlined" value={heartRate}
                            onChange={(e) => setHeartRate(e.target.value)} />
            <TextField required id="outlined-error" id="outlined-multiline-static" label="Symptoms" helperText="please fill this part before submiting" variant="outlined" multiline 
                    maxRows={4} value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)} />

            <Button size="small" variant="contained"
                        onClick={(e) => [startTreatment(e), updateAnimalToSick(e)]}
            >Submit</Button>

        </Box>
    );
}
