import React, { useState, useEffect, useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
import { logoutUser } from "../../../feature/auth/authSlice";
import { useDispatch } from "react-redux";
import MDAvatar from "components/MDAvatar";
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
import MDButton from "components/MDButton";
import { AuthContext } from "context";
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

function DashboardNavbar({ absolute, light, isMini }) {
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const [navbarType, setNavbarType] = useState();
   const [controller, dispatch1] = useMaterialUIController();;
  const { miniSidenav, transparentNavbar, fixedNavbar, darkMode,openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);

  const navigate = useNavigate();
  useEffect(() => {
    const handleTransparentNavbar = () => {
      setTransparentNavbar(dispatch1, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    };

    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    window.addEventListener("scroll", handleTransparentNavbar);
    handleTransparentNavbar();

    return () => {
      window.removeEventListener("scroll", handleTransparentNavbar);
    };
  }, [dispatch1, fixedNavbar]);
  console.log(miniSidenav)

  const handleMiniSidenav = () => setMiniSidenav(dispatch1, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch1, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
     
    </Menu>
  );

  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: light || darkMode ? white.main : dark.main,
  });

  const currentUser = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.user !== null);

  useEffect(() => {
    if (!currentUser) {
      // Redirection si l'utilisateur n'est pas connecté
      window.location.href = '/auth/login'; // Assurez-vous que cette redirection fonctionne correctement dans votre application
    }
  }, [currentUser]);

  const handleLogout = () => {
    // Déclencher l'action de déconnexion
    dispatch(logoutUser()); // Assurez-vous que logoutUser est correctement défini et importé
  };
    const [colorMap, setColorMap] = useState({});
    const getAvatarColor = () => {
     
      return colorMap[currentUser.email] || "#2196f3"; // Default color
    };
 
  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </MDBox>

        {!isMini && isAuthenticated && (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox display="flex" alignItems="center" color={light ? "white" : "inherit"}>
             
           
                 
            <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
             
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
           
              </IconButton>
              {renderMenu()}
              <MDBox>
                <MDButton
                  variant="gradient"
                  color="info"
                  fullWidth
                  type="button"
                  onClick={handleLogout}
                >
                 Déconnexion
                </MDButton>
       
              </MDBox>
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
  navigate: PropTypes.func,
};

export default DashboardNavbar;