import { useEffect, useState } from "react";
import { getAllMessagesFromProject } from "../../../Service/MessageInfo";
import Message from "./Message";
import MessageForm from "./MessageForm";

/**
 * Shows all the sent messages.
 */
const MessageBoard = (props) => {
  const [messages, setMessages] = useState([]);
  const [load, setLoad] = useState(false);

  /**
   * The first use effect get the messages when opening the page.
   */
  useEffect(() => {
    getMessages(props.project.id);
  }, [props.project.id]);

  /**
   * Takes the load parameter that starts the use effect when user has made a message or deleted one.
   */
  useEffect(() => {
    getMessages(props.project.id);
    setLoad(false);
  }, [load, props.project.id]);

  /**
   * Gets all the messages from the project.
   */
  const getMessages = async () => {
    const [error, data] = await getAllMessagesFromProject(props.project.id);
    console.log(data);
    setMessages(data);
  };
  return (
    <>
      <MessageForm projectId={props.project.id} loading={setLoad} />
      <div
        style={{
          marginLeft: "22%",
          maxHeight: "500px",
          overflow: "auto",
          width: "60%",
          justifyContent: "center",
        }}
      >
        {[...messages].reverse().map((message, i) => {
          return (
            <Message
              key={i}
              id={message.id}
              title={message.title}
              author={message.username}
              body={message.body}
              authorId={message.userId}
              date={message.created}
              load={setLoad}
            />
          );
        })}
      </div>
    </>
  );
};
export default MessageBoard;
