import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { forgotPasswordToken } from "../../feature/auth/authSlice";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import CoverLayout from "../../layouts/authentication/components/CoverLayout";
import bgImage from "../../assets/images/bg-reset-cover.jpeg";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [notification, setNotification] = useState(false);
  const [input, setInput] = useState({ email: "" });
  const [error, setError] = useState({ err: false, textError: "" });

  const changeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
    if (input.email.trim().length === 0 || !input.email.trim().match(mailFormat)) {
      setError({ err: true, textError: "L'e-mail doit être valide" });
      return;
    }
  
    try {
      await dispatch(forgotPasswordToken(input.email));
      setNotification(true);
    } catch (error) {
      console.error("Erreur lors de l'envoi du token de réinitialisation :", error);
      setError({ err: true, textError: "Erreur lors de l'envoi du token de réinitialisation" });
    }
  };
  

  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox variant="gradient" bgColor="info" borderRadius="lg" mx={2} mt={-3} p={3} mb={1} textAlign="center">
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Reset your password
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email to reset your password
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <form onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                name="email"
                value={input.email}
                onChange={changeHandler}
                error={error.err}
                helperText={error.err && error.textError}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                Envoyer
              </MDButton>
            </MDBox>
          </form>
        </MDBox>
      </Card>
      {notification && (
        <MDAlert color="info" mt="20px" dismissible>
          <MDTypography variant="body2" color="white">
          Vérifiez votre boîte de réception, nous vous avons envoyé les instructions pour réinitialiser votre mot de passe.
          </MDTypography>
        </MDAlert>
      )}
    </CoverLayout>
  );
};

export default ForgotPassword;
