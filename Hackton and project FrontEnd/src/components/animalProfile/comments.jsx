import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {useState} from "react";
import CommentsService from "../service/CommentsService";
import TextField from "@mui/material/TextField";
import { IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import SendIcon from '@mui/icons-material/Send';

export default function Comments({animalId}) {

    const [items, setItems] = useState([])

    const getAnimalComments = () => {
        CommentsService.getAnimalComment(animalId).then((response) => {
            setItems(response.data)
        }).catch(error =>{
            console.log(error);
        })
    }



    return (

        <List sx={{ width: '100%', maxWidth: 720, bgcolor: 'background.paper' }}>
            <h1>{animalId}</h1>
            <ListItem alignItems={"flex-start"}>
                <IconButton
                    // size="small"
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={getAnimalComments}
                >
                    <RefreshIcon />
                </IconButton>
            </ListItem>
            <Divider variant="inset" component="li" />
            {items.map((row) => (
                <div>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt={row.userid}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={row.userid}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {row.note}
                                    </Typography>{"\n"}
                                    {row.createdAt}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </div>
                ))}
            <ListItem>
                <TextField fullWidth={true} id="outlined-basic" label="Comment" variant="standard"
                    // onChange={(e) => setName(e.target.value)}
                />

                <IconButton
                    size={"medium"}
                    color="primary"
                    aria-label="Submit comment"
                    component="span"
                    onClick={getAnimalComments}
                >
                    <SendIcon />
                </IconButton>
            </ListItem>

        </List>
    );
}
