import { useState, useEffect, useMemo, useContext } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import Add_CommentaireProfile from "layouts/add_commentaire"
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import Ajouter_template from "layouts/add_template";
import Modifier_template from "layouts/add_template";
import Template from "layouts/template"
import Ajouter_Historique from "layouts/add_historique/historique";
// Images
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import brandWhite from "assets/images/gedplus.png";
import brandDark from "assets/images/logo-ct-dark.png";
import Ajouter_client from "layouts/add_client";
import Modifier_client from "layouts/add_client"
import Clients from "layouts/clients/index"
import Ajouter_Partenaire from "layouts/add_partner";
import Modifier_Partenaire from "layouts/add_partner";
import Ajouter_Employe from "layouts/add_employee";
import Modifier_Employe from "layouts/add_employee";
import ForgotPassword from "auth/forgot-password";
import ResetPassword from "auth/reset-password";
import Login from "auth/login";
import Register from "auth/register";
import UserManagement from "layouts/user-management";
import { Helmet } from "react-helmet";
import Ajouter_tache from "layouts/add_task";
import Modifier_tache from "layouts/add_task";
import Ajouter_Formulaire1 from "layouts/add_formPage1";
import Ajouter_Formulaire2 from "layouts/add_formPage2";
import Ajouter_Formulaire3 from "layouts/add_formPage3";
import Ajouter_reclamation from "layouts/Add_rec";
import Modifier_reclamation from "layouts/Add_rec";
import Ajouter_reunion from "layouts/add_reu";
import Modifier_reunion from "layouts/add_reu";
import Ajouter_projet from "layouts/Add_project";
import Modifier_projet from "layouts/Add_project";
import Affichage_Formulaire1 from "layouts/ViewFormulaire/ViewFormulaire1";
import Affichage_Formulaire2 from "layouts/ViewFormulaire/ViewFormulaire2";
import Affichage_Formulaire3 from "layouts/ViewFormulaire/ViewFormulaire3";
import Commentaire from "layouts/notifications";
import Historique from "layouts/historique/index"
import { setupAxiosInterceptors } from "./services/interceptor";
import ProtectedRoute from "examples/ProtectedRoute";
import Propos from "layouts/billing/index"
import Ajouter_avis from "layouts/add_avis";
import { AuthContext } from "context";
import Employees from "layouts/Employe/index"
import Partenaires from "layouts/partenaire/index"
import Calendrier from "layouts/calendrier/Calendar"
import Formulaires from "layouts/formulaire1/index"
import Ajouter_Commentaire from "layouts/add_commentaire";
import Creation_Reunion from "layouts/add_reunion1";
import Ajouter_Facture from "layouts/add_facture"
import Success from "./sucess";
import Fail from "./fail";

