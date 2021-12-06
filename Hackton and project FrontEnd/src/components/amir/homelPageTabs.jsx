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
                    <Tab label="Requested Animals" {...a11yProps(2)} />
                    <Tab label="Booking Management" {...a11yProps(3)} />
                    <Tab label="User Management" {...a11yProps(4)} />
                </Tabs>
            </Box>


            <TabPanel value={value} index={0}>
                <SearchAnimal />
            </TabPanel>


            <TabPanel value={value} index={1}>
                {/*Tab 2*/}
            </TabPanel>


            <TabPanel value={value} index={2}>
                <ListRequestedAnimals />
            </TabPanel>


            <TabPanel value={value} index={3}>
                <BookingManagement />
            </TabPanel>

            <TabPanel value={value} index={4}>
                <div>{token.token === "Admin" && <UserManagement />} </div>
                <div>{token.token === "Instructor" && <UserManagement />} </div>
            </TabPanel>
        </Box>
    );
}
