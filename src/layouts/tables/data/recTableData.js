import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from "react-redux";
import { deleteRec, getAllRecs } from "../../../feature/reclamation/recSlice";
import MDModel from "components/MDModel";
import MDBadge from "components/MDBadge";

const Data = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("user");
  const currentUser = JSON.parse(token);
  const userRole = token ? JSON.parse(token).role : null;
  const [open, setOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const isAdmin = userRole === "admin";
  useEffect(() => {
    dispatch(getAllRecs());
  }, [dispatch]);

  const recState = useSelector((state) => state.rec?.recs);

  const handleOpen = (id) => {
    setSelectedItemId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = (recId) => {
    dispatch(deleteRec(recId));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllRecs()); // Rafraîchir les projets après la suppression
    }, 100);
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
  // Check if recState is an array before filtering and mapping
  const filteredRecs = Array.isArray(recState)
    ? recState.filter((item) => {
        // If the user is admin, show all reclamations; otherwise, show only the user's reclamations
        return currentUser?.role === "admin" || item.Nom_Prénom === currentUser?.Nom_Prénom;
      })
    : [];
    const Job = ({ title, description }) => (
      <MDBox lineHeight={1} textAlign="left">
        <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
          {title}
        </MDTypography>
  
      </MDBox>
    );
    const Author = ({ image, name, email }) => (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
    
        <MDBox ml={2} lineHeight={1}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {name}
          </MDTypography>
      
        </MDBox>
      </MDBox>
    );
  const rows = filteredRecs.map((item) => {
    return {
      key: item._id,
      titre: <Author name={item.titre}  />,
      Client: <Job title={item.Nom_Prénom} description="" />,
      sujet:  <Job title={item.sujet} description="" />,
      priorite: <MDBox ml={-1}>
    <MDBadge badgeContent={item.priorite} color="dark" variant="gradient" size="sm" />
  </MDBox>,
      action: (
        <MDBox>
          <MDTypography
            component="a"
            href={`Modifier_reclamation/${item._id}`}
            variant="caption"
            color="text"
            fontWeight="medium"
            mr={2}
          >
            <EditIcon />
          </MDTypography>
          <MDTypography
            component="a"
            href="#"
            onClick={() => handleOpen(item._id)}
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            <DeleteIcon />
          </MDTypography>
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
    };
  });

  const columns = [
    { Header: "Titre", accessor: "titre", align: "left" },
    { Header: "Nom et Prénom", accessor: "Client", align: "left" },
    { Header: "Sujet", accessor: "sujet", align: "center" },
    { Header: "Priorite", accessor: "priorite", align: "center" },
  
  ];

  if (isAdmin) {
    columns.push({ Header: "Action", accessor: "action", align: "center" });
  }

  // Retourner les colonnes et les lignes pour le rendu
  return {
    columns,
    rows,
  };
};


export default Data;
