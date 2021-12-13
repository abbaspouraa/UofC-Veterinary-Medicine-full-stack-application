import React from "react";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {TabPanel} from "../../homelPageTabs";
import {Box} from "@mui/material";
import Comments from "./comments";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AnimalProfile from "./animalProfile";
import EditAnimal from "./editAnimal";


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
                    {token.token === "Admin" && <Tab label="Edit profile" {...a11yProps(1)} />}
                    {token.token === "Care Attendant" && <Tab label="Edit profile" {...a11yProps(1)} />}
                    <Tab label="Comments" {...a11yProps(2)} />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                <AnimalProfile animal={animal} />
            </TabPanel>

            {token.token === "Admin" && <TabPanel value={value} index={1}>
                <EditAnimal animal={animal} token={token} />
            </TabPanel>}

            {token.token === "Care Attendant" && <TabPanel value={value} index={1}>
                <EditAnimal animal={animal} token={token} />
            </TabPanel>}

            <TabPanel value={value} index={2}>
                <Comments animalId={animal.animalid} token={token}/>
            </TabPanel>

        </TableContainer>
        // </Box>
    );
}
