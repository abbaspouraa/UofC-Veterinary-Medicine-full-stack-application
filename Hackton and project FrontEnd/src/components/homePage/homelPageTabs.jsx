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
import "./PageContents.css";
import AlertingAnimals from "../content/treatments/AlertingAnimals";
import UnderTreatmentAnimal from "../content/treatments/UnderTreatmentAnimal";

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

                    {/*Admin tabs*/}
                    {token.token === "Admin" && <Tab label="Requested Animals" {...a11yProps(1)} />}
                    {token.token === "Admin" && <Tab label="Alerting Animals" {...a11yProps(2)} />}
                    {token.token === "Admin" && <Tab label="Under Treatment" {...a11yProps(3)} />}
                    {token.token === "Admin" && <Tab label="User Management" {...a11yProps(4)} />}

                    {/*Instructor*/}
                    {token.token ==="Instructor" && <Tab label="Booking Management" {...a11yProps(1)} />}
                    {token.token === "Instructor" && <Tab label="User Management" {...a11yProps(2)} />}

                    {/*Care att tabs*/}
                    {token.token === "Care Attendant" && <Tab label="Requested Animals" {...a11yProps(1)} />}
                    {token.token === "Care Attendant" && <Tab label="Under Treatment" {...a11yProps(2)} />}

                    {/*Health techs tabs*/}
                    {token.token === "Health Technician" && <Tab label="Alerting Animals" {...a11yProps(1)} />}
                    {token.token === "Health Technician" && <Tab label="Under Treatment" {...a11yProps(2)} />}
                </Tabs>
            </Box>


            <TabPanel value={value} index={0}>
                <SearchAnimal token={token} />
            </TabPanel>


            {/*Admin*/}

            {token.token === "Admin" && <TabPanel value={value} index={1}>
                <ListRequestedAnimals token={token} />
            </TabPanel>}

            {token.token === "Admin" && <TabPanel value={value} index={2}>
                <AlertingAnimals token={token} />
            </TabPanel>}

            {token.token === "Admin" && <TabPanel value={value} index={3}>
                <UnderTreatmentAnimal token={token} />
            </TabPanel>}

            {token.token === "Admin" && <TabPanel value={value} index={4}>
                <UserManagement token={token}/>
            </TabPanel>}



            {/*Instructor*/}

            {token.token === "Instructor" && <TabPanel value={value} index={1}>
                <BookingManagement token={token} />
            </TabPanel>}

            {token.token === "Instructor" && <TabPanel value={value} index={2}>
                <UserManagement token={token}/>
            </TabPanel>}



            {/*Care att*/}

            {token.token === "Care Attendant" &&  <TabPanel value={value} index={1}>
                <ListRequestedAnimals token={token} />
            </TabPanel>}

            {token.token === "Care Attendant" &&  <TabPanel value={value} index={2}>
                <UnderTreatmentAnimal token={token} />
            </TabPanel>}

            {/*Health techs*/}
            {token.token === "Health Technician" &&  <TabPanel value={value} index={1}>
                <AlertingAnimals token={token} />
            </TabPanel>}

            {token.token === "Health Technician" &&  <TabPanel value={value} index={2}>
                <UnderTreatmentAnimal token={token} />
            </TabPanel>}

        </Box>
    );
}
