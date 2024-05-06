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
import { createAvis } from "feature/avis/avisSlice";
import Header from "./Header";
import MDSelect from "components/MDSelect";
import { MenuItem } from "@mui/material";
import ReactStars from "react-stars";

import { getallUsersExceptAdminAndEmployees } from "feature/auth/authSlice";

const AddAvis = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Note, setNote] = useState(''); // Initialiser Note avec une chaîne vide
  const token = localStorage.getItem("user");

  // Extraction du Nom_Prénom du token
  const parsedToken = token ? JSON.parse(token) : {};
  const userNomPrenom = parsedToken.Nom_Prénom || "";
  const [add_avis, setAddAvis] = useState({
    Avis: "",
    affecte_par: userNomPrenom,
    Note: "",
  });
  const [notification, setNotification] = useState(false);
  const userSaufAdEm = useSelector((state) => state.auth.usersaufempAdmin);
  
console.log("d",add_avis)
  useEffect(() => {
    dispatch(getallUsersExceptAdminAndEmployees());
  }, [dispatch]);

  const changeHandler = (e) => {
    setAddAvis({
      ...add_avis,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingChange = (newRating) => {
    setNote(newRating.toString()); // Mettre à jour Note avec la nouvelle valeur
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      add_avis.affecte_par.trim().length === 0 ||
      add_avis.Avis.trim().length === 0 ||
      Note.trim().length === 0 // Utiliser directement Note du state
    ) {
      setNotification({ show: true, message: "Veuillez remplir tous les champs obligatoires." });
      return;
    }

    const avisData = {
      Note: Number(Note), // Utiliser directement la valeur de Note du state
      affecte_par: add_avis.affecte_par,
      Avis: add_avis.Avis,
    };
    try {
      const response = await  dispatch(createAvis(avisData));
      if (response.error) {
        throw new Error(response.error.message); // Gestion explicite de l'erreur
      }
      setNotification({ show: true, message: "Votre avis est ajouté avec succès." });
      setTimeout(() => {
        navigate("/Propos");
      }, 1500);
  
    } catch (error) {
      console.error("Erreur lors de la création  du Votre avis :", error);
      setNotification({ show: true, message: "Une erreur s'est produite lors de l'opération. Veuillez réessayer." });
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
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
              <MDTypography
                variant="body2"
                color="text"
                ml={1}
                fontWeight="regular"
              >
     
                Nom et Prénom
              </MDTypography>
              <MDBox mb={1} width="100%" display="flex" alignItems="center">
                <MDInput
                  type="text"
                  fullWidth
                  name="Nom_Prénom"
                  value={userNomPrenom}
                  placeholder="Nom Prénom"
                 
                />
              </MDBox>
            </MDBox>
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              mr={2}
            >
              <MDTypography
                variant="body2"
                color="text"
                ml={1}
                fontWeight="regular"
              >
                Avis
              </MDTypography>
              <MDBox mb={2} width="100%">
  <MDInput
    type="text"
    fullWidth
    name="Avis"
    value={add_avis.Avis}
    placeholder="Écrivez votre avis ici"
    onChange={changeHandler}
    multiline

    variant="outlined"
    inputProps={{ maxLength: 500 }} // Limiter la longueur à 500 caractères
  />


                {add_avis.Avis.trim().length === 0 && (
                  <MDTypography variant="caption" color="error">
                    Champ obligatoire
                  </MDTypography>
                )}
              </MDBox>
            </MDBox>
          </MDBox>
          <MDBox
            mt={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <MDTypography variant="body2" color="text" fontWeight="regular">
              Note :
            </MDTypography>
            <ReactStars
              count={5}
              size={27}
              value={Number(Note)} // Utiliser la valeur de Note du state
              onChange={handleRatingChange}
            />
            {Note.trim().length === 0 && (
              <MDTypography variant="caption" color="error">
                Champ obligatoire
              </MDTypography>
            )}
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



export default AddAvis;
