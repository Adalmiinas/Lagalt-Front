import logo from "../../Assets/logo.png";
import { AppBar, Button } from "@mui/material";
import { Container } from "@mui/system";

import { Link, useNavigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { storageRead } from "../../Utils/Storage";

import Popup from "reactjs-popup";
import LoginForm from "../Login/LoginForm";
import { useUser } from "../../Context/UserContext";
import { storageDelete } from "../../Utils/Storage";
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link, useNavigate } from "react-router-dom";
import { fontFamily } from "@mui/system";

// const Navbar = () => {
//   const { user} = useUser();

//   const handleLogout = () => {
//     storageDelete("logged-user")
//   }

//   return (
//     <AppBar position="static">
//       <Container
//         maxWidth="xl"
//         style={{ display: "flex", justifyContent: "center" }}
//       >
//         <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="/"
//             sx={{
//               mr: 2,
//               display: { xs: 'none', md: 'flex' },
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             LAGALT
//           </Typography>
//           <MenuItem LinkComponent={Link} to={"/profile"}>Main</MenuItem>
//         <img src={logo} alt="Logo" width={50} />
//         {user === null && (
//           <Popup
//             trigger={<Button variant="contained">Login</Button>}
//             position="top center"
//             modal
//             nested
//           >
//             {(close) => (
//               <div
//                 style={{
//                   minHeight: "500px",
//                   minWidth: "500px",
//                   backgroundColor: "#ECD9BA",
//                 }}
//               >
//                 <button onClick={close}>&times;</button>
//                 <LoginForm />
//               </div>
//             )}
//           </Popup>
//         )}

//         {user !== null && (
//           <Button variant="contained" href="/profile">
//             Profile
//           </Button>
//         )}

//         <Button variant="contained" href="/">
//           Main
//         </Button>

//         {user !== null && (
//           <Button variant="contained" href="/project/add-project">
//           <img src={plusIcon} alt="Plus Icon" width={50}/>
//         </Button>
//         )}

//         {user !== null && (
//           <Button variant="contained" href="/" onClick={handleLogout}>
//             Logout
//           </Button>
//         )}
        
//       </Container>
//     </AppBar>
//   );
// };
// export default Navbar
//__________________________________________________________________

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Navbar = (props) => {

    const { handleLoad } = props;
    const history = useNavigate();
  
    const { keycloak } = useKeycloak();
    const userInfo = storageRead("logged-user");
  
    const handleRedirect = () => {
      history("/");
      handleLoad(2);
    }
  const { user} = useUser();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const navigate = useNavigate()
  const [inputTextToSearch, setInputTextToSearch] = React.useState("");
  console.log(inputTextToSearch)

  const [data,setData] = React.useState("")
  const parentToChild = () => {
    setData(inputTextToSearch);
  }

  const handleKeyDown = (e) => {

  }

  let inputHandler = (e) =>{
    //var lowerCase = e.target.value.toLowerCase();
    //var lowerCase = e.toLowerCase();
    //setInputTextToSearch(lowerCase);
    //searchedText(inputText)

    console.log(inputTextToSearch)
    //searchedText(wordToSearch)
    
  }

  const handleLogout = () => {
    storageDelete("logged-user")
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
          {/* {keycloak.authenticated && userInfo && (
          <Button variant="contained" LinkComponent={Link} to={`/profile/${userInfo.username}`}>
            Profile
          </Button>
        )} */}
      {/* <MenuItem onClick={handleMenuClose} component={Link} to={`/profile/${userInfo.username}`}>Profile</MenuItem> */}
      {/* <MenuItem onClick={e => {{handleMenuClose()};{navigateToProfilePage()}}}>My account</MenuItem> */}
      
      <MenuItem onClick={handleLogout} component={Link} to="/">Logout</MenuItem>
      {keycloak.authenticated && (
        <>
          <MenuItem onClick={handleMenuClose} component={Link} to={`/profile/${userInfo.username}`}>Profile</MenuItem>
          <MenuItem component={Link} to="/project/add-project">Create project</MenuItem>
          <MenuItem onClick={() => handleRedirect()} component={Link} to="/">Logout</MenuItem>
        </>
    
        )}
          {!keycloak.authenticated && user !== null && (
          <MenuItem onClick={() => handleLoad(3)} component={Link} to="/">Register</MenuItem>
        )}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar position="sticky">
      <Container maxWidth="1" style={{ display: "flex", justifyContent: "center" }}>
        <img src={logo} alt="Logo" width={50} />


    
  
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="darkVioletGreen">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h3"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block'}, fontFamily: "Roboto"  }}
          >
            LAGALT
          </Typography>
      
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* <IconButton 
              size="large" 
              aria-label="show 4 new mails" 
              color="inherit"
              component={Link}
              to="/">
                <MailIcon />
            </IconButton> */}
                {/* {!keycloak.authenticated && (
          <Button variant="contained" onClick={() => handleLoad(1)}>
            Login
          </Button>
        )} */}
            {!keycloak.authenticated  && user === null && (
              <Popup
                trigger={<MenuItem>
                <Typography textAlign="center">LOGIN</Typography>
            </MenuItem>}
                position="top center"
                modal
                nested
              >
                {(close) => (
                  <div
                    style={{
                    minHeight: "500px",
                    minWidth: "500px",
                    backgroundColor: "#ECD9BA",
                }}
              >
             
                <Button variant="contained" onClick={() => handleLoad(1)}>
            Login
          </Button>
              </div>
            )}
          </Popup>
        )}

{/* <button onClick={close}>&times;</button>
                <LoginForm /> */}
            {/* <MenuItem component={Link} to="/project/add-project">
                <Typography textAlign="center">LOGIN</Typography>
            </MenuItem> */}
            {/* <IconButton
              size="large"
              component={Link}
              to="/project/add-project"
              color="inherit"
            > */}
            <MenuItem component={Link} to="/">
                <Typography textAlign="center">MAIN</Typography>
            </MenuItem>
            {/* {user !== null && (
              <MenuItem component={Link} to="/project/add-project">
                <Typography textAlign="center">CREATE PROJECT</Typography>
              </MenuItem>
             )} */}
            {/* <MenuItem component={Link} to="/project/add-project">
                <Typography textAlign="center">CREATE PROJECT</Typography>
            </MenuItem> */}
              
            {/* </IconButton> */}
            {user !== null && (
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            )}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>


        <Button variant="contained" LinkComponent={Link} to="/">
          Home
        </Button>

        
      </Container>
    </AppBar>

  );
}

export default Navbar;
