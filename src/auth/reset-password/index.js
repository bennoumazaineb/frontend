import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { resetUserPassword } from "feature/auth/authSlice";
import { Link } from "react-router-dom";

const PasswordReset = () => {
  const dispatch = useDispatch();
  const { token, email } = useParams(); // Utilisation de useParams pour extraire token et email de l'URL

  const [inputs, setInputs] = useState({
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({
    passwordError: false,
    confirmationError: false,
    error: false,
    textError: "",
  });

  const [notification, setNotification] = useState(false);

  const changeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (inputs.password.trim().length < 6) {
      setErrors({ ...errors, passwordError: true });
      return;
    }

    if (inputs.password_confirmation.trim() !== inputs.password.trim()) {
      setErrors({ ...errors, confirmationError: true });
      return;
    }

    const formData = {
      password: inputs.password,
      password_confirmation: inputs.password_confirmation,
      email: email,
      token: token,
    };

    try {
      await dispatch(resetUserPassword(formData));

      setInputs({
        password: "",
        password_confirmation: "",
      });

      setErrors({
        passwordError: false,
        confirmationError: false,
        error: false,
        textError: "",
      });

      setNotification(true);
    } catch (err) {
      console.error("Error resetting password:", err);
      if (err.hasOwnProperty("errors")) {
        setErrors({ ...errors, error: true, textError: err.errors.password[0] });
      }
    }
  };

  useEffect(() => {
    if (!token || !email) {
      console.error('Token or email not found in URL parameters');
      // Gérer le cas où le token ou l'email est manquant
      return;
    }

    // Utiliser le token et l'email pour la réinitialisation du mot de passe
    // Vous pouvez exécuter d'autres logiques ici avec token et email si nécessaire

  }, [token, email]); // Ajouter token et email comme dépendances pour réexécuter lorsque ces valeurs changent

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
       
          <MDTypography display="block" variant="button" color="white" my={1}>
          Entrez votre nouveau mot de passe et sa confirmation pour la mise à jour
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <form onSubmit={submitHandler}>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                name="password"
                value={inputs.password}
                onChange={changeHandler}
                error={errors.passwordError}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password Confirmation"
                variant="standard"
                fullWidth
                name="password_confirmation"
                value={inputs.password_confirmation}
                onChange={changeHandler}
                error={errors.confirmationError}
              />
            </MDBox>
            {errors.error && (
              <MDTypography variant="caption" color="error" fontWeight="light">
                {errors.textError}
              </MDTypography>
            )}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                Changer
              </MDButton>
            </MDBox>
          </form>
        </MDBox>
      </Card>
      {notification && (
        <MDAlert color="info" mt="20px" dismissible>
          <MDTypography variant="body2" color="white">
          Votre changement de mot de passe a réussi. Revenir à{" "}
            <MDTypography component={Link} to="/auth/login" variant="body2" fontWeight="medium" color="white">
              login
            </MDTypography>{" "}
            pour authentifier.
          </MDTypography>
        </MDAlert>
      )}
    </CoverLayout>
  );
};

export default PasswordReset;
