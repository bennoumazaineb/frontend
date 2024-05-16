import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDSelect from "components/MDSelect";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";
import Header from "../../layouts/add_client/Header";
import MenuItem from '@mui/material/MenuItem';
import { createAllUser, resetState } from "feature/auth/authSlice";
import { getUserByUser } from "feature/auth/authSlice";
import { updateUser } from "feature/auth/authSlice";
import { getPartners } from "feature/auth/authSlice";

const Add_clientProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPartners());
  }, [dispatch]); // Ajout de la dépendance dispatch

  const partnerState = useSelector((state) => state.auth?.partners);
  const [add_client, setadd_client] = useState({
    Nom_Prénom: "",
    Société: "",
    email: "",
    Téléphone: "",
    password: "",
    Poste: "null",
    role: "client",
    Partenaire: "",
  });

  const [isDemo, setIsDemo] = useState(false);
  const [notification, setNotification] = useState(false);
  const getClientID = location.pathname.split("/")[2];
  const newClient = useSelector((state) => state.auth?.orderbyuser?.getaUser); // Utilisation de newClient pour obtenir les données du client
console.log(newClient)
  useEffect(() => {
    if (getClientID !== undefined) {
      dispatch(getUserByUser(getClientID));
      setadd_client({
        Nom_Prénom: newClient?.Nom_Prénom|| "",
        Société: newClient?.Société || "",
        email: newClient?.email || "",
        Téléphone: newClient?.Téléphone || "",
        password: newClient?.password || "",
        Poste: "null",
        role: "client",
        Partenaire: newClient?.Partenaire || "",
      });
    } else {
      dispatch(resetState());
    }
  }, [getClientID]);
  useEffect(() => {
    if (getClientID !== undefined) {
      setadd_client({
  
        id: getClientID,
        Nom_Prénom: newClient?.Nom_Prénom|| "",
        Société: newClient?.Société || "",
        email: newClient?.email || "",
        Téléphone: newClient?.Téléphone || "",
        password: newClient?.password || "",
        Poste: "null",
        role: "client",
        Partenaire: newClient?.Partenaire || "",
      });
    } else {
    
    }
  }, [newClient]);
  useEffect(() => {
    if (notification === true) {
      setTimeout(() => {
        setNotification(false);
      }, 5000);
    }
  }, [notification]);
  const changeHandler = (e) => {
    const { name, value } = e.target;
    
    // Vérifier si le champ de téléphone contient uniquement des chiffres et a une longueur maximale de 8
    if (name === "Téléphone") {
      const formattedValue = value.replace(/\D/g, ""); // Supprimer tous les caractères non numériques
      const maxLengthValue = formattedValue.slice(0, 8); // Limiter à 8 chiffres max
      setadd_client({ ...add_client, [name]: maxLengthValue });
    } else {
      setadd_client({ ...add_client, [name]: value });
    }
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
    if (
      add_client.Nom_Prénom.trim().length === 0 ||
      add_client.email.trim().length === 0 ||
      (typeof add_client.Téléphone === 'string' && add_client.Téléphone.trim().length === 0) ||
      add_client.Société.trim().length === 0 ||
      add_client.password.trim().length === 0 ||
      add_client.Poste.trim().length === 0 ||
      !add_client.email.trim().match(mailFormat) ||
      add_client.password.trim().length === 0
    ) {
      // Affichage de la notification appropriée en fonction de la condition
      if (add_client.password.trim().length < 6) {
        // Si le mot de passe a moins de 6 caractères
        setNotification({ show: true, message: "Le mot de passe doit comporter au moins 6 caractères." });
      } else {
        // Si d'autres champs obligatoires sont manquants ou invalides
        setNotification({ show: true, message: "Veuillez remplir tous les champs obligatoires." });
      }
      return;
    }
    try {
      if (getClientID === '') {
        const response = await dispatch(createAllUser(add_client));
        if (response.error) {
          throw new Error(response.error.message); // Gestion explicite de l'erreur
        }
        setNotification({ show: true, message: "Client ajouté avec succès." });
      } else {
        const response = await dispatch(updateUser(add_client));
        if (response.error) {
          throw new Error(response.error.message); // Gestion explicite de l'erreur
        }
        setNotification({ show: true, message: "Client modifié avec succès." });
      }
  
      setTimeout(() => {
        navigate("/clients");
      }, 1500);
    } catch (error) {
      console.error("Erreur lors de la création ou de la modification du client :", error);
      setNotification({ show: true, message: "Une erreur s'est produite lors de l'opération. Veuillez réessayer." });
    }
  };
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header name={add_client.Nom_Prénom}>
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
                Nom et Prénom
              </MDTypography>
              <MDBox mb={2} width="100%">
                <MDInput
                  type="Nom_Prénom"
                  fullWidth
                  name="Nom_Prénom"
                  placeholder="Entrez nom_prénom du client"
                  value={add_client.Nom_Prénom}
                  onChange={changeHandler}
                />
                {add_client.Nom_Prénom.trim().length === 0 && (
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
                Email
              </MDTypography>
              <MDBox mb={1} width="100%">
                <MDInput
                  type="email"
                  fullWidth
                  name="email"
                  value={add_client.email}
                  onChange={changeHandler}
                  placeholder="pseudo@exemple.com"
                  disabled={isDemo}
                />
                 {add_client.email.trim().length === 0 && (
              <MDTypography variant="caption" color="error">
                Champ obligatoire
              </MDTypography>
            )}
              </MDBox>
              {isDemo && (
                <MDTypography variant="caption" color="text" fontWeight="light">
                </MDTypography>
              )}
            </MDBox>
           
          </MDBox>

          <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
      <MDBox display="flex" flexDirection="column" alignItems="flex-start" width="100%" mr={2}>
        <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
          Téléphone
        </MDTypography>
        <MDBox mb={2} width="100%">
          <MDInput
            type="text"
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              maxLength: 8,
            }}
            fullWidth
            name="Téléphone"
            placeholder="(+216)XX-XXX-XXX"
            value={add_client.Téléphone}
            onChange={changeHandler}
          />
    {typeof add_client.Téléphone === 'string' && add_client.Téléphone.trim().length === 0 && (
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
              mr={2}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                Société
              </MDTypography>
              <MDBox mb={1} width="100%">
                <MDInput
                  type="Société"
                  fullWidth
                  name="Société"
                  placeholder="Entrez le nom du société "
                  value={add_client.Société}
                  onChange={changeHandler}
                />
                {add_client.Société.trim().length === 0 && (
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
                Partenaire
              </MDTypography>
              <MDBox mb={1} width="100%">
                <MDSelect
                  fullWidth
                  name="Partenaire"
                  value={add_client.Partenaire}
                  onChange={changeHandler}
                  disabled={isDemo}
                  displayEmpty // Permet d'afficher le placeholder
        renderValue={(selected) => selected || "Selectionner  Partenaire (s'il existe)"}
                >
                  <MenuItem value="" disabled>
                    Sélectionner partenaire
                  </MenuItem>
                  {partnerState?.map((item, index) => (
          <MenuItem key={item._id} value={`${item.Nom_Prénom}`}>
  {item.Nom_Prénom}
               
                    </MenuItem>))}
                </MDSelect>
           
              </MDBox>
            </MDBox>

            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              mr={2}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                Mot de passe
              </MDTypography>
              <MDBox mb={2} width="100%">
                <MDInput
                  type="password"
                  fullWidth
                  name="password"
                  placeholder="Créez un mot de passe(au moins 6 caractères)"
                  value={add_client.password}
                  onChange={changeHandler}
                />
                {add_client.password.trim().length === 0 && (
                  <MDTypography variant="caption" color="error">
                    Champ obligatoire
                  </MDTypography>
                )}
              </MDBox>
            </MDBox>      
          </MDBox>

          <MDBox  mt={4} display="flex" justifyContent="end">
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

export default Add_clientProfile;