export default function App() {
  const authContext = useContext(AuthContext);

  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    setIsDemo(process.env.REACT_APP_IS_DEMO === "true");
  }, []);

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // if the token expired or other errors it logs out and goes to the login page
  const navigate = useNavigate();
  setupAxiosInterceptors(() => {
 
    navigate("/auth/login");
  });


  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route && route.type !== "auth") {
        return (
          <Route
            exact
            path={route.route}
            element={
              <ProtectedRoute >
                {route.component}
                </ProtectedRoute>
            }
            key={route.key}
          />
        );
      }
      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <>
      {isDemo && (
        <Helmet>
          <meta
            name="keywords"
            content="creative tim, updivision, material, node.js json:api, html dashboard, node.js, react, api admin, react node.js, html css dashboard node.js, material dashboard node.js, node.js api, react material dashboard, material admin, react dashboard, react admin, web dashboard, bootstrap 5 dashboard node.js, bootstrap 5, css3 dashboard, bootstrap 5 admin node.js, material dashboard bootstrap 5 node.js, frontend, api dashboard, responsive bootstrap 5 dashboard, api, material dashboard, material node.js bootstrap 5 dashboard, json:api"
          />
          <meta
            name="description"
            content="A free full stack app powered by MUI component library, React and Node.js API, featuring dozens of handcrafted UI elements"
          />
          <meta
            itemProp="name"
            content="Material Dashboard 2 React Node.js by Creative Tim & UPDIVISION"
          />
          <meta
            itemProp="description"
            content="A free full stack app powered by MUI component library, React and Node.js API, featuring dozens of handcrafted UI elements"
          />
          <meta
            itemProp="image"
            content="https://s3.amazonaws.com/creativetim_bucket/products/157/original/react-material-dashboard-nodejs.jpg?1664786816"
          />
          <meta name="twitter:card" content="product" />
          <meta name="twitter:site" content="@creativetim" />
          <meta
            name="twitter:title"
            content="Material Dashboard 2 React Node.js by Creative Tim & UPDIVISION"
          />
          <meta
            name="twitter:description"
            content="A free full stack app powered by MUI component library, React and Node.js API, featuring dozens of handcrafted UI elements"
          />
          <meta name="twitter:creator" content="@creativetim" />
          <meta
            name="twitter:image"
            content="https://s3.amazonaws.com/creativetim_bucket/products/157/original/react-material-dashboard-nodejs.jpg?1664786816"
          />
          <meta property="fb:app_id" content="655968634437471" />
          <meta
            property="og:title"
            content="Material Dashboard 2 React Node.js by Creative Tim & UPDIVISION"
          />
          <meta property="og:type" content="article" />
          <meta
            property="og:url"
            content="https://www.creative-tim.com/live/react-material-dashboard-node.js/"
          />
          <meta
            property="og:image"
            content="https://s3.amazonaws.com/creativetim_bucket/products/157/original/react-material-dashboard-nodejs.jpg?1664786816"
          />
          <meta
            property="og:description"
            content="A free full stack app powered by MUI component library, React and Node.js API, featuring dozens of handcrafted UI elements"
          />
          <meta property="og:site_name" content="Creative Tim" />
        </Helmet>
      )}
      {direction === "rtl" ? (
        <CacheProvider value={rtlCache}>
          <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
            <CssBaseline />
            {layout === "dashboard" && (
              <>
                <Sidenav
                  color={sidenavColor}
                  brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                  brandName="GED PLUS"
                  routes={routes}
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                />
                <Configurator />
                {configsButton}
              </>
            )}
            {layout === "vr" && <Configurator />}
            <Routes>
              <Route path="login" element={<Navigate to="/auth/login" />} />
              <Route path="register" element={<Navigate to="/auth/register" />} />
              <Route path="forgot-password" element={<Navigate to="/auth/forgot-password" />} />
              {getRoutes(routes)}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </ThemeProvider>
        </CacheProvider>
      ) : (
        <ThemeProvider theme={darkMode ? themeDark : theme}>
          <CssBaseline />
          {layout === "dashboard" && (
            <>
              <Sidenav
                color={sidenavColor}
                brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                brandName="GED PLUS"
                routes={routes}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
              />
              <Configurator />
              {configsButton}
            </>
          )}
          {layout === "vr" && <Configurator />}
          <Routes>
            <Route path="/auth/login" element={<Login />} />
   
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/reset-password/:token/:email" element={<ResetPassword />} />
            
            <Route
              exact
              path="Ajouter_Facture"
              element={
                <ProtectedRoute >
                  <Ajouter_Facture />
                  </ProtectedRoute>
              }
              key="Ajouter_Facture"
            />
            <Route
              exact
              path="Creation_Reunion"
              element={
                <ProtectedRoute >
                  <Creation_Reunion />
                  </ProtectedRoute>
              }
              key="Creation_Reunion"
            />  
            <Route
              exact
              path="Formulaires"
              element={
                <ProtectedRoute >
                  <Formulaires />
                  </ProtectedRoute>
              }
              key="Formulaires"
            /> 
            <Route
              exact
              path="Calendrier"
              element={
                <ProtectedRoute >
                  <Calendrier />
                  </ProtectedRoute>
              }
              key="Calendrier"
            />
            <Route
              exact
              path="Partenaires"
              element={
                <ProtectedRoute >
                  <Partenaires />
                  </ProtectedRoute>
              }
              key="Partenaires"
            />
            <Route
              exact
              path="clients"
              element={
                <ProtectedRoute >
                  <Clients />
                  </ProtectedRoute>
              }
              key="clients"
            />
            <Route
              exact
              path="Employees"
              element={
                <ProtectedRoute >
                  <Employees />
                  </ProtectedRoute>
              }
              key="Employees"
            />
            <Route
              exact
              path="Modéles"
              element={
                <ProtectedRoute >
                  <Template />
                  </ProtectedRoute>
              }
              key="template"
            />
            <Route
              exact
              path="Propos"
              element={
                <ProtectedRoute >
                  <Propos />
                  </ProtectedRoute>
              }
              key="Propos"
            />
          <Route
              exact
              path="Ajouter_avis"
              element={
                <ProtectedRoute >
                  <Ajouter_avis />
                  </ProtectedRoute>
              }
              key="Ajouter_avis"
            />
             <Route
              exact
              path="/success"
              element={
     
                  <Success />
                  
              }
              key="success"
            />
               <Route
              exact
              path="/fail"
              element={
            
                  <Fail />
       
              }
              key="Fail"
            />
      

        <Route path="/Ajouter_Formulaire1/:Id_template" element={<ProtectedRoute><Ajouter_Formulaire1 /></ProtectedRoute>} />
        <Route path="/Ajouter_Formulaire2/:Id_template/:clients" element={<ProtectedRoute><Ajouter_Formulaire2 /></ProtectedRoute>} />
        <Route path="/Ajouter_Formulaire3/:Id_template/:clients" element={<ProtectedRoute><Ajouter_Formulaire3 /></ProtectedRoute>} />
        <Route path="/Affichage_Formulaire1/:Id_template/:clients" element={<ProtectedRoute><Affichage_Formulaire1 /></ProtectedRoute>} />
        <Route path="/Affichage_Formulaire2/:Id_template/:clients" element={<ProtectedRoute><Affichage_Formulaire2 /></ProtectedRoute>} />
        <Route path="/Affichage_Formulaire3/:Id_template/:clients" element={<ProtectedRoute><Affichage_Formulaire3 /></ProtectedRoute>} />
        <Route
              exact
              path="Ajouter_Historique/"
              element={<ProtectedRoute> <Ajouter_Historique /></ProtectedRoute>}
              key="Ajouter_Historique"
            />
             <Route
              exact
              path="Historique"
              element={
                <ProtectedRoute>
                  <Historique/>
                  </ProtectedRoute>
              }
              key="Historique"
            />

             <Route
              exact
              path="Add_CommentaireProfile/"
              element={
                <ProtectedRoute>
                <Add_CommentaireProfile />
                  </ProtectedRoute>
               
               
              }
              key="Add_CommentaireProfile"
            />
            <Route
              exact
              path="Commentaire"
              element={
                <ProtectedRoute >
                  <Commentaire />
                  </ProtectedRoute>
               
              }
              key="Commentaire"
            />
               <Route
              exact
              path="Ajouter_Commentaire"
              element={
                <ProtectedRoute >
                  <Ajouter_Commentaire />
                  </ProtectedRoute>
               
              }
              key="Ajouter_Commentaire"
            />
       
            <Route
              exact
              path="Ajouter_reclamation/"
              element={
                <ProtectedRoute >
                  <Ajouter_reclamation />
                  </ProtectedRoute>
               
              }
              key="Ajouter_reclamation"
            />
                      <Route
              exact
              path="Modifier_reclamation/:id"
              element={
               <ProtectedRoute>
                  <Modifier_reclamation />
                  </ProtectedRoute>
               
              }
              key="Modifier_reclamation"
            />
            <Route
              exact
              path="Ajouter_reunion"
              element={
                <ProtectedRoute>
                  <Ajouter_reunion />
                  </ProtectedRoute>
               
              }
              key="Ajouter_reunion"
            />
            <Route
              exact
              path="Modifier_reunion/:id"
              element={
                 <ProtectedRoute>
                  <Modifier_reunion />
                  </ProtectedRoute>
              }
              key="Modifier_reunion"
            />

           
           
       


         
            <Route
              exact
              path="Ajouter_template"
              element={
                 <ProtectedRoute>
                  <Ajouter_template />
                  </ProtectedRoute>
               
              }
              key="Ajouter_template"
            />
            <Route
              exact
              path="Modifier_template/:id"
              element={
                  <ProtectedRoute>
                  <Modifier_template />
                  </ProtectedRoute>
               
              }
              key="Modifier_template"
            />
        <Route
              exact
              path="Ajouter_client"
              element={
                 <ProtectedRoute>
                  <Ajouter_client />
                  </ProtectedRoute>
               
              }
              key="Ajouter_client"
            />
          <Route
              exact
              path="Modifier_client/:id"
              element={
                    <ProtectedRoute>
                  <Modifier_client />
                  </ProtectedRoute>
               
              }
              key="Modifier_client"
            />
            <Route
              exact
              path="Ajouter_Partenaire"
              element={
                    <ProtectedRoute>
                  <Ajouter_Partenaire />
                  </ProtectedRoute>
               
              }
              key="Ajouter_Partenaire"
            />
             <Route
              exact
              path="Modifier_Partenaire/:id"
              element={
                  <ProtectedRoute>
                  <Modifier_Partenaire />
                  </ProtectedRoute>
               
              }
              key="Modifier_Partenaire"
            />
            <Route
              exact
              path="Ajouter_Employe"
              element={
                 <ProtectedRoute>
                  <Ajouter_Employe />
                  </ProtectedRoute>
               
              }
              key="Ajouter_Employe"
            />
                <Route
              exact
              path="Modifier_Employe/:id"
              element={
                 <ProtectedRoute>
                  <Modifier_Employe />
                  </ProtectedRoute>
               
              }
              key="Modifier_Employe"
            />
                      <Route
              exact
              path="Ajouter_tache"
              element={
                 <ProtectedRoute>
                  <Ajouter_tache />
                  </ProtectedRoute>
              }
              key="Ajouter_tache"
            />
                        <Route
              exact
              path="Modifier_tache/:id"
              element={
               <ProtectedRoute>
                  <Modifier_tache />
                  </ProtectedRoute>
              }
              key="Modifier_tache"
            />
            <Route
              exact
              path="Ajouter_projet"
              element={
               <ProtectedRoute>
                  <Ajouter_projet/>
                  </ProtectedRoute>
         
              }
              key="Ajouter_projet"
            />
             <Route
                     exact
                     path="Modifier_projet/:id"
                    element={ <ProtectedRoute><Modifier_projet /></ProtectedRoute>}
                      key="Modifier_projet"
/>


            <Route
              exact
              path="user-management"
              element={
       
                  <UserManagement />
         
              }
              key="user-management"
            />
            {getRoutes(routes)}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </ThemeProvider>
      )}
    </>
  );
}
