import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects, deleteProject } from "../../../../../feature/project/projectSlice";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MDModel from "components/MDModel";
import { deleteaUser, getClients } from "../../../../../feature/auth/authSlice";
import MDAvatar from "components/MDAvatar";
const Data = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const token = localStorage.getItem("user");

  useEffect(() => {
    dispatch(getClients());
    dispatch(getProjects());
  }, [dispatch]);

  const clientState = useSelector((state) => state.auth?.clients);
  const projectState = useSelector((state) => state.project?.projects) || [];

  const userRole = token ? JSON.parse(token).role : null;
  const userName = token ? JSON.parse(token).Nom_Prénom : null;
  const userName1 = token ? JSON.parse(token)._id : null;
  const isAdmin = userRole === "admin";
  const isEmployee = userRole === "employee";
  const isClient = userRole === "client";
  const isPartner = userRole === "partner";

  const filteredProjects = Array.isArray(projectState)
  ? projectState.filter((project) => {
      if (isAdmin || isEmployee) {
        return true; // Afficher tous les projets pour les administrateurs et les employés
      } else if (isClient) {
        // Afficher les projets où le client correspond au nom/prénom de l'utilisateur connecté
        return project.client === userName;
      } else if (isPartner) {
        // Afficher les projets où le client est associé au partenaire correspondant à l'utilisateur connecté
        const client = clientState.find((client) => client.Nom_Prénom === project.client);
        console.log("client",client)
        return client && client.Partenaire === userName1;
      } else {
        return false; // Par défaut, ne pas afficher les projets pour d'autres rôles non mentionnés
      }
    })
  : [];


  useEffect(() => {
    const generateColor = (name) => {
      const initials = name.split(" ").map((part) => part[0]).join("");
      const colors = ["#2196f3"];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const newColorMap = {};
    if (projectState && Array.isArray(projectState)) {
      projectState.forEach((item) => {
        const name = item.client;
        if (!colorMap[name]) {
          newColorMap[name] = generateColor(name);
        }
      });
      setColorMap(newColorMap);
    }
  }, [projectState]);


  const getAvatarColor = (name) => {
    return colorMap[name] || "#2196f3"; // Couleur par défaut
  };
  const [colorMap, setColorMap] = useState({});
  const Job = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
    </MDBox>
  );
  const Author = ({ name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
           <MDAvatar sx={{ bgcolor: getAvatarColor(name) }}>{name.charAt(0)}</MDAvatar>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const handleDelete = (projectId) => {
    dispatch(deleteProject(projectId));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProjects()); // Rafraîchir les projets après la suppression
    }, 100);
  };

  const rows = filteredProjects.map((item, index) => ({
    key: index + 1,
   Client: <Author name={item.client} />,
    Nom: <Job title={item.nom} />,
    Priorite: <Job title={item.priorité} />,
    Duree: <Job title={item.duree} />,

  
  }));

  const columns = [
    { Header: "Nom et Prénom du client", accessor: "Client", align: "left" },
    { Header: "Nom du projet", accessor: "Nom", align: "left" },

    { Header: "Durée", accessor: "Duree", align: "center" },
    { Header: "Priorité", accessor: "Priorite", align: "center" },
  ];



  return {
    columns,
    rows,
  };
};

export default Data;
