import { useEffect, useState } from "react";
import { getAllMessagesFromProject } from "../../../Service/MessageInfo";
import Message from "./Message";
import MessageForm from "./MessageForm";

const MessageBoard = (props) => {
    const [messages, setMessages] = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        getMessages(props.project.id);
    }, [props.project.id]);

    useEffect(() => {
        getMessages(props.project.id);
    }, [load, props.project.id]);

    const getMessages = async () => {
        const [error, data] = await getAllMessagesFromProject(props.project.id);
        console.log(data);
        setMessages(data);
    }
    return (
        <>
            <MessageForm projectId = {props.project.id} loading={setLoad}/>

            {
                messages.map((message, i) => {
                    return <Message key={i}
                            id={message.id}
                            title={message.title}
                            author={message.username}
                            body={message.body}
                            authorId={message.userId}
                            load={setLoad}
                    />
                })
            }
        </>
    )
}
export default MessageBoard;