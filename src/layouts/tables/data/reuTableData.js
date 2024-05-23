import React, { useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from "react-redux";
import { getReus, DeleteReus, updatePropositionRefusedToAccepted } from "../../../feature/reunion/reuSlice";
import MDModel from "components/MDModel";

const Data = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [selectedItemId, setSelectedItemId] = React.useState(null);

  // Récupérer l'utilisateur actuel depuis le localStorage
  const token = localStorage.getItem("user");
  const currentUser = JSON.parse(token);

  // Déterminer si l'utilisateur actuel est un administrateur
  const isAdmin = currentUser?.role === "admin";

  useEffect(() => {
    dispatch(getReus());
  }, [dispatch]);

  const handleOpen = (id) => {
    setSelectedItemId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (reuId) => {
    try {
      await dispatch(DeleteReus(reuId));
      setOpen(false);
      dispatch(getReus());
    } catch (error) {
      console.error("Error deleting reu:", error);
    }
  };

  const handleUpdateProposition = (id) => {
    dispatch(updatePropositionRefusedToAccepted(id))
      .then(() => {
        dispatch(getReus());
        const updatedReus = useSelector((state) => state.reu?.reus);
        const updatedMeeting = updatedReus.find((item) => item._id === id);

        if (updatedMeeting?.Proposition === 'REFUSÉE') {
          window.location.href = '/Creation_Reunion';
        }
      })
      .catch((error) => {
        console.error("Failed to update proposition:", error);
      });
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
  const renderButton = (item) => {
    const isAccepted = item.Proposition === 'ACCEPTÉE';
    const buttonStyle = {
      background: isAccepted ? 'linear-gradient(45deg, #0c71c2 30%, #21cbf3 90%)' : 'linear-gradient(45deg, #c21c10 30%, #b03b31 90%)',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '10px',
      padding: '6px 10px',
      borderRadius: '4px',
    };

    return (
      <MDButton
      style={buttonStyle}
      onClick={() => isAdmin && handleUpdateProposition(item._id)}
      disabled={!isAdmin}
      href={item.Proposition === 'REFUSÉE' ? '/Creation_Reunion' : undefined}
    >
      {item.Proposition}
    </MDButton>
    );
  };
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
  const reuState = useSelector((state) => state.reu?.reus);

  // Vérifiez si reuState est un tableau avant de le filtrer et mapper
  const rows = Array.isArray(reuState)
  ? reuState
      .filter((item) => {
        if (isAdmin) {
          return true; // Affiche toutes les réunions pour les admins
        } else {
          return item.affecte_par === currentUser?.Nom_Prénom; // Affiche les réunions affectées à l'utilisateur
        }
      })
      .map((item, index) => ({
        key: index + 1,
        Titre: <Author name={item.titre}  />,
        Description:  <Job title={item.description} description="" />,
        Affecte_par:<Job title={item.affecte_par} description="" />,
        Type: <Job title={item.type} description="" />,
        Action: renderButton(item), // Utiliser la fonction renderButton
        action: (
          <MDBox>
            <MDTypography
              component="a"
              href={`Modifier_reunion/${item._id}`}
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
        ),
      }))
  : [];



  const columns = [
      { Header: "Titre", accessor: "Titre", align: "left" },
      { Header: "Proposition", accessor: "Action", align: "center", show: isAdmin },
      { Header: "Description", accessor: "Description", align: "left" },
      { Header: "Affecté par", accessor: "Affecte_par", align: "center" },
      { Header: "Type", accessor: "Type", align: "center" },
      
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
