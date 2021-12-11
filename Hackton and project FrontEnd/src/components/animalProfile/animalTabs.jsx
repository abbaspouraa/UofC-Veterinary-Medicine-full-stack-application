import React from "react";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {TabPanel} from "../homePage/homelPageTabs";
import {Box} from "@mui/material";
import Comments from "./comments";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AnimalProfile from "./animalProfile";


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
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                <AnimalProfile animal={animal} />
            </TabPanel>

            <TabPanel value={value} index={1}>
                <Comments animalId={animal.animalid} token={token}/>
            </TabPanel>
        </TableContainer>
        // </Box>
    );
}
