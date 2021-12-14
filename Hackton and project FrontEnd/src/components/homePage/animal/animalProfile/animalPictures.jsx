import React, {useState} from 'react';
import Button from "@mui/material/Button";
import UploadIcon from '@mui/icons-material/Upload';

export default function FileUploadPage({animal}){
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const handleSubmission = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        fetch(
            "http://192.168.0.229:8090/animal/" + animal.animalid,
            {
                method: 'PUT',
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return(
        <div>
            {isFilePicked ? (
                <div>
                    <p>Filename: {selectedFile.name}</p>
                    <p>Filetype: {selectedFile.type}</p>
                    <p>Size in bytes: {selectedFile.size}</p>
                    <p>
                    </p>
                </div>
            ) : (
                <p>Select a picture to upload</p>
            )}
            <input type="file" name="file" onChange={changeHandler} />
            <div>
                <Button endIcon={<UploadIcon />} variant="contained" onClick={handleSubmission}>Upload picture</Button>
            </div>
        </div>
    )
}