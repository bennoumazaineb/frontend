/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";

import RTL from "layouts/rtl";
import Commentaire from "layouts/notifications";
import Template from "layouts/template";
import Client from "layouts/clients";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Projets from "layouts/projet/index";
import Reunion from "layouts/reunion/index";
import Formulaires from "layouts/formulaire1/index";
import Calendrier  from "layouts/calendrier/Calendar";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'; // Importez l'icône InfoOutlined
import Add_Facture from "layouts/add_facture"
import Login from "auth/login";
import Register from "auth/register";
import ForgotPassword from "auth/forgot-password";
import ResetPassword from "auth/reset-password";
import Facture from "layouts/facture"
// @mui icons
import Icon from "@mui/material/Icon";
import Tache from "layouts/taches";
import Reclamation from "layouts/reclamation";
import Partenaires from "layouts/partenaire";
import Employees from "layouts/Employe";
import Historique from "layouts/historique/index"
import Propos from "layouts/billing/index"

const routes = [
  {
    type: "collapse",
    name: "Tableau de bord",
    key: "Tableau de bord",
    icon: <Icon fontSize="small">tableau de bord</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    role:["admin","employee","client","partner"]
  },

  {
    type: "collapse",
    name: " Projets",
    key: "Projets",
    icon: <Icon fontSize="small">dvr</Icon>,
    route: "/Projets",
    component: <Projets />,
    role:["admin","employee","client","partner"]
  },
  {
    type: "collapse",
    name: "Facture",
    key: "Facture",
    icon: <Icon fontSize="small">dvr</Icon>,
    route: "/Facture",
    component: <Facture />,
    role:["admin","client"]
  },
  

  {
    type: "collapse",
    name: " Calendrier des Tâches",
    key: "Calendrier",
    icon: <Icon fontSize="small">date_range</Icon>,
    route: "/Calendrier",
    component: <Calendrier />,
    role:["admin","employee"]
  },
 

  
  {
    type: "collapse",
    name: " Tâches",
    key: "Tache",
    icon: <Icon fontSize="small">task_alt</Icon>,
    route: "/Tache",
    component: <Tache />,
    role:["admin","employee"]
  },
  {
    type: "examples",
    name: "Employés",
    key: "Employees",
    icon: <Icon fontSize="small">badge</Icon>,
    route: "/Employees",
    component: <Employees />,
    role:["admin"]
  },
  {
    type: "examples",
    name: "Clients",
    key: "clients",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/clients",
    component: <Client />,
    role:["admin","partner"]
  },


  {
    type: "examples",
    name: "Partenaires",
    key: "Partenaires",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/Partenaires",
    component: <Partenaires />,
    role:["admin"]
  },
 
  {
    type: "collapse",
    name: " Réclamations",
    key: "reclamation",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/reclamation",
    component: <Reclamation />,
    role:["admin","client","partner"]
  },

  
  {
    type: "collapse",
    name: " Réunions",
    key: "Reunion",
    icon: <Icon fontSize="small">groups</Icon>,
    route: "/Reunion",
    component: <Reunion />,
    role:["admin","client","partner","employee"]
  },
  {
    type: "collapse",
    name: "Commentaires",
    key: "Commentaire",
    icon: <Icon fontSize="small">chat</Icon>,
    route: "/Commentaire",
    component: <Commentaire />,
    role:["admin","employee","client","partner"]
  },
  {
    type: "collapse",
    name: "Modèles",
    key: "Modéles",
    icon: <Icon fontSize="small">widgets</Icon>,
    route: "/Template",
    component: <Template />,
    role:["admin","client","partner"]
  },
  {
    type: "collapse",
    name: "Formulaires",
    key: "Formulaires",
    icon: <Icon fontSize="small">toc</Icon>,
    route: "/Formulaires",
    component: <Formulaires />,
    role:["admin","employee"]
  },
 
  {
    type: "collapse",
    name: " Historiques",
    key: "Historique",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Historique",
    component: <Historique />,
    role:["admin","employee","client","partner"]
  },
  {
    type: "collapse",
    name: "A_Propos",
    key: "Propos",
    icon: <InfoOutlinedIcon fontSize="small" />, // Utilisez InfoOutlinedIcon pour À propos
    route: "/Propos",
    component: <Propos />,
    role:["admin","client","partner"]
  },

  {
    type: "auth",
    name: "Login",
    key: "login",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/auth/login",
    component: <Login />,
  },
  {
    type: "auth",
    name: "Register",
    key: "register",
    icon: <Icon fontSize="small">reigster</Icon>,
    route: "/auth/register",
    component: <Register />,
  },
  {
    type: "auth",
    name: "Mot de passe oublié",
    key: "forgot-password",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/auth/forgot-password",
    component: <ForgotPassword />,
  },
  {
    type: "auth",
    name: "réinitialiser le mot de passe",
    key: "reset-password",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/auth/reset-password",
    component: <ResetPassword />,
  },
];

export default routes;
