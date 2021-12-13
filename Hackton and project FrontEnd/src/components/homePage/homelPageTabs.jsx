import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SearchAnimal from "./animal/searchAnimal";
import ListRequestedAnimals from "../content/requestedAnimals/requestedAnimals";
import BookingManagement from "../content/ongoingCare/onGoingRequests";
import UserManagement from '../content/userManagment/UserManagement';
import Alerts from '../content/alerts/Alerts';
import Treatments from '../content/treatments/Treatments';
import "./PageContents.css";

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

    // {token.token ==="Instructor" &&  <Tab label="Booking Management" {...a11yProps(4)} />}

    return (
        <Box sx={{ width: '100%' }}  className="search-page">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Animal" {...a11yProps(0)} />
                    <Tab label="Alerts" {...a11yProps(1)} />
                    <Tab label="Treatments" {...a11yProps(2)} />
                    {token.token === "Admin" && <Tab label="Requested Animals" {...a11yProps(3)} />}
                    {token.token ==="Instructor" && <Tab label="Booking Management" {...a11yProps(3)} />}
                    {token.token === "Admin" && <Tab label="User Management" {...a11yProps(4)} />}
                    {token.token === "Instructor" && <Tab label="User Management" {...a11yProps(4)} />}
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

            {token.token === "Admin" && <TabPanel value={value} index={3}>
                <ListRequestedAnimals token={token} />
            </TabPanel>}

            {token.token === "Instructor" && <TabPanel value={value} index={3}>
                <BookingManagement token={token} />
            </TabPanel>}

            {token.token === "Admin" && <TabPanel value={value} index={4}>
                <UserManagement token={token}/>
            </TabPanel>}

            {token.token === "Instructor" && <TabPanel value={value} index={4}>
                <UserManagement token={token}/>
            </TabPanel>}

        </Box>
    );
}
