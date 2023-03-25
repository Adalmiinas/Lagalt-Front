import "./Message.css";
import { Button } from "@mui/material";
import { useUser } from "../../../Context/UserContext";
import { deleteMessageFromProject } from "../../../Service/MessageInfo";

const Message = ({ id, title, body, author, authorId, date, load }) => {
  const { user } = useUser();

  const deleteMessage = async () => {
    console.log(id);
    await deleteMessageFromProject(id, user.id);
    load(true);
  };

  return (
    <div
      className="message-container"
      style={{
        boxShadow: " 12px 12px 2px 1px rgba(0, 0, 255, .2)"
      }}
    >
      <div className="message-row">
        <h2 className="message-title">{title}</h2>
        <p className="message-author">{author}</p>
      </div>

      <p className="message-body">{body}</p>
      {user !== null && authorId === user.id && (
        <div>
          <Button
            variant="contained"
            color="darkViolet"
            sx={{
              borderRadius: "12px",
              marginTop: "1rem"
            }}
            onClick={deleteMessage}
          >
            Delete
          </Button>
        </div>
      )}
      <p className="message-date">{date.slice(0, 10)}</p>
    </div>
  );
};
export default Message;
