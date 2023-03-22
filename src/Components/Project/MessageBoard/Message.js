import './Message.css';
import { Button } from "@mui/material";
import { useUser } from "../../../Context/UserContext";

const Message = ({id, title,body,author, authorId, load}) => {

    const {user} = useUser();

    const deleteMessage = async () => {
        await 
        load(true);
    }

    return (
        <>
            <div className="message-container">
                <div className="message-row">
                    <h2 className="message-title">{title}</h2>
                    <p className="message-author">{author}</p>
                </div>

                <p className="message-body">{body}</p>
                {user !== null && authorId === user.id&&
                <div>
                    <Button onClick={deleteMessage}>Delete</Button>
                </div>
                }
            </div>
        </>
    )
}
export default Message;