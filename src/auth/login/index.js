// Importe les fonctionnalités de React nécessaires
import React, { useContext, useState, useEffect } from "react";
// Importe le composant Link pour la navigation dans l'application
import { Link } from "react-router-dom";
// Importe les composants de Material-UI
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
// Importe des composants personnalisés
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayoutLanding from "layouts/authentication/components/BasicLayoutLanding";
// Importe une image d'arrière-plan
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
// Importe le contexte d'authentification
import { AuthContext } from "context";
import { login } from "feature/auth/authSlice";
import gedPlus from "../../assets/images/gedplus.png";
// Définit le composant Login
function Login() {
  // Utilise le contexte d'authentification
  const authContext = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Déclare les états locaux

  const [credentialsErrors, setCredentialsErrors] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    emailError: false,
    passwordError: false,
  });

  // Effectue une action après le rendu
 

 

  // Gère les changements dans les champs de saisie
  const changeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  // Soumet le formulaire
  const submitHandler = async (e) => {
    e.preventDefault();
 

   
    // Expression régulière pour valider l'email
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // Vérifie les erreurs de saisie
    if (inputs.email.trim().length === 0 || !inputs.email.trim().match(mailFormat)) {
      setErrors({ ...errors, emailError: true });
      return;
    }

    if (inputs.password.trim().length < 6) {
      setErrors({ ...errors, passwordError: true });
      return;
    }

    // Crée un nouvel utilisateur
    console.log(inputs ,"sahar")
    setTimeout (() => {

      dispatch(login(inputs));

    },300)
   
 

 
  };


  const authState = useSelector((state) => state);
console.log(authState)
  const { user, isError, isSuccess, isLoading, message } = authState.auth;

  useEffect(() => {
    // Afficher une alerte d'erreur si la connexion a échoué
    if (isError && !isLoading) {
      alert("Erreur de connexion. Veuillez réessayer.");
    }
  }, [isError, isLoading]); // Dépendances : erreur de connexion et état de chargement
 
  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard");
    } else {
      navigate("/auth/login");
    }
  }, [isSuccess, navigate]); // Dépendances : état de réussite et fonction de navigation
 

  // Efface le formulaire
  const clearForm = () => {
    setInputs({
      email: "",
      password: "",
    });

    setErrors({
      emailError: false,
      passwordError: false,
    });
  };

  // Rendu du composant Login
  return (
    <BasicLayoutLanding image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          Se connecter
          </MDTypography>
   
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
         
          </Grid>
        </MDBox>
        <MDBox pt={7} pb={8} px={3}>
          <MDBox component="form" role="form" method="POST" onSubmit={submitHandler}>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                value={inputs.email}
                name="email"
                onChange={changeHandler}
                error={errors.emailError}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                name="password"
                value={inputs.password}
                onChange={changeHandler}
                error={errors.passwordError}
              />
            </MDBox>
         
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
              connecter
              </MDButton>
            </MDBox>
            {/* Affiche les erreurs de connexion */}
            {credentialsErrors && (
              <MDTypography variant="caption" color="error" fontWeight="light">
                {credentialsErrors}
              </MDTypography>
            )}
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
              Mot de passe oublié? Réinitialisez-le{" "}
                <MDTypography
                  component={Link}
                  to="/auth/forgot-password"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  ici
                </MDTypography>
              </MDTypography>
            </MDBox>
         
            </MDBox>
          </MDBox>
   
      </Card>
    </BasicLayoutLanding>
  );
}

// Exporte le composant Login par défaut
export default Login;
