import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function NewAnimalAdd({animal}) {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic" label="Name" variant="outlined" />
            <TextField id="outlined-basic" label="ID" variant="outlined" />
            <TextField id="outlined-basic" label="Species" variant="outlined" />
            <TextField id="outlined-basic" label="Sex" variant="outlined" />
            <TextField id="outlined-basic" label="Breed" variant="outlined" />
            <TextField id="outlined-basic" label="Age" variant="outlined" />
            <TextField id="outlined-basic" label="RFID" variant="outlined" />
            <TextField id="outlined-basic" label="Alerted" variant="outlined" />
            <TextField id="outlined-basic" label="Weight" variant="outlined" />
            <TextField id="outlined-basic" label="Special Problem" variant="outlined" />
            <TextField id="outlined-basic" label="Continues Medication" variant="outlined" />
            <TextField id="outlined-basic" label="Special Instructions" variant="outlined" />
            <TextField id="outlined-basic" label="Special Diet" variant="outlined" />
            <TextField id="outlined-basic" label="Tattoo" variant="outlined" />
            <TextField id="outlined-basic" label="City tattoo" variant="outlined" />
            <TextField id="outlined-basic" label="Coat color" variant="outlined" />
            <TextField id="outlined-basic" label="Status" variant="outlined" />
            <TextField id="outlined-basic" label="Microchip" variant="outlined" />
        </Box>
    );
}
