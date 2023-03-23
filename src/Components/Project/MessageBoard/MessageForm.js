import './MessageForm.css';
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useUser } from "../../../Context/UserContext";
import { addMessageToProject } from "../../../Service/MessageInfo";

const MessageForm = (props) => {
    const {user} = useUser();
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        const [ error, data ] = await addMessageToProject(props.projectId, user.id, message, title) 
        props.loading(true);
        setMessage("");
        setTitle("");
    }

    return (
        <>
        <form className='form-container' onSubmit={onSubmit}>
            <div className='form-row'>
                <h3 id='Author'>{user.username}</h3>
                <TextField name="title" id='Title' placeholder="Title" value={title} onChange={event => setTitle(event.target.value)}/> 
            </div>

            <div className='form-row body-row'>
            <TextField
                id='Body'
                name="message"
                label="Message"
                multiline
                minRows={7}
                value={message} 
                onChange={event => setMessage(event.target.value)}
                 /> 
            </div>
            <Button type="submit">Send message</Button>
        </form>
        
        </>
    )
}
export default MessageForm;