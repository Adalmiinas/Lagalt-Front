import { AppBar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { storageDelete } from "../../Utils/Storage";
import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useUser } from "../../Context/UserContext";
import { useKeycloak } from "@react-keycloak/web";
import AddProjectButton from "../Project/AddProjectButton";

/**
 * Renders navigation bar to website
 * @returns {JSX.Element}
 */
const Navbar = props => {
  const { handleLoad } = props;
  const history = useNavigate();

  const { keycloak } = useKeycloak();
  const { user } = useUser();

  /**
   * Handles user's logout
   */
  const handleRedirect = () => {
    history("/");
    handleLoad(2);
  };

  const [showAddProjectModal, setShowAddProjectModal] = React.useState(false)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  /**
   * Handles click to profile menu icon
   */
  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Handles mobile menus closing
   */
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  /**
   * Handles menu closing
   */
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  /**
   * Handles mobile menu opening
   */
  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  /**
   * Renders default menu
   */
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user ? (
        <div>
          <MenuItem onClick={handleMenuClose} component={Link} to="profile/">
            Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
          
            <AddProjectButton/>
            
          </MenuItem>
          <MenuItem onClick={() => handleRedirect()} component={Link} to="/">
            Logout
          </MenuItem>
        </div>
      ) : (
        <MenuItem onClick={() => handleLoad(3)} component={Link} to="/">
          Register
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";

  /**
   * Renders mobile menu
   */
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMenuClose} component={Link} to="/">

            PROJECTS

      </MenuItem>
      {!user && (
        <MenuItem onClick={() => handleLoad(1)}>
          <Typography textAlign="center">Login</Typography>
        </MenuItem>
      )}

      {user  ? (
        <div>
          <MenuItem onClick={handleMenuClose} component={Link} to="profile/">
            Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            Create project
          </MenuItem>
          <MenuItem onClick={() => handleRedirect()} component={Link} to="/">
            Logout
          </MenuItem>
        </div>
      ) : (
        <MenuItem onClick={() => handleLoad(3)} component={Link} to="/">
          Register
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <>
      <AppBar position="static" color="darkVioletGreen">
        <Toolbar>
          <MenuItem component={Link} to="/">
            <Typography
              variant="h3"
              noWrap
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                fontFamily: "Roboto"
              }}
            >
              LAGALT
            </Typography>
          </MenuItem>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {!user && (
              <MenuItem onClick={() => handleLoad(1)}>
                <Typography textAlign="center">LOGIN</Typography>
              </MenuItem>
            )}

            <MenuItem component={Link} to="/">

              <Typography textAlign="center">Projects</Typography>

            </MenuItem>

            <IconButton size="large" edge="end" aria-label={"account of current user"} aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
              {!user?.photoUrl ? <AccountCircle /> : <img src={user?.photoUrl} alt="user avatar" style={{ verticalAlign: "middle", width: "50px", height: "50px", borderRadius: "50%", border: "3px solid black" }} />}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </>
  );
};

export default Navbar;

