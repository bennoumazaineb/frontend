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
import { resetState, addRec,getARec,UpdateRec  } from "feature/reclamation/recSlice";
import MDSelect from "components/MDSelect";
import { MenuItem } from "@mui/material";
import { getallUsersaufemployees } from "feature/auth/authSlice";
const Add_Rec = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getallUsersaufemployees());
  }, [dispatch]); // Ajout de la dépendance dispatch
  const NomState = useSelector((state) => state.auth?.usersaufemp);
    const token = localStorage.getItem("user");
  console.log("eeeeeee",token)
  console.log(NomState)
  // Extraction du Nom_Prénom du token
  const parsedToken = token ? JSON.parse(token) : {};
  const userNomPrenom = parsedToken.Nom_Prénom || "";
  const [add_Rec, setAdd_Rec] = useState({
    Nom_Prénom: userNomPrenom,
    titre: "",
    sujet: "",
    priorite: "",
   
  });
  const [errors, setErrors] = useState({
    prioriteError: false,
  
    titreError: false,
    sujetError: false
  });
  const [isDemo, setIsDemo] = useState(false);
  const [notification, setNotification] = useState(false);
  const getRecID = location.pathname.split("/")[2];
  const newRec = useSelector((state) => state.rec?.recs);
  console.log(newRec)
  console.log(add_Rec ,add_Rec)
  console.log(getRecID , "getRecID")
  useEffect(() => {
    if (getRecID !== undefined) {
      dispatch(getARec(getRecID));
      setAdd_Rec({
      
        titre: newRec?.titre || "",
        sujet: newRec?.sujet || "",
        priorite: newRec?.priorite || "",
       
      });
    } else {
      dispatch(resetState());
    }
  }, [dispatch,getRecID]);
  useEffect(() => {
    if (getRecID !== undefined) {
        setAdd_Rec({
        id: getRecID,
        Nom_Prénom: userNomPrenom,
        titre: newRec?.titre || "",
        sujet: newRec?.sujet || "",
        priorite: newRec?.priorite || "",
     
      });
    } else {
   
    }
  }, [newRec]);

  useEffect(() => {
    if (notification === true) {
      setTimeout(() => {
        setNotification(false);
      }, 5000);
    }
  }, [notification]);

  const changeHandler = (e) => {
    setAdd_Rec({
      ...add_Rec,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
  
    if (
      add_Rec.titre.trim().length === 0 ||
      add_Rec.sujet.trim().length === 0 ||
      add_Rec.priorite.trim().length === 0
    ) {
      setNotification({ show: true, message: "Veuillez remplir tous les champs obligatoires." });
      return;
    }
  
    try {
      if (getRecID === '') {
        const response = await dispatch(addRec(add_Rec));
        if (response.error) {
          throw new Error(response.error.message); // Gestion explicite de l'erreur
        }
        setNotification({ show: true, message: "Réclamation ajoutée avec succès." });
        setTimeout(() => {
          navigate("/reclamation");
        }, 1500);
      } else {
        const response = await dispatch(UpdateRec(add_Rec));
        if (response.error) {
          throw new Error(response.error.message); // Gestion explicite de l'erreur
        }
        setNotification({ show: true, message: "Réclamation modifiée avec succès." });
        setTimeout(() => {
          navigate("/reclamation");
        }, 1500);
      }
    } catch (error) {
      console.error("Erreur lors de la création ou de la modification de la réclamation :", error);
      setNotification({ show: true, message: "Une erreur s'est produite lors de l'opération. Veuillez réessayer." });
    }
  };
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header name={add_Rec.titre}>
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
              <MDBox mb={1} width="100%">
                <MDInput
                  type="text"
                  fullWidth
                  name="titre"
                  value={add_Rec.titre}
                  placeholder="Titre"
                  onChange={changeHandler}
                  disabled={isDemo}
                />
              </MDBox>
              {add_Rec.titre.trim().length === 0 && (
      <MDTypography variant="caption" color="error">
        Champ obligatoire
      </MDTypography>
    )}
            </MDBox>
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              ml={2}
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
                Sujet
              </MDTypography>
              <MDBox mb={2} width="100%">
                <MDInput
                  type="text"
                  fullWidth
                  name="sujet"
                  value={add_Rec.sujet}
                  placeholder="sujet"
                  onChange={changeHandler}
                />
      {add_Rec.sujet.trim().length === 0 && (
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
    Priorité
  </MDTypography>
  <MDBox mb={2} width="100%">
  <MDSelect 
  fullWidth
  name="priorite"
  value={add_Rec.priorite} // Utilisez la priorité de l'état add_Rec
  onChange={changeHandler}
  disabled={isDemo}
  displayEmpty // Permet d'afficher le placeholder
  renderValue={(selected) => selected || "Select priorité"}
>
  <MenuItem value="" disabled>
    Sélectionner la priorité
  </MenuItem>
  <MenuItem value="Haute">Haute</MenuItem>
  <MenuItem value="Moyenne">Moyenne</MenuItem>
  <MenuItem value="Basse">Basse</MenuItem>
</MDSelect>

      
{add_Rec.priorite.trim().length === 0 && (
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

export default Add_Rec;
