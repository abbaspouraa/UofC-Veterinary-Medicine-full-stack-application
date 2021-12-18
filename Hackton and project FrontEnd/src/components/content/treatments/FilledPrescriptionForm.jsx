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
// import InputLabel from '@mui/material/InputLabel';
// import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import TreatmentService from '../../service/TreatmentService';
import AnimalService from '../../service/AnimalService';


export default function FinalizeTreatment({statusId, token}) {

    const [statusid, setStatusIs]= useState(null);
    const [careattid, setCareAttId] = useState('');
    const [stage, setStage] = useState('');
    const [animalid, setAnimalId] = useState('');
    const [processDescription, setProcessDescription] = useState('');
    const [temperature, setTemperature] = useState('');
    const [weight, setWeight] = useState('');
    const [heartRate, setHeartRate] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [diagnoseDrug, setDiagnoseDrug] = useState('');
    const [vetid, setVetId] = useState('');


    const stages = [
        {
            value: 'Under Treatment',
            label: 'Keep Under Treatment',
        },
        {
            value: 'Healthy',
            label: 'Finish Treatment',
        },
    ];

    useEffect(() => {
        
        TreatmentService.getAnimalStatusByStatusId(Number(token.UCID), token.password, statusId).then((response) =>{
            setCareAttId(response.data.careattid)
            setStage(response.data.stage)
            setAnimalId(response.data.animalid)
            setProcessDescription(response.data.processDescription)
            setHeartRate(response.data.heartRate)
            setTemperature(response.data.temperature)
            setWeight(response.data.weight)
            setSymptoms(response.data.symptoms)
            setDiagnoseDrug(response.data.diagnoseDrug)
            setVetId(response.data.vetid)
        }).catch(error => {
            console.log(error)
        })
    },[])

    const finalizePrescription = (e) => {
        e.preventDefault();

        TreatmentService.updateAnimalStatus(Number(token.UCID), token.password, statusId, animalStatus).then((response) => {
        }).catch(r => {console.log(r);})
    }

    const animalStatus = {
        stage,
        careattid,
        animalid,
        processDescription,
        temperature,
        weight,
        heartRate,
        symptoms,
        diagnoseDrug,
        vetid
    }

    //  To update animal status to Healthy
    const updateAnimalToHealthy = (e) => {
        if (animalid)
            AnimalService.updateAnimalStatus(
                Number(token.UCID),
                token.password,
                animalid,
                stage
            ).then((response) => {

        }).catch(error =>{
            console.log(error);
        })
    }


    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '45ch' },
            }}
            noValidate
            autoComplete="off"
        >


            <div>
            <TextField
                id="outlined-select-currency"
                select
                label="Next Stage?"
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                helperText="Please select if you want to finish the treatment"
                >
                {stages.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
            </TextField>
            </div>
            <div>
            <TextField disabled id="outlined-disabled" label="Care Attendent ID" variant="outlined" value={careattid}
                            onChange={(e) => setCareAttId(e.target.value)}  />

            </div>
            <div>
            <TextField disabled id="outlined-disabled" label="Animal ID" variant="outlined" value={animalid}
                            onChange={(e) => setAnimalId(e.target.value)}  />
            </div>
            <div>
            <TextField id="outlined-multiline-static" label="Problem Description" variant="outlined" multiline maxRows={4} value={processDescription}
                            onChange={(e) => setProcessDescription(e.target.value)} />
            </div>
            <div>
            <TextField id="outlined-basic" label="Temperature" variant="outlined" value={temperature}
                            onChange={(e) => setTemperature(e.target.value)} />
            </div>
            <div>
            <TextField disabled id="outlined-disabled" label="Weight" variant="outlined" value={weight}
                            onChange={(e) => setWeight(e.target.value)} />
            </div>
            <div>
            <TextField id="outlined-basic" label="Heart Rate" variant="outlined" value={heartRate}
                            onChange={(e) => setHeartRate(e.target.value)} />
            </div>
            <div>
            <TextField id="outlined-multiline-static" label="Symptoms" variant="outlined" multiline 
                    maxRows={4} value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)} />

            </div>
            <div>
            <TextField  id="outlined-basic" label="Diagnosed Drug" helperText="please fill this part before submiting" multiline  maxRows={4}
                        variant="outlined" value={diagnoseDrug}
                            onChange={(e) => setDiagnoseDrug(e.target.value)} />
            </div>
            <div>
            <TextField disabled id="outlined-disabled" label="Health Tech. ID" variant="outlined" value={vetid}
                            onChange={(e) => setVetId(e.target.value)} />
            </div>
            <Button align="center" size="small" variant="contained"
                        onClick={(e) => [finalizePrescription(e), updateAnimalToHealthy(e)]}
            >Submit The Prescription</Button>

        </Box>
    );
}
