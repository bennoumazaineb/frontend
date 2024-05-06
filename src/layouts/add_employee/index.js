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
import { createAllUser, resetState } from "feature/auth/authSlice";
import { getUserByUser } from "feature/auth/authSlice";
import { updateUser } from "feature/auth/authSlice";
import { getTasks } from "feature/tache/tacheSlice";
import Header from "./Header";
import MDSelect from "components/MDSelect";
import { MenuItem } from "@mui/material";
const Add_EmployeeProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const taskState = useSelector((state) => state.task?.tasks);
  console.log(taskState)
  const [add_employee, setadd_employee] = useState({
    Nom_Prénom:  "",
    Société: "null",
    email:"",
    Téléphone:  "",
    password:  "",
    Poste: "",
    role: "employee",
    Partenaire: "null",

  });
  const [errors, setErrors] = useState({
    Nom_PrénomError: false,
    emailError: false,
    TéléphoneError: false,
    passwordError: false,
    PosteError: false,
  });
  const [isDemo, setIsDemo] = useState(false);
  const [notification, setNotification] = useState(false);
  const getEmpId = location.pathname.split("/")[2];
  const newEmp = useSelector((state) => state.auth?.orderbyuser?.getaUser  );
  console.log(newEmp)
  console.log(getEmpId , "getEmpId")
  
  useEffect(() => {
    if (getEmpId !== undefined) {
      dispatch(getUserByUser(getEmpId));
      setadd_employee({
        Nom_Prénom: newEmp?.Nom_Prénom || "",
        Société: "null",
        email: newEmp?.email || "",
        Téléphone: newEmp?.Téléphone || "",
        password: newEmp?.password || "",
        Poste: newEmp?.Poste || "",
        role: "employee",
        Partenaire: "null",
      });
    } else {
      dispatch(resetState());
    }
  }, [getEmpId]);
  useEffect(() => {
    if (getEmpId !== undefined) {
      setadd_employee({
  
        id: getEmpId,
        Nom_Prénom: newEmp?.Nom_Prénom || "",
        Société: "null",
        email: newEmp?.email || "",
        Téléphone: newEmp?.Téléphone || "",
        password: newEmp?.password || "",
        Poste: newEmp?.Poste || "",
        role: "employee",
        Partenaire: "null",
      });
    } else {
    
    }
  }, [newEmp]);



  

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
      setadd_employee({ ...add_employee, [name]: maxLengthValue });
    } else {
      setadd_employee({ ...add_employee, [name]: value });
    }
  };

 
  
  
  
  const submitHandler = async (e) => {
    e.preventDefault();

    // Validation
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (
      add_employee.Nom_Prénom.trim().length === 0 ||
      add_employee.email.trim().length === 0 ||
      add_employee.Société.trim().length === 0 ||
      add_employee.Partenaire.trim().length === 0 ||
      (typeof add_employee.Téléphone === 'string' && add_employee.Téléphone.trim().length === 0) || // Vérifier si Téléphone est une chaîne avant d'appeler trim()
      add_employee.password.trim().length === 0 ||
      add_employee.Poste.trim().length === 0 ||
      !add_employee.email.trim().match(mailFormat)
    ) {
      // Si l'une des conditions de validation échoue, afficher le message approprié
      if (add_employee.password.trim().length < 6) {
        // Si le mot de passe a moins de 6 caractères
        setNotification({ show: true, message: "Le mot de passe doit comporter au moins 6 caractères." });
      } else {
        // Si d'autres champs obligatoires sont manquants ou invalides
        setNotification({ show: true, message: "Veuillez remplir tous les champs obligatoires." });
      }
      return;
    }
    console.log(add_employee,"add_employee")
    // Création de l'objet à envoyer
    const add_employeeData = {
      data: {
        type: "profile",
        attributes: {
          name: add_employee.Nom_Prénom,
          email: add_employee.email,
          password: add_employee.password,
          Société: add_employee.Société,
          Téléphone: add_employee.Téléphone,
          Partenaire: add_employee.Partenaire,
          Poste: add_employee.Poste,
          
        },
      },
    };
    console.log("emp id : "+getEmpId)
    console.log(getEmpId == '')
    try {
    if (getEmpId == '') {
      const response = await dispatch(createAllUser(add_employee));
      if (response.error) {
        throw new Error(response.error.message); // Gestion explicite de l'erreur
      }
      setNotification({ show: true, message: "Employé ajouté avec succès." });
    } else {
      const response = await dispatch(updateUser(add_employee));
      if (response.error) {
        throw new Error(response.error.message); // Gestion explicite de l'erreur
      }
      setNotification({ show: true, message: "Employé modifié avec succès." });
    }

     
      setTimeout(() => {
        navigate("/Employees");
      }, 1500);
   
    } catch (error) {
      console.error("Erreur lors de la création ou de la modification du Employé :", error);
      setNotification({ show: true, message: "Une erreur s'est produite lors de l'opération. Veuillez réessayer." });
    }
  };
    

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header name={add_employee.Nom_Prénom}>
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
                  type="text"
                  fullWidth
                  name="Nom_Prénom"
                  value={add_employee.Nom_Prénom}
                  placeholder="Entrez nom_prénom de l'employee"
                  onChange={changeHandler}
                />
                 {add_employee.Nom_Prénom.trim().length === 0 && (
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
                  value={add_employee.email}
                  placeholder="pseudo@exemple.com"
                  onChange={changeHandler}
                  disabled={isDemo}
                />
 {add_employee.email.trim().length === 0 && (
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
                Téléphone
              </MDTypography>
              <MDBox mb={2} width="100%">
                <MDInput
                  type="text"
                  fullWidth
                  name="Téléphone"
                  placeholder="(+216)XX-XXX-XXX"
                  value={add_employee.Téléphone}
                  onChange={changeHandler}
                />
     {typeof add_employee.Téléphone === 'string' && add_employee.Téléphone.trim().length === 0 && (
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
                Mot de passe
              </MDTypography>
              <MDBox mb={2} width="100%">
                <MDInput
                  type="password"
                  fullWidth
                  name="password"
                  placeholder="Créez un mot de passe(au moins 6 caractères)"
                  value={add_employee.password}
                  onChange={changeHandler}
                />
                 {add_employee.password.trim().length === 0 && (
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
                Poste
              </MDTypography>
              <MDBox mb={1} width="100%">
                <MDInput
                  type="text"
                  fullWidth
                  name="Poste"
                  value={add_employee.Poste}
                  placeholder="ajouter poste de l'employee"
                  onChange={changeHandler}
                  disabled={isDemo}
                />
                 {add_employee.Poste.trim().length === 0 && (
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

export default Add_EmployeeProfile;
