import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDModel from "components/MDModel";
import MDAvatar from "components/MDAvatar";
import { useDispatch, useSelector } from "react-redux";
import { deleteaUser, getClients } from "feature/auth/authSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Data = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [colorMap, setColorMap] = useState({});

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  const clientState = useSelector((state) => state.auth?.clients);

  const handleOpen = (id) => {
    setSelectedItemId(id);
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleDelete = (userId) => {
    dispatch(deleteaUser(userId));
    setOpen(false);
    // Rafraîchir la liste des clients après la suppression
    dispatch(getClients());
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

  const token = localStorage.getItem("user");
  const userRole = token ? JSON.parse(token).role : null;
  const userPartner = token ? JSON.parse(token)._id : null; // Récupérer le nom_prénom du partenaire connecté
  const isAdmin = userRole === "admin";
  useEffect(() => {
    // Générer la couleur pour chaque client en fonction de leur nom
    const generateColor = (name) => {
      const initials = name.split(" ").map((part) => part[0]).join("");
      const colors = ["#2196f3"];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const newColorMap = {};
    if (Array.isArray(clientState)) {
      clientState.forEach((client) => {
        const { Nom_Prénom } = client;
        if (!colorMap[Nom_Prénom]) {
          newColorMap[Nom_Prénom] = generateColor(Nom_Prénom);
        }
      });
      setColorMap((prevColorMap) => ({ ...prevColorMap, ...newColorMap }));
    }
  }, [clientState]);

  const getAvatarColor = (name) => {
    return colorMap[name] || "#2196f3"; // Couleur par défaut
  };

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

  const filteredClients = clientState && Array.isArray(clientState) ? clientState.filter((item) => {
    if (userRole === "partner" && item.Partenaire === userPartner) {
      return true; // Afficher les clients correspondant au partenaire connecté
    } else if (userRole === "admin") {
      return true; // Afficher tous les clients pour les utilisateurs avec le rôle "admin"
    } else {
      return false; // Ne pas afficher pour les autres cas
    }
  }) : [];
  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>

    </MDBox>
  );
  const rows = filteredClients.map((item, index) => ({
    key: item._id,
    Nom: <Author name={item.Nom_Prénom} email={item.email} />,
    Société: <Job title={item.Société} description="" />,
    Email:<Job title={item.email} description="" />,
    Telephone: <Job title={item.Téléphone} description="" />,
    Role: <Job title={item.role} description="" />,
  
    action: (
      
      <MDBox>
        {userRole === "admin" && (
          <React.Fragment>
            <MDTypography component="a" href={`Modifier_client/${item._id}`} variant="caption" color="text" fontWeight="medium" mr={2}>
              <EditIcon /> 
            </MDTypography>
            <MDTypography component="a" href="#" onClick={() => handleOpen(item._id)} variant="caption" color="text" fontWeight="medium">
              <DeleteIcon />
            </MDTypography>
          </React.Fragment>
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
      { Header: "Nom et Prénom", accessor: "Nom", width: "45%", align: "left" },
      { Header: "Société", accessor: "Société", align: "left" },
      { Header: "Email", accessor: "Email", align: "center" },
      { Header: "Telephone", accessor: "Telephone", align: "center" },
  
      
     
    ];
    if (isAdmin) {
      columns.push( { Header: "Action", accessor: "action", align: "center" },);
    }
  
    // Retourner les colonnes et les lignes pour le rendu
    return {
      columns,
      rows,
    };
  };
  

export default Data;
