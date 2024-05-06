import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Header from "./Header";
import { resetState, AddReus, getaReu, UpdateReus } from "feature/reunion/reuSlice";
import MDSelect from "components/MDSelect";
import { MenuItem } from "@mui/material";
import { getallUser } from "feature/auth/authSlice";

const Add_Reu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Extraction du Nom_Prénom du token
  const token = localStorage.getItem("user");
  const parsedToken = token ? JSON.parse(token) : {};
  const userNomPrenom = parsedToken.Nom_Prénom || "";
  const getReuID = location.pathname.split("/")[2];
  useEffect(() => {
    dispatch(getallUser());
  }, [dispatch]); // Ajout de la dépendance dispatch

  const [add_Reu, setAdd_Reu] = useState({
    titre: "",
    description: "",
    affecte_par: userNomPrenom,
    type: "",
  });

  const [notification, setNotification] = useState(false);
  const newReu = useSelector((state) => state.reu?.reus);
  useEffect(() => {
    if (getReuID !== undefined) {
      dispatch(getaReu(getReuID)); // Charge les données de la réunion spécifique
      setAdd_Reu({
        titre: newReu?.titre || "",
        description: newReu?.description || "",
  
        type: newReu?.type || "",
       
      });
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getReuID]);
  
  useEffect(() => {
    if (getReuID !== undefined) {
        setAdd_Reu({
        id: getReuID,
        titre: newReu?.titre || "",
        description: newReu?.description || "",
        affecte_par: userNomPrenom,
        type: newReu?.type || "",
     
      });
    } else {
   
    }
  }, [newReu]);
 

  const changeHandler = (e) => {
    setAdd_Reu({
      ...add_Reu,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      add_Reu.titre.trim().length === 0 ||
      add_Reu.description.trim().length === 0 ||
      add_Reu.affecte_par.trim().length === 0 ||
      add_Reu.type.trim().length === 0
    ) {
      setNotification({ show: true, message: "Veuillez remplir tous les champs obligatoires." });
      return;
    }
    try {
    // Dispatch de l'action
    if (getReuID =='' ) {
      const response = await dispatch(AddReus(add_Reu));
      if (response.error) {
        throw new Error(response.error.message); // Gestion explicite de l'erreur
      }
      setNotification({ show: true, message: "Réunion ajouté avec succès." });
      setTimeout(() => {
        dispatch(resetState());
        navigate("/reunion");
      }, 1500);

    } else {
      const response = await dispatch(UpdateReus(add_Reu));
      if (response.error) {
        throw new Error(response.error.message); // Gestion explicite de l'erreur
      }
      setNotification({ show: true, message: "Réunion modifié avec succès." });
      setTimeout(() => {
        dispatch(resetState());
        navigate("/reunion");
      }, 1500);
    }
     
  } catch (error) {
    console.error("Erreur lors de la création ou de la modification du Réunion :", error);
    setNotification({ show: true, message: "Une erreur s'est produite lors de l'opération. Veuillez réessayer." });
  }
};
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header name={add_Reu.titre}>
      {notification.show && (
      <MDAlert mt="20px" severity={notification.message.includes("succès") ? "success" : "error"}>
        <MDTypography variant="body2" color="white">
          {notification.message}
        </MDTypography>
      </MDAlert>
      )}
        <MDBox
          component="form"
          role="form"
          onSubmit={submitHandler}
          display="flex"
          flexDirection="column"
        >
          <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              mr={2}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                Titre
              </MDTypography>
              <MDBox mb={2} width="100%">
                <MDInput
                  type="text"
                  fullWidth
                  name="titre"
                  value={add_Reu.titre}
                  placeholder="Titre"
                  onChange={changeHandler}
                />
                             
       {add_Reu.titre.trim().length === 0 && (
      <MDTypography variant="caption" color="error">
        Champ obligatoire
      </MDTypography>
    )}
          
              </MDBox>
            </MDBox>
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              ml={2}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                Description
              </MDTypography>
              <MDBox mb={1} width="100%">
                <MDInput
                  type="text"
                  fullWidth
                  name="description"
                  value={add_Reu.description}
                  placeholder="Description"
                  onChange={changeHandler}
                />
                    {add_Reu.description.trim().length === 0 && (
      <MDTypography variant="caption" color="error">
        Champ obligatoire
      </MDTypography>
    )}
              </MDBox>
            </MDBox>
          </MDBox>

          <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              mr={2}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                Nom et Prénom
              </MDTypography>
              <MDBox mb={1} width="100%" display="flex" alignItems="center">
                <MDInput
                  type="text"
                  fullWidth
                  name="affecte_par"
                  value={add_Reu.affecte_par}
                  placeholder="Nom_Prénom"
                  onChange={changeHandler}
                  disabled
                />
      {add_Reu.affecte_par.trim().length === 0 && (
      <MDTypography variant="caption" color="error">
        Champ obligatoire
      </MDTypography>
    )}
              </MDBox>
            </MDBox>
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              ml={2}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                Type
              </MDTypography>
              <MDBox mb={2} width="100%">
                <MDSelect
                  fullWidth
                  name="type"
                  value={add_Reu.type}
                  onChange={changeHandler}
                  displayEmpty
                  renderValue={(selected) => selected || "Sélectionner le type"}
                >
  
                  <MenuItem value="" disabled>
                    Sélectionner le type
                  </MenuItem>
                  <MenuItem value="Présentielle">Présentielle</MenuItem>
                  <MenuItem value="En ligne">En ligne</MenuItem>
                </MDSelect>
                {add_Reu.type.trim().length === 0 && (
      <MDTypography variant="caption" color="error">
        Champ obligatoire
      </MDTypography>
    )}
              </MDBox>
            </MDBox>
          </MDBox>

          <MDBox mt={4} display="flex" justifyContent="end">
            <MDButton variant="gradient" color="info" type="submit">
              Enregistrer
            </MDButton>
          </MDBox>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
};

export default Add_Reu;
