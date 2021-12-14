import React from "react";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {TabPanel} from "../../homelPageTabs";
import {Box} from "@mui/material";
import Comments from "./comments";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AnimalProfile from "./animalProfile";
import AddEditAnimal from "./addEditAnimal";
import "./AnimalProfilePopup.css"
import AnimalHealthRecord from "../../../content/treatments/HealthRecord";
import TreatmentProcess from "../../../content/treatments/TreatmentProcess";
import OngoingCareAndVaccination from "../../../content/treatments/OngoingCareAndVaccination";
import FileUploadPage from "./animalPictures";
import Stack from "@mui/material/Stack";
import * as PropTypes from "prop-types";
import Divider from "@mui/material/Divider";

function Item(props) {
    return null;
}

Item.propTypes = {children: PropTypes.node};
export default function AnimalTabs({animal, token}) {
    const [value, setValue] = React.useState(0);

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        // <Box>
        <TableContainer component={Paper}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="AnimalProfile" {...a11yProps(0)} />
                    <Tab label="Comments" {...a11yProps(1)} />
                    <Tab label="Health Records" {...a11yProps(2)} />

                    {token.token === "Admin" && <Tab label="Edit profile" {...a11yProps(3)} />}
                    {token.token === "Admin" && <Tab label="Pictures" {...a11yProps(4)} />}

                    {token.token === "Care Attendant" && <Tab label="Treatment Process" {...a11yProps(3)} />}
                    {token.token === "Care Attendant" && <Tab label="Ongoing Care" {...a11yProps(4)} />}
                    {token.token === "Care Attendant" && <Tab label="Edit profile" {...a11yProps(5)} />}

                    {token.token === "Health Technician" && <Tab label="Treatment Process" {...a11yProps(3)} />}
                    {token.token === "Health Technician" && <Tab label="Ongoing Care" {...a11yProps(4)} />}
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                <AnimalProfile animal={animal} />
            </TabPanel>

            <TabPanel value={value} index={1}>
                <Comments animalId={animal.animalid} token={token}/>
            </TabPanel>

            <TabPanel value={value} index={2}>
                <AnimalHealthRecord animalId={animal.animalid} token={token} />
            </TabPanel>

            {/*Admin*/}
            {token.token === "Admin" && <TabPanel value={value} index={3}>
                <AddEditAnimal animal={animal} token={token} />
            </TabPanel>}

            {/*Care att*/}
            {token.token === "Care Attendant" && <TabPanel index={3} value={value}>
                <TreatmentProcess animal={animal} token={token} />
            </TabPanel>}

            {token.token === "Care Attendant" && <TabPanel index={4} value={value}>
                <OngoingCareAndVaccination token={token} animalId={animal.animalid} />
            </TabPanel>}

            {token.token === "Care Attendant" && <TabPanel value={value} index={5}>
                <AddEditAnimal animal={animal} token={token} />
            </TabPanel>}

            {/*Technician*/}
            {token.token === "Health Technician" && <TabPanel index={3} value={value}>
                <TreatmentProcess animalId={animal.animalid} token={token} />
            </TabPanel>}

            {token.token === "Health Technician" && <TabPanel index={4} value={value}>
                <OngoingCareAndVaccination token={token} animalId={animal.animalid} />
            </TabPanel>}

        </TableContainer>
        // </Box>
    );
}
