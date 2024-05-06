import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { createCommentaire } from "feature/commentaire/commentaireSlice";
import Header from "./Header";
import MDSelect from "components/MDSelect";
import { MenuItem } from "@mui/material";
// Importez getTasks correctement depuis votre slice de tâche
import { getTasks } from "feature/tache/tacheSlice";
import { getallUser } from "feature/auth/authSlice";

const Add_CommentaireProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDemo, setIsDemo] = useState(false);
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const taskState = useSelector((state) => state.task?.tasks);
  
  const token = localStorage.getItem("user");

  // Extraction du Nom_Prénom du token
  const parsedToken = token ? JSON.parse(token) : {};
  const userEmail = parsedToken.email || "";
  const userNomPrenom = parsedToken.Nom_Prénom || "";
  useEffect(() => {
    dispatch(getallUser());
  }, [dispatch]); // Ajout de la dépendance dispatch
  const NomState = useSelector((state) => state.auth?.user);
  const [notification, setNotification] = useState(false);
  const [add_commentaire, setAddcommentaire] = useState({
    project:"",
    affecte_par: userEmail,
    Commentaire: "",

  });
  useEffect(() => {
    if (notification === true) {
      setTimeout(() => {
        setNotification(false);
      }, 5000);
    }
  }, [notification]);

  const changeHandler = (e) => {
    setAddcommentaire({
      ...add_commentaire,
      [e.target.name]: e.target.value
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
  
    if (
      add_commentaire.affecte_par.trim().length === 0 ||
      add_commentaire.project.trim().length === 0 ||
      add_commentaire.Commentaire.trim().length === 0 
    ) {
      setNotification({ show: true, message: "Veuillez remplir tous les champs obligatoires." });
      return;
    }
    try {
    // Dispatchez l'action createCommentaire avec les données du commentaire
    const response = await dispatch (createCommentaire(add_commentaire));
    if (response.error) {
      throw new Error(response.error.message); // Gestion explicite de l'erreur
    }
    setNotification({ show: true, message: "Commentaire ajouté avec succès." });
    setTimeout(() => {
      navigate("/Commentaire");
    }, 1500);
  
  } catch (error) {
    console.error("Erreur lors de la création ou de la modification du Commentaire :", error);
    setNotification({ show: true, message: "Une erreur s'est produite lors de l'opération. Veuillez réessayer." });
  }
};
  

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header >
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
              <MDBox mb={1} width="100%" display="flex" alignItems="center">
                <MDInput
                  type="text"
                  fullWidth
                  name="Nom_Prénom"
                  value={userNomPrenom}
                  placeholder="Nom_Prénom"
                 
                />
             
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
                Project
              </MDTypography>
              <MDBox mb={2} width="100%">
                <MDSelect
                  fullWidth
                  name="project"
                  value={add_commentaire.project}
                  onChange={changeHandler}
                  displayEmpty // Permet d'afficher le placeholder
        renderValue={(selected) => selected || " Selectionner le project"}
                >
                  <MenuItem value="" disabled>
                  Selectionner le project
                  </MenuItem>
                  {taskState?.map((item, index) => (
          <MenuItem key={item._id} value={`${item.project}`}>
  {item.project}
</MenuItem>

        ))}
                </MDSelect>
                {add_commentaire.project.trim().length === 0 && (
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
              Commentaire
            </MDTypography>
            <MDBox mb={2} width="100%">
              <MDInput
                type="text"
                fullWidth
                name="Commentaire"
                value={add_commentaire.Commentaire}
                placeholder="Ecrire le commentaire"
                onChange={changeHandler}
              />
               {add_commentaire.Commentaire.trim().length === 0 && (
                  <MDTypography variant="caption" color="error">
                    Champ obligatoire
                  </MDTypography>
                )}
            </MDBox>
          </MDBox>
        </MDBox>

        <MDBox mt={4} display="flex" justifyContent="end">
          <MDButton variant="gradient" color="info" type="submit">
Enregistrer          </MDButton>
        </MDBox>
      </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
};

export default Add_CommentaireProfile;
