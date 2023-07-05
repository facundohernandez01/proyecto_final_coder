import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import React, { useContext, useState } from "react";
import CartWidget from "../CartWidget";
import {
  Link as RouterLink,
  MemoryRouter,
  useNavigate,
  useParams,
} from "react-router-dom";
import CartContext from "../Context";
import UserContext from "../ContextUser";
import WidgetsIcon from "@mui/icons-material/Widgets";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { app } from "../fb";
import SearchWidget from "../SearchWidget/searchWidget";

const settings = ["Profile", "Account", "Dashboard", "Logout"];
function ResponsiveAppBar({
  handleClickOpen,
  open,
  setSearchResults,
  searchResults,
}) {
  const navigate = useNavigate();

  const { ItemsList } = useContext(CartContext);
  const { usuario, cerrarSesion, currentUser } = useContext(UserContext);

  const resumirCategorias = Array.from(
    new Set(ItemsList.map((item) => item.categoria))
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const abierto = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [mostrarMenu, setMostrarMenu] = useState(null);
  const mostrarMenuopen = Boolean(mostrarMenu);
  const userhandleClick = (event) => {
    setMostrarMenu(event.currentTarget);
  };
  const userhandleClose = () => {
    setMostrarMenu(null);
  };
  const vaciarBusqueda = () => {
    setSearchResults(ItemsList);
  };

  return (
    <>
      <AppBar sx={{ position: "fixed", padding: "0px",  height: "59px" }}>
      <Container sx={{ height: "45px"}} maxWidth="xl">
      <Toolbar disableGutters>
        <Typography
          variant="h6"
          noWrap
          component={RouterLink}
          to="/home"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontWeight: 500,
            letterSpacing: ".2rem",
            color: "inherit",
            textDecoration: "none",
          }}
          onClick={vaciarBusqueda}
        >
          ⚡FlashStore
        </Typography>
        <Divider></Divider>
        <SearchWidget setSearchResults={setSearchResults} />
              <Button variant="outlined" onClick={handleClickOpen}>
                <CartWidget />
              </Button>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {app.auth().currentUser.uid !== null
                      ? app.auth().currentUser.email[0].toUpperCase()
                      : ""}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"></Typography>
                </MenuItem>
                <MenuItem onClick={cerrarSesion}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
        
        </Toolbar>
      </Container>                
      </AppBar>


      <AppBar sx={{ top: "58px" }}>
        <Container sx={{ height: "45px"}} maxWidth="xl">
          <Toolbar sx={{ maxHeight: "20px" }} disableGutters>
            
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }}}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" }
                }}
              >
                {resumirCategorias.map((item) => (
                  <MenuItem
                    key={item}
                    component={RouterLink}
                    to={"/categoria/" + item}
                  >
                    <Typography key={item} textAlign="center">
                      {item}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
                                  ⚡FS⚡

            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {resumirCategorias.map((page) => (
                <Button
                  key={page}
                  component={RouterLink}
                  to={"/categoria/" + page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default ResponsiveAppBar;
