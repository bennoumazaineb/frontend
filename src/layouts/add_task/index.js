import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import { useDispatch,useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Header from "./Header"
import { createTask,UpdateTask,getATask, resetState } from "feature/tache/tacheSlice";
import MDSelect from "components/MDSelect";
import MenuItem from '@mui/material/MenuItem';
import { getProjects } from "feature/project/projectSlice";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Card from "@mui/material/Card";
import dayjs from 'dayjs';
import { Divider } from "@mui/material"; // Importez vos composants personnalisés
const Add_taskProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]); // Ajout de la dépendance dispatch
  const projectState = useSelector((state) => state.project?.projects);

  const [add_task, setAdd_task] = useState({
    Titre: "",
    project: "",
    Description: "",
    Priorité: "",
    Durée: "",
    Phase_projet: "",
    Etat: "",
    Remarque: "",
    Version: "",
    date_debuttask: dayjs(), // Initialisez avec la date et l'heure actuelles
    date_fintask:dayjs()

  });
  console.log(add_task,"sdfghjklmù")

  const [isDemo, setIsDemo] = useState(false);
  const [notification, setNotification] = useState(false);
  const gettaskID = location.pathname.split("/")[2];
  const empState = useSelector((state) => state.auth?.emps);
  const newTask=useSelector((state) => state.task?.tasks);
  useEffect(() => {
    if (gettaskID !== undefined && gettaskID !== '') {
      dispatch(getATask(gettaskID));
    } else {
      dispatch(resetState());
    }
  }, [gettaskID]);
  



  
  useEffect(() => {
    if (gettaskID !== undefined) {
      dispatch(getATask(gettaskID));
      setAdd_task({
        ...add_task,
        Titre: newTask?.Titre || "",
        project: newTask?.project || "",
        Description: newTask?.Description || "",
        Priorité: newTask?.Priorité || "",
        Durée: newTask?.Durée || "",
        Phase_projet: newTask?.Phase_projet || "",
        Etat: newTask?.Etat || "",
        Remarque: newTask?.Remarque || "",
        Version: newTask?.Version || "",
        date_debuttask: newTask.date_debuttask ? dayjs(newTask.date_debuttask) : dayjs(),
        date_fintask: newTask.date_fintask ? dayjs(newTask.date_fintask) : dayjs()
      });
    } else {
      dispatch(resetState());
    }
  }, [gettaskID]);
  useEffect(() => {
    if (gettaskID !== undefined) {
      setAdd_task({
  
        id: gettaskID,
        Titre: newTask?.Titre || "",
        project: newTask?.project || "",
        Description: newTask?.Description || "",
        Priorité: newTask?.Priorité || "",
        Durée: newTask?.Durée || "",
        Phase_projet: newTask?.Phase_projet || "",
        Etat: newTask?.Etat || "",
        Remarque: newTask?.Remarque || "",
        Version: newTask?.Version || "",
        date_debuttask: newTask.date_debuttask ? dayjs(newTask.date_debuttask) : dayjs(),
        date_fintask: newTask.date_fintask ? dayjs(newTask.date_fintask) : dayjs()
      });
    } else {
    
    }
  }, [newTask]);

console.log(gettaskID,"gettaskID")

