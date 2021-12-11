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
import commentsService from "../service/CommentsService";

export default function Comments({animalId, token}) {

    const [items, setItems] = useState([])

    const [commentNote, setCommentNote] = useState("");

    const getAnimalComments = () => {
        CommentsService.getAnimalComment(animalId).then((response) => {
            setItems(response.data)
        }).catch(error =>{
            console.log(error);
        })
    }

    const postComment = () => {
        commentsService.makeComment({

            animalid: Number(animalId),
            note: commentNote,
            userid: Number(token.UCID)

        }).then(r => {
            console.log(r);
        })
    }



    return  (

        <List sx={{ width: '100%', maxWidth: 720, bgcolor: 'background.paper' }}>
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
                            <Avatar alt={row.role}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={row.lname + " " + row.fname}
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
                    onChange={(e) => setCommentNote(e.target.value)}
                />

                <IconButton
                    size={"medium"}
                    color="primary"
                    aria-label="Submit comment"
                    component="span"
                    onClick={postComment}
                >
                    <SendIcon />
                </IconButton>
            </ListItem>

        </List>
    );
}
