import UserService from "../../Service/userservice";

const RenderOnAnonymous = ({ children }) => (!UserService.isLoggedIn() ? children : null);
export default RenderOnAnonymous;
