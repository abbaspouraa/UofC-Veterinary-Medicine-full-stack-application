import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import TreatmentService from '../../service/TreatmentService';

export default function EmptyPrescriptionForm({statusId, token}) {

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


    const givePrescription = (e) => {
        e.preventDefault();

        TreatmentService.updateAnimalStatus(Number(token.UCID), token.password, statusId, animalStatus).then((response) => {
        }).catch(r => {console.log(r);})
    }

    const animalStatus = {
        stage: 'Under Treatment',
        careattid,
        animalid,
        processDescription,
        temperature,
        weight,
        heartRate,
        symptoms,
        vetid: Number(token.UCID),
        diagnoseDrug,
    }

    

    useEffect(() => {
        
        TreatmentService.getAnimalStatusByStatusId(Number(token.UCID), token.password, statusId).then((response) =>{
            setCareAttId(response.data.careattid)
            setAnimalId(response.data.animalid)
            setProcessDescription(response.data.processDescription)
            setHeartRate(response.data.heartRate)
            setTemperature(response.data.temperature)
            setWeight(response.data.weight)
            setSymptoms(response.data.symptoms)
        }).catch(error => {
            console.log(error)
        })
    },[])



    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '45ch' },
            }}
            noValidate
            autoComplete="off"
        >

            <h3>Filled By Care Attendant </h3>
            <div>


            <TextField disabled id="outlined-disabled" label="Care Attendent ID" variant="outlined" value={careattid}
                            onChange={(e) => setCareAttId(e.target.value)}  />
            </div>

            <div>
            <TextField disabled id="outlined-disabled" label="Animal ID" variant="outlined" value={animalid}
                            onChange={(e) => setAnimalId(e.target.value)}  />
            </div>

            <div>
            <TextField id="outlined-multiline-static" label="Problem Description" variant="outlined" multiline 
                    maxRows={4} value={processDescription}
                            onChange={(e) => setProcessDescription(e.target.value)} />
            </div>

            <div>
            <TextField id="outlined-basic" label="Temperature" variant="outlined" value={temperature}
                            onChange={(e) => setTemperature(e.target.value)} />
            </div>
            <div>
            <TextField id="outlined-basic" label="Weight" variant="outlined" value={weight}
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

            <h3>For Health Technician Use Only</h3>

            <div>
            <TextField error required id="outlined-error" label="Diagnosed Drug" helperText="please fill this part before submiting" multiline  maxRows={4}
                        variant="outlined" value={diagnoseDrug}
                            onChange={(e) => setDiagnoseDrug(e.target.value)} />
            </div>
            <div>
            <Button align="center" size="small" variant="contained"
                        onClick={(e) => givePrescription(e)}
            >Submit The Prescription</Button>
            </div>

        </Box>
    );
}
