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
import { createFacture } from "feature/facture/factureSlice";
import MDSelect from "components/MDSelect";
import { MenuItem } from "@mui/material";
import { getClients } from "feature/auth/authSlice";
import { getProjects } from "feature/project/projectSlice";
const AddFacture = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDemo, setIsDemo] = useState(false);
  // Extraction du Nom_Prénom du token
  const token = localStorage.getItem("user");
  const parsedToken = token ? JSON.parse(token) : {};

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]); // Ajout de la dépendance dispatch
  const clientState = useSelector((state) => state.auth?.clients);
  console.log("clientState",clientState)

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]); // Ajout de la dépendance dispatch
  const projectState = useSelector((state) => state.project?.projects);
  const [add_Facture, setAddfacture] = useState({
    client: "",
  
    montant:"",
    project:""

  });

  const [notification, setNotification] = useState(false);


 
  const changeHandler = (e) => {
    const { name, value } = e.target;
  
    // Vérifier si le champ de montant est modifié
    if (name === "montant") {
      // Supprimer tous les caractères non numériques de la valeur saisie
      const formattedValue = value.replace(/\D/g, ""); // Remplace tous les caractères non numériques par une chaîne vide
  
      // Limiter la longueur maximale à 8 caractères
      const truncatedValue = formattedValue.slice(0, 8);
  
      // Mettre à jour l'état avec la valeur formatée
      setAddfacture({ ...add_Facture, [name]: truncatedValue });
    } else {
      // Mettre à jour l'état avec la valeur directement si ce n'est pas le champ "montant"
      setAddfacture({ ...add_Facture, [name]: value });
    }
  };
  

  const submitHandler = async (e) => {
    e.preventDefault();
    const { client, montant, project } = add_Facture;

    // Vérification que le champ "Montant" est un nombre
    if (isNaN(parseFloat(montant)) || !isFinite(montant)) {
      setNotification({ show: true, message: "Veuillez saisir un montant valide (nombre)." });
      return;
    }

    if (client.trim().length === 0 || montant.trim().length === 0 || project.trim().length === 0) {
      setNotification({ show: true, message: "Veuillez remplir tous les champs obligatoires." });
      return;
    }

    try {
      const response = await dispatch(createFacture(add_Facture));

      setNotification({ show: true, message: "Facture ajoutée avec succès." });
      setTimeout(() => {
        navigate("/Facture");
      }, 1000);
    } catch (error) {
      console.error("Erreur lors de la création de la facture :", error);
      setNotification({ show: true, message: "Une erreur s'est produite lors de l'opération. Veuillez réessayer." });
    }
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header name={add_Facture.client}>
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
      {/* Nom et Prénom du client */}
      <MDBox display="flex" flexDirection="column" alignItems="flex-start" width="50%" mr={2}>
        <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
          Nom et Prénom du client
        </MDTypography>
        <MDBox mb={1} width="100%">
          <MDSelect 
            fullWidth
            name="client"
            value={add_Facture.client}
            onChange={changeHandler}
            disabled={isDemo}
            displayEmpty // Permet d'afficher le placeholder
            renderValue={(selected) => selected || "Sélectionner un client"} // Texte par défaut lorsque rien n'est sélectionné
          >
            {clientState?.map((item, index) => (
              <MenuItem key={item._id} value={item.Nom_Prénom}>
                {item.Nom_Prénom}
              </MenuItem>
            ))}
          </MDSelect>
          {add_Facture.client.trim().length === 0 && (
            <MDTypography variant="caption" color="error">
              Champ obligatoire
            </MDTypography>
          )}
        </MDBox>
      </MDBox>

      {/* Projet */}
      <MDBox display="flex" flexDirection="column" alignItems="flex-start" width="50%" mr={2}>
        <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
          Projet
        </MDTypography>
        <MDBox mb={2} width="100%">
          <MDSelect
            fullWidth
            name="project"
            value={add_Facture.project}
            onChange={changeHandler}
            displayEmpty // Permet d'afficher le placeholder
            renderValue={(selected) => selected || "Sélectionner un projet"}
          >
            <MenuItem value="" disabled>
              Sélectionner un projet
            </MenuItem>
            {projectState?.map((item, index) => (
              <MenuItem key={item._id} value={item.nom}>
                {item.nom}
              </MenuItem>
            ))}
          </MDSelect>
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
                Montant
              </MDTypography>
              <MDBox mb={1} width="100%">
                <MDInput
                  type="text"
                  fullWidth
                  name="montant"
                  value={add_Facture.montant}
                  placeholder="Montant(exp:100)"
                  onChange={changeHandler}
                />
                    {add_Facture.montant.trim().length === 0 && (
      <MDTypography variant="caption" color="error">
        Champ obligatoire
      </MDTypography>
    )} </MDBox>
         
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

export default AddFacture;