console.log(newTask,"newTask")
  const [errors, setErrors] = useState({
    TitreError: false,
    project: newTask?.project || "",
    DescriptionError: false,
    DuréeError: false,
    Phase_projetError: false,
    EtatError: false,
    RemarqueError: false,
   

  });
 
  const handleDateChange = (date) => {
    setAdd_task({ ...add_task, date_debuttask: date });

  };
  const handleDateChange1 = (date) => {
 
    setAdd_task({ ...add_task, date_fintask: date });
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
  
    if (name === "Durée") {
      // Vérifier et formater la durée (accepter uniquement les chiffres)
      const formattedValue = value.replace(/\D/g, ""); // Supprimer tous les caractères non numériques
  
      setAdd_task((prevData) => ({
        ...prevData,
        [name]: formattedValue
      }));
    } else if (name === "Etat") {
      const numericValue = parseInt(value.replace(/\D/g, ""), 10); // Récupérer la valeur numérique
    const limitedValue = Math.min(numericValue, 100); // Limiter la valeur à 100

    setAdd_task((prevData) => ({
      ...prevData,
      [name]: limitedValue.toString() // Convertir en chaîne pour mettre à jour l'état
    }));
    } else {
      // Mettre à jour les autres champs
      setAdd_task((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  
    // Si le champ modifié est le champ Priorité, mettre à jour l'état de la priorité
    if (name === "Priorité") {
      setPriority(value);
    }
  };
  


  const submitHandler = async (e) => {
    e.preventDefault();

    // Validation
    if (add_task.Titre.trim().length === 0||
   add_task.project.trim().length === 0||

 add_task.Description.trim().length === 0||
 add_task.Priorité.trim().length === 0||
 add_task.Durée === 0||
   add_task.Phase_projet.trim().length === 0)
    {
      setNotification({ show: true, message: "Veuillez remplir tous les champs obligatoires." });
      return;
    }

    // Création de l'objet à envoyer
    const add_taskData = {
      Titre: add_task.Titre,
      project: add_task.project,
      Description: add_task.Description,
      Priorité: add_task.Priorité,
      Durée: add_task.Durée,
      Phase_projet: add_task.Phase_projet,
      Etat: add_task.Etat,
      Remarque: add_task.Remarque,
      Version: add_task.Version,

    };
    console.log("getProjectID id : "+gettaskID)
    console.log(gettaskID == '')
    // Reset des erreurs
    setErrors({
      TitreError: false,
      project: false,
      DescriptionError: false,
      DuréeError: false,
      Phase_projetError: false,
     



    });
    try {
    // Dispatch de l'action
    if (gettaskID =='' ) {
      const response = await dispatch (createTask(add_task));
      if (response.error) {
        throw new Error(response.error.message); // Gestion explicite de l'erreur
      
  }
      setNotification({ show: true, message: "Tâche créer avec succès." });
      setTimeout(() => {
    
        navigate("/Tache"); // Redirection après soumission réussie
      }, 1500);
   
  } else {
    const response = await dispatch(UpdateTask(add_task));
    if (response.error) {
      throw new Error(response.error.message); // Gestion explicite de l'erreur
    }
    setNotification({ show: true, message: "Tâche modifié avec succès." });
  }

    // Réinitialisation de l'état après un délai
    setTimeout(() => {

      navigate("/Tache"); // Redirection après soumission réussie
    }, 1500);
  } catch (error) {
    console.error("Erreur lors de la création ou de la modification du tâche :", error);
    setNotification({ show: true, message: "Une erreur s'est produite lors de l'opération. Veuillez réessayer." });
  }
};


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header name={add_task.Titre}>
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
                  placeholder="Entrez Titre de projet"
                  type="text"
                  fullWidth
                  name="Titre"
                  value={add_task.Titre}
                  onChange={changeHandler}
                  error={errors.TitreError}
                />
                   {add_task.Titre.trim().length === 0 && (
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
                  placeholder="Description"
                  name="Description"
                  value={add_task.Description}
                  onChange={changeHandler}
                  error={errors.DescriptionError}
                />
                 {add_task.Description.trim().length === 0 && (
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
              <MDBox mb={2} width="100%">
                <MDInput
                  type="text"
                  fullWidth
                  name="Durée"
                  placeholder="Durée (exp:10)"
                  value={add_task.Durée}
                  onChange={changeHandler}
                  error={errors.DuréeError}
                />
                    {typeof add_task.Durée === 'string' && add_task.Durée.trim().length === 0 && (
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
                Phase_projet
              </MDTypography>
              <MDBox mb={1} width="100%">
                <MDInput
                  type="text"
                  fullWidth
                  placeholder="Phase_projet"
                  name="Phase_projet"
                  value={add_task.Phase_projet}
                  onChange={changeHandler}
                  error={errors.Phase_projetError}
                />
                  {add_task.Phase_projet.trim().length === 0 && (
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
                project
              </MDTypography>
              <MDBox mb={2} width="100%">
                <MDSelect
                  fullWidth
                  name="project"
                  
                  value={add_task.project}
                  onChange={changeHandler}
                  displayEmpty // Permet d'afficher le placeholder
        renderValue={(selected) => selected || "Selectionner le Projet"}
                >
                  <MenuItem value="" disabled>
                  Select project
                  </MenuItem>
                  {projectState?.map((item, index) => (
          <MenuItem key={item._id} value={`${item.nom}`}>
  {item.nom}
</MenuItem>))}
                </MDSelect>

                {add_task.project.trim().length === 0 && (
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
                Etat
              </MDTypography>
              <MDBox mb={2} width="100%">
                <MDInput
                  type="text"
                  fullWidth
                  name="Etat"
                  placeholder="Etat (exp:10)"
                  value={add_task.Etat}
                  onChange={changeHandler}
                  error={errors.EtatError}
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
                Remarque
              </MDTypography>
              <MDBox mb={1} width="100%">
                <MDInput
                  type="text"
                  fullWidth
                  name="Remarque"
                  placeholder="Ecrire les Remarques"
                  value={add_task.Remarque}
                  onChange={changeHandler}
                  error={errors.RemarqueError}
                  defaultValue="aucune"
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
                Version
              </MDTypography>
              <MDBox mb={2} width="100%">
                <MDInput
                  placeholder="Version"
                  type="text"
                  fullWidth
                  name="Version"
                  value={add_task.Version}
                  onChange={changeHandler}
                  error={errors.VersionError}
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
    Priorité
  </MDTypography>
  <MDBox mb={2} width="100%">
    <MDSelect 
      fullWidth
      name="Priorité"
      value={add_task.Priorité} // Utilisez la priorité de l'état add_Project
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
    {add_task.Priorité.trim().length === 0 && (
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
 
  value={add_task.date_debuttask}
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
 
  value={add_task.date_fintask}
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

export default Add_taskProfile;

