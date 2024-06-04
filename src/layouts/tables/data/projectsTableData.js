import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects, deleteProject } from "../../../feature/project/projectSlice";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MDModel from "components/MDModel";
import { deleteaUser, getClients } from "feature/auth/authSlice";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
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
  const userName1 = token ? JSON.parse(token).Nom_Prénom : null;
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

  const handleOpen = (id) => {
    setSelectedItemId(id);
    setOpen(true);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (projectId) => {
    dispatch(deleteProject(projectId));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProjects()); // Rafraîchir les projets après la suppression
    }, 100);
  };
  const Job1 = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="error" fontWeight="medium">
        {title}
      </MDTypography>

    </MDBox>
  );
  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>

    </MDBox>
  );
  const Author = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>


      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
  
      </MDBox>
    </MDBox>
  );
  const rows = filteredProjects.map((item, index) => ({
    key: index + 1,
    Nom: <Author name={item.nom}/>,
    Client:<Job title={item.client} description="" />,

    type: <Job title={item.type}/>,
    Priorite: <MDBox ml={-1}>
    <MDBadge badgeContent={item.priorité} color="dark" variant="gradient" size="sm" />
  </MDBox>,
    Duree: <Job title={item.duree} description="" />,
    Description: <Job title={item.description} description="" />,
    date_debutprojet: <Job1 title={item.date_debutprojet} color="info" description="" />,
    date_finprojet: <Job1 title={item.date_finprojet} description="" />,
    
    action: (
      <MDBox>
        {isAdmin && (
          <>
            <MDTypography component="a" href={`Modifier_projet/${item._id}`} variant="caption" color="text" fontWeight="medium" mr={2}>
              <EditIcon />
            </MDTypography>
            <MDTypography component="a" href="#" onClick={() => handleOpen(item._id)} variant="caption" color="text" fontWeight="medium">
              <DeleteIcon />
            </MDTypography>
          </>
        )}
        <MDModel
          open={open && selectedItemId === item._id}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <MDBox sx={{ ...style, width: 400 }}>
            <MDTypography variant="h5" fontWeight="medium" color="dark">
              Confirmation
            </MDTypography>
            <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
              <MDBox ml={1} display="flex">
                <MDButton onClick={() => handleDelete(item._id)} variant="gradient" color="info">Delete</MDButton>
              </MDBox>
              <MDBox ml={15} display="flex">
                <MDButton onClick={handleClose} ml={2} variant="gradient" color="info">Cancel</MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </MDModel>
      </MDBox>
    )
  }));

  const columns = [
    { Header: "Nom du projet", accessor: "Nom", align: "left" },
    { Header: "Type du projet", accessor: "type", align: "left" },
    { Header: "Description", accessor: "Description", align: "center" },
    { Header: "Nom du client", accessor: "Client", align: "center" },
    { Header: "Durée", accessor: "Duree", align: "center" },
    { Header: "Priorite", accessor: "Priorite", align: "left" },
    { Header: "date début du projet", accessor: "date_debutprojet", align: "center" },
    { Header: "date fin du projet", accessor: "date_finprojet", align: "left" },

  
  ];

  if (isAdmin) {
    columns.push({ Header: "Action", accessor: "action", align: "center" });
  }

  return {
    columns,
    rows,
  };
};

export default Data;
