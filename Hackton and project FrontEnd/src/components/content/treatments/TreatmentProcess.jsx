import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import TreatmentService from '../../service/TreatmentService';

//For changing animal status
import AnimalService from '../../service/AnimalService';
import FileUploadPage from "../../homePage/animal/animalProfile/animalPictures";

export default function TreatmentProcess({animal, token}) {

    const [careattid, setCareAttId] = useState(token.UCID);
    const [animalid, setAnimalId] = useState(animal.animalid);
    const [briefDescription, setBriefDescription] = useState('');
    const [temp, setTemp] = useState('');
    const [weight, setWeight] = useState('');
    const [heartRate, setHeartRate] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [diagnoseDrug, setDiagnoseDrug] = useState('');
    const [vetid, setVetId] = useState('');


    const startTreatment = (e) => {
        e.preventDefault();

        TreatmentService.startNewTreatment(
            Number(token.UCID),
            token.password,
            {
                stage: 'started',
                careattid: token.UCID,
                animalid: animal.animalid,
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
        if (animal.animalid)
            AnimalService.updateAnimalStatus(
                Number(token.UCID),
                token.password,
                animal.animalid,
                "Under Treatment"
            ).then((response) => {

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

            <div>
            <TextField disabled label="Care Attendent ID" variant="outlined" value={careattid} fullWidth
                       id="fullWidth"
                       onChange={(e) => setCareAttId(e.target.value)}  />
            </div>
            <div>
            <TextField disabled id="fullWidth"  label="Animal ID" variant="outlined" value={animalid} fullWidth
                       onChange={(e) => setAnimalId(e.target.value)}  />
            </div>
            <div>
            <TextField  required id="outlined-error" label="Problem Description" helperText="please fill this part before submiting" variant="outlined" multiline fullWidth
                    maxRows={4} value={briefDescription}
            onChange={(e) => setBriefDescription(e.target.value)} />
            </div>
            <div>
            <TextField id="outlined-basic" label="Temperature" variant="outlined" value={temp} fullWidth
                            onChange={(e) => setTemp(e.target.value)} />
            </div>
            <div>
            <TextField id="outlined-basic" label="Weight" variant="outlined" value={weight} fullWidth
                            onChange={(e) => setWeight(e.target.value)} />
            </div>
            <div>
            <TextField id="outlined-basic" label="Heart Rate" variant="outlined" value={heartRate} fullWidth
                            onChange={(e) => setHeartRate(e.target.value)} />
            </div>
            <div>
            <TextField required id="outlined-error" id="outlined-multiline-static" label="Symptoms" helperText="please fill this part before submiting" variant="outlined" multiline  fullWidth
                    maxRows={4} value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)} />
            </div>

            <div>
                <FileUploadPage animal={animal} />
            </div>

            <Button size="small" variant="contained"
                        onClick={(e) => [startTreatment(e), updateAnimalToSick(e)]}
            >Submit</Button>

        </Box>
    );
}
