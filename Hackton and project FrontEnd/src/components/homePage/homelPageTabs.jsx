import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import SearchAnimal from "./searchAnimal";
import ListRequestedAnimals from "../Ali/requestedAnimals";
import BookingManagement from "../Ali/onGoingRequests";
import UserManagement from '../../containers/UserManagement';
import Alerts from '../../containers/Alerts';
import Treatments from '../../containers/Treatments';
import Comments from "../animalProfile/comments";

export function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function HomePageTabs({token}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Animal" {...a11yProps(0)} />
                    <Tab label="Alerts" {...a11yProps(1)} />
                    <Tab label="Treatments" {...a11yProps(2)} />
                    <Tab label="Requested Animals" {...a11yProps(3)} />
                    <Tab label="Booking Management" {...a11yProps(4)} />
                    {token.token === "Admin" && <Tab label="User Management" {...a11yProps(5)} />}
                    {token.token === "Instructor" && <Tab label="User Management" {...a11yProps(5)}/>}
                </Tabs>
            </Box>


            <TabPanel value={value} index={0}>
                <SearchAnimal token={token} />
            </TabPanel>


            <TabPanel value={value} index={1}>
                <Alerts />
            </TabPanel>

            <TabPanel value={value} index={2}>
                <Treatments />
            </TabPanel>


            <TabPanel value={value} index={3}>
                <ListRequestedAnimals />
            </TabPanel>


            <TabPanel value={value} index={4}>
                <BookingManagement />
            </TabPanel>


            <TabPanel value={value} index={5}> 
                <UserManagement token={token}/>
             </TabPanel>
        </Box>
    );
}