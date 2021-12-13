import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import UserService from "../../service/UserService";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";

export default function AddEditUser({user, token}) {
    // const [fname, setFName] = useState("");
    // const [lname, setLName] = useState("");
    // const [ucid, setUcid] = useState("");
    // const [email, setEmail] = useState("");
    // const [role, setRole] = useState("");
    // const [password, setPassword] = useState("");
    const [fname, setFName] = useState(user.fname);
    const [lname, setLName] = useState(user.lname);
    const [ucid, setUcid] = useState(user.userid);
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState(user.role);
    const [password, setPassword] = useState(user.password);
    const [block, setBlock] = useState(user.blocked);

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleBlockChange = (event) => {
        setBlock(event.target.value);
    };

    const blockList = [
        {
            value: 'Yes',
            label: 'Blocked',
        },
        {
            value: 'No',
            label: 'Not Blocked',
        }
    ];

    const roleList = [
        {
            value: 'Admin',
            label: 'Admin',
        },
        {
            value: 'Instructor',
            label: 'Instructor',
        },
        {
            value: 'Care Attendant',
            label: 'Care Attendant',
        },
        {
            value: 'Teaching Technician',
            label: 'Teaching Technician',
        },
        {
            value: 'Student',
            label: 'Student',
        }
    ];

    const handleAddUser = () => {
        UserService.updateUser(
            Number(token.UCID),
            token.password,
            {
                fname: fname,
                lname: lname,
                userid: ucid,
                email: email,
                role: role,
                password: password,
                blocked: block
            }
        ).catch(error =>{
            console.log(error);
        })
    }


    return(
        <TableContainer component={Paper}>
            <h3>Edit User</h3>
            <Table sx={{minWidth: 650}} aria-label="simple table">

                <TableHead>
                    <TableRow>
                        <TableCell>Property</TableCell>
                        <TableCell align="right">Value</TableCell>
                    </TableRow>
                </TableHead>


                <TableBody>
                    <TableRow>
                        <TableCell>
                            <TextField
                                id="outlined-FirstName"
                                label="First Name"
                                variant="outlined"
                                size="small"
                                value={fname}
                                onChange={(e) => setFName( e.target.value )}
                            />
                        </TableCell>
                        <TableCell align="right">
                            {fname}
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>
                            <TextField
                                id="outlined-LastName"
                                label="Last Name"
                                variant="outlined"
                                size="small"
                                value={lname}
                                onChange={(e) => setLName( e.target.value )}
                            />
                        </TableCell>
                        <TableCell align="right">
                            {lname}
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>
                            <TextField
                                id="outlined-UCID"
                                label="UCID"
                                variant="outlined"
                                size="small"
                                value={ucid}
                                onChange={(e) => setUcid( e.target.value )}
                            />
                        </TableCell>
                        <TableCell align="right">
                            {ucid}
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>
                            <TextField
                                id="outlined-Email"
                                label="Email"
                                variant="outlined"
                                size="small"
                                value={email}
                                onChange={(e) => setEmail( e.target.value )}
                            />
                        </TableCell>
                        <TableCell align="right">
                            {email}
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>
                            <TextField
                                id="outlined-Email"
                                label="Password"
                                type="password"
                                variant="outlined"
                                size="small"
                                value={password}
                                onChange={(e) => setPassword( e.target.value )}
                            />
                        </TableCell>
                        <TableCell align="right">
                        </TableCell>
                    </TableRow>

                <TableRow>
                    <TableCell>
                        <TextField
                            id="outlined-select-currency-native"
                            select
                            label="Role"
                            value={role}
                            onChange={handleRoleChange}
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Animal status"
                        >
                            {roleList.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                        {"\t"}
                        <TextField
                            id="outlined-select-currency-native"
                            select
                            label="Blocked"
                            value={block}
                            onChange={handleBlockChange}
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Animal status"
                        >
                            {blockList.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                    </TableCell>
                    <TableCell align="right">
                        <Button  variant="contained"
                                 onClick={ (e) => handleAddUser(e)}
                        >Save</Button>
                    </TableCell>
                </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
);
}