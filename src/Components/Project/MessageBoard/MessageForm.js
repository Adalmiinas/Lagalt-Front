import "./MessageForm.css";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useUser } from "../../../Context/UserContext";
import { addMessageToProject } from "../../../Service/MessageInfo";

const MessageForm = props => {
  const { user } = useUser();
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  const onSubmit = async e => {
    e.preventDefault();
    await addMessageToProject(props.projectId, user.id, message, title);
    props.loading(true);
    setMessage("");
    setTitle("");
  };

  return (
    <div
      style={{
        margin: "auto",
        width: "50%",
        paddingTop: "2rem"
      }}
    >
      <form
        className="form-container"
        style={{
          boxShadow: " 12px 12px 2px 1px rgba(0, 0, 255, .2)",
          width: "100%"
        }}
        onSubmit={onSubmit}
      >
        <div className="form-row">
          <h3 id="Author">{user.username}</h3>
          <TextField name="title" id="Title" placeholder="Title" style={{ minWidth: "50%" }} value={title} onChange={event => setTitle(event.target.value)} />
        </div>

        <div className="form-row body-row">
          <TextField id="Body" name="message" label="Message" multiline minRows={7} maxRows={7} style={{ minWidth: "50%" }} value={message} onChange={event => setMessage(event.target.value)} />
        </div>
        <Button style={{ paddingTop: "1rem" }} color="darkViolet" type="submit">
          Send message
        </Button>
      </form>
    </div>
  );
};
export default MessageForm;
