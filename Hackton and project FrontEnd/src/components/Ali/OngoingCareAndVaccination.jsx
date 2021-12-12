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
import Box from '@mui/material/Box';
import OngoingCareService from './service/OngoingCareService';



export default function OngoingCareAndVaccination({animalId, token}) {

    const [careAttId, setCareAttId] = useState(token.UCID);
    const [animalid, setAnimalId] = useState(animalId);
    const [briefDescription, setBriefDescription] = useState('');
    const [weight, setWeight] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [drug, setDrug] = useState('');
    const [nextDue, setNextDue] = useState('');
    const [note, setNote] = useState('');


    const startCareOrVaccination = (e) => {
        e.preventDefault();

        OngoingCareService.startNewCare({
        
            careAttId: token.UCID,
            animalid: animalId,
            processDescription: briefDescription,
            weight: weight,
            drug: drug,
            nextDue: nextDue,
            note: note
        }).then(r => {console.log(r);})
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
            

            <h3 text-align ='center'>Checkup Form</h3>


            <TextField disabled id="outlined-disabled" label="Care Attendent ID" variant="outlined" value={careAttId}
                            onChange={(e) => setCareAttId(e.target.value)}  />


            <TextField disabled id="outlined-disabled" label="Animal ID" variant="outlined" value={animalid}
                            onChange={(e) => setAnimalId(e.target.value)}  />

            <TextField  required id="outlined-error" label="Process Description" helperText="please fill this part before submiting" variant="outlined" multiline 
                    maxRows={4} value={briefDescription}
                            onChange={(e) => setBriefDescription(e.target.value)} />
            
            <TextField id="outlined-basic" label="Weight" variant="outlined" value={weight}
                            onChange={(e) => setWeight(e.target.value)} />
           
           <TextField required id="outlined-error" label="Drug" helperText="please fill this part before submiting" multiline  maxRows={4}
                        variant="outlined" value={drug}
                            onChange={(e) => setDrug(e.target.value)} />

            <TextField id="outlined-basic" label="Next Due" variant="outlined" value={nextDue}
                            onChange={(e) => setNextDue(e.target.value)} />

            <TextField id="outlined-basic" label="Notes" multiline  maxRows={4} variant="outlined" value={note}
                            onChange={(e) => setNote(e.target.value)} />                

            <Button size="small" variant="contained"
                        onClick={(e) => startCareOrVaccination(e)}
            >Submit</Button>

        </Box>
    );
}
