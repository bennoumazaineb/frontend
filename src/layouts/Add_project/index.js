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
import { resetState, addProject,getProjectById,updateProject  } from "feature/project/projectSlice";
import MDSelect from "components/MDSelect";
import { MenuItem } from "@mui/material";
import { getClients } from "feature/auth/authSlice";
import { createProjectTask } from "feature/project/projectSlice";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Divider } from "@mui/material";
import Card from "@mui/material/Card";
const Add_project = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]); 
  const clientState = useSelector((state) => state.auth?.clients);

  const [add_Project, setAdd_Project] = useState({
    nom: "",
    description: "",
    client: "",
    duree: "",
    priorité: "",
    type:"",
    date_debutprojet: dayjs(), // Initialisez avec la date et l'heure actuelles
    date_finprojet:dayjs()

  });


  const [isDemo, setIsDemo] = useState(false);
  const [notification, setNotification] = useState(false);
  const gettaskID = location.pathname.split("/")[2];
  const getProjectID = location.pathname.split("/")[2];
  const newProject = useSelector((state) => state.project?.projects);


  useEffect(() => {
    if (getProjectID !== undefined && getProjectID !== '') {
      dispatch(getProjectById(getProjectID));
      // Ne mettez pas à jour add_Project ici
    } else {
      dispatch(resetState());
    }
  }, [getProjectID]);
  
  useEffect(() => {
    if (getProjectID !== undefined && newProject && newProject.getaProject) {
      const projectData = newProject.getaProject; // Récupérez les données du projet
      setAdd_Project({
        id: getProjectID,
        nom: projectData.nom || "",
        description: projectData.description || "",
        client: projectData.client || "",
        duree: projectData.duree || "",
        priorité: projectData.priorité || "",
        type: projectData.type || "",
        date_debutprojet: projectData.date_debutprojet ? dayjs(projectData.date_debutprojet) : dayjs(),
        date_finprojet: projectData.date_finprojet ? dayjs(projectData.date_finprojet) : dayjs()
      });
    }
  }, [getProjectID, newProject]);
  
  

  
  


  const handleDateChange = (date) => {
    setAdd_Project({ ...add_Project, date_debutprojet: date });

  };
  const handleDateChange1 = (date) => {
 
    setAdd_Project({ ...add_Project, date_finprojet: date });
  };
  
  // Ajoutez un état pour gérer la valeur sélectionnée du MDSelect
  const [priority, setPriority] = useState("");

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
    if (name === "duree") {
      const formattedValue = value.replace(/\D/g, ""); // Supprimer tous les caractères non numériques

      setAdd_Project({ ...add_Project, [name]: formattedValue });
    } else {
      setAdd_Project({ ...add_Project, [name]: value });
    }
    // Si le champ modifié est le champ Priorité, mettez à jour l'état de la priorité
    if (name === "Priorité") {
      setPriority(value);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
  
    // Validation des champs obligatoires
    if (
      add_Project.nom.trim().length === 0 ||
      add_Project.description.trim().length === 0 ||
      add_Project.client.trim().length === 0 ||
      add_Project.duree === 0 ||
      add_Project.priorité.trim().length === 0 ||
      add_Project.type.trim().length === 0
    ) {
      setNotification({ show: true, message: "Veuillez remplir tous les champs obligatoires." });
      return;
    }
  
    try {
      let response;
      const add_ProjectData = {
        nom: add_Project.nom,
        description: add_Project.description,
        client: add_Project.client,
        duree: add_Project.duree,
        priorité: add_Project.priorité,
        type: add_Project.type,
        date_debutprojet: add_Project.date_debutprojet,
        date_finprojet: add_Project.date_finprojet
      };
  
      if (getProjectID === '') {
        // Création d'un nouveau projet en fonction du type
        if (['Site Vitrine', 'Site Dynamique', 'Site E-Commerce'].includes(add_Project.type)) {
          response = await dispatch(createProjectTask(add_Project));
          setNotification({ show: true, message: "Projet et Les tâches automatiques sont ajoutées avec succès ." });
        } else if (add_Project.type === 'Site Spécifique') {
          response = await dispatch(addProject(add_Project));
          setNotification({ show: true, message: "Projet ajouté avec succès." });
        }
  
        if (response.error) {
          throw new Error(response.error.message); // Gestion explicite de l'erreur
        }
  
   
        setTimeout(() => {
          navigate("/Projets");
        }, 1500);
      } else {
        // Mise à jour du projet existant
        response = await dispatch(updateProject(add_Project));
  
        if (response.error) {
          throw new Error(response.error.message); // Gestion explicite de l'erreur
        }
  
        setNotification({ show: true, message: "Projet modifié avec succès." });
        setTimeout(() => {
          navigate("/Projets");
        }, 1500);
      }
    } catch (error) {
      console.error("Erreur lors de la création ou de la modification du projet :", error);
      setNotification({ show: true, message: "Une erreur s'est produite lors de l'opération. Veuillez réessayer." });
    }
  };
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header name={add_Project.nom}>
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
                Nom du projet
              </MDTypography>
              <MDBox mb={2} width="100%">
                <MDInput
                  type="text"
                  fullWidth
                  name="nom"
                  value={add_Project.nom}
                  placeholder="Nom"
                  onChange={changeHandler}
                />
                 {add_Project.nom.trim().length === 0 && (
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
                  value={add_Project.description}
                  placeholder="Description"
                  onChange={changeHandler}
                  disabled={isDemo}
                />
                 {add_Project.description.trim().length === 0 && (
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
        Type du projet
      </MDTypography>
      <MDBox mb={1} width="100%">
        <MDSelect
          fullWidth
          name="type"
          value={add_Project.type}
          onChange={changeHandler}
          disabled={isDemo}
          displayEmpty
          renderValue={(selected) => selected || "Sélectionner le type"}
        >
          <MenuItem value="" disabled>
            Sélectionner le type du projet
          </MenuItem>
          <MenuItem value="Site Vitrine">Site Vitrine</MenuItem>
          <MenuItem value="Site Dynamique">Site Dynamique</MenuItem>
          <MenuItem value="Site E-Commerce">Site E-Commerce</MenuItem>
          <MenuItem value="Site Spécifique">Site Spécifique</MenuItem>
        </MDSelect>
      </MDBox>
      {add_Project.type.trim().length === 0 && (
        <MDTypography variant="caption" color="error">
          Champ obligatoire
        </MDTypography>
      )}
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
     Nom et Prénom du client
    </MDTypography>
    <MDBox mb={1} width="100%">
      <MDSelect 
        fullWidth
        name="client"
        value={add_Project.client}
        onChange={changeHandler}
        disabled={isDemo}
        displayEmpty // Permet d'afficher le placeholder
        renderValue={(selected) => selected || "Selectionner client"} // Texte par défaut lorsque rien n'est sélectionné
      >
        {clientState?.map((item, index) => (
          <MenuItem key={item._id} value={`${item.Nom_Prénom}`}>
  {item.Nom_Prénom}
</MenuItem>

        ))}
      </MDSelect>
      {add_Project.client.trim().length === 0 && (
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
              Durée
              </MDTypography>
              <MDBox mb={1} width="100%">
                <MDInput
                  type="text"
                  fullWidth
                  name="duree"
                  placeholder="Durée (exp:10)"
                  value={add_Project.duree}
                  onChange={changeHandler}
                  
                />
        {typeof add_Project.duree === 'string' && add_Project.duree.trim().length === 0 && (
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
      name="priorité"
      value={add_Project.priorité} // Utilisez la priorité de l'état add_Project
      onChange={changeHandler}
      disabled={isDemo}

      displayEmpty // Permet d'afficher le placeholder
        renderValue={(selected) => selected || "Selectionner la priorité"}
    >
      <MenuItem value="" disabled>
        Sélectionner la priorité
      </MenuItem>
      <MenuItem value="Haute">Haute</MenuItem>
      <MenuItem value="Moyenne">Moyenne</MenuItem>
      <MenuItem value="Basse">Basse</MenuItem>
    </MDSelect>
    {add_Project.priorité.trim().length === 0 && (
      <MDTypography variant="caption" color="error">
        Champ obligatoire
      </MDTypography>
    )}
  </MDBox>
</MDBox>

          </MDBox>

      {/* Ligne de séparation avec une hauteur plus grande */}
      <Divider style={{ height: 9, marginTop: 16, marginBottom: 16, width: '100%' }} />
      <MDTypography
        variant="body2"
        color="text"
        style={{ fontSize: '1.2rem',fontWeight: '400', textAlign: 'center' }}
      >
        Ajouter les dates
      </MDTypography>
<MDBox display="flex" flexDirection="row" justifyContent="center" mt={5} mb={3}>

<MDBox
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        mr={2}
      >

<Card>
<MDBox 
 
    
      py={3}
      px={2}
      variant="gradient"
      bgColor="info"
      borderRadius="lg"
      coloredShadow="info"
      
    >
               <MDTypography variant="h6" color="white">
               Date de début 
                </MDTypography>
      
       <LocalizationProvider dateAdapter={AdapterDayjs} >
   
       <DatePicker
 
  value={add_Project.date_debutprojet}
  onChange={handleDateChange}
/>

</LocalizationProvider>



      </MDBox>
      </Card>

      </MDBox>
      <MDBox
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        mr={2}
      >

<Card>
<MDBox 
   
      py={3}
      px={2}
      variant="gradient"
      bgColor="info"
      borderRadius="lg"
      coloredShadow="info"
      
    >
               <MDTypography variant="h6" color="white">
               Date de fin
                </MDTypography>
      
       <LocalizationProvider dateAdapter={AdapterDayjs} >
   
       <DatePicker
 
  value={add_Project.date_finprojet}
  onChange={handleDateChange1}
/>

</LocalizationProvider>



      </MDBox>
      </Card>
  
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

export default Add_project;

