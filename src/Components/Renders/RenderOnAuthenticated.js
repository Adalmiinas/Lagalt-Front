import UserService from "../../Service/userservice";

const RenderOnAuthenticated = ({ children }) => (UserService.isLoggedIn() ? children : null);
export default RenderOnAuthenticated;
