import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  TextField,
  MenuItem,
  ThemeProvider,
  useTheme,
} from '@mui/material';
import MDBox from 'components/MDBox';
import MDSelect from 'components/MDSelect';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import MDAlert from 'components/MDAlert';
import { createReunionAndSendEmail } from 'feature/reu1/reuSlice';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import Header from './Header';
import { getallUser } from 'feature/auth/authSlice';
import MDTypography from 'components/MDTypography';

const Add_Reu1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const [add_Reu1, setAdd_Reu1] = useState({
    dateetHeure_Reunion: '',
    Lien: '',
    User: [],
  });
console.log("add_Reu1",add_Reu1)
  useEffect(() => {
    dispatch(getallUser());
  }, [dispatch]);
  const isUserSelected = add_Reu1.User.length === 0;
  const UserState = useSelector((state) => state.auth?.user);
  const [notification, setNotification] = useState({ show: false, message: '' });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setAdd_Reu1((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
  
    // Check if the required fields are filled out
    if (add_Reu1.dateetHeure_Reunion.trim().length === 0) {
      setNotification({ show: true, message: "Veuillez remplir tous les champs obligatoires." });
      return;
    }
  
    try {
      // Dispatch the action to create a reunion and send emails
      const response = await dispatch(createReunionAndSendEmail(add_Reu1));
  
      // If successful, show a success message
      setNotification({ show: true, message: "Réunion créée avec succès et les emails ont été envoyés." });
  
      // Navigate to the desired page after a short delay
      setTimeout(() => {
        navigate("/reunion");
      }, 1500);
  
      // Additional actions can be dispatched here if needed
      // dispatch(resetState());
    } catch (error) {
      // Handle any errors that occur during the creation and email sending process
      console.error('Erreur lors de la création de la réunion et de l\'envoi de l\'e-mail:', error);
      setNotification({ show: true, message: "Une erreur s'est produite lors de la création de la réunion." });
    }
  };
  


  return (
    <ThemeProvider theme={theme}>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mb={2} />
        <Header>
          {notification.show && (
            <MDAlert mt={3} severity="success">
              <Typography variant="body2">{notification.message}</Typography>
            </MDAlert>
          )}
          <MDBox
          component="form"
          role="form"
          onSubmit={submitHandler}
          display="flex"
          flexDirection="column"
        >
            <MDBox mt={3} display="flex" flexDirection="column">
            <MDTypography variant="body2" color="text" ml={1} fontWeight="regular"> Nom et Prénom </MDTypography
            >
              <MDSelect
                fullWidth
                name="User"
                value={add_Reu1.User}
                onChange={changeHandler}
                multiple
                displayEmpty
                renderValue={(selected) => {
        if (selected.length === 0) {
          return "Sélectionner les personnes concernées pour cette réunion";
        } else {
          return selected.join(', ');
        }
      }}
      inputProps={{ name: 'User', id: 'user-select' }} // Ajouter des propriétés d'entrée
    >
                
            
                {UserState?.map((user) => (
                  <MenuItem key={user._id} value={user.Nom_Prénom}>
                    {user.Nom_Prénom}
                  </MenuItem>
                ))}
              </MDSelect>
            </MDBox>
            {isUserSelected && (
        <MDTypography variant="caption" color="error">
          Champ obligatoire
        </MDTypography>
      )}
         
                      <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
                      <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              mr={2}
            >
            <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">Lien meet (si réunion est en ligne)</MDTypography>
              <MDInput
                fullWidth
                type="text"
                name="Lien"
                value={add_Reu1.Lien}
                onChange={changeHandler}
                placeholder="Lien de la réunion en ligne"
              />
            </MDBox>
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              mr={2}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">Date et heure de la réunion</MDTypography>
              <TextField
                fullWidth
                type="datetime-local"
                name="dateetHeure_Reunion"
                value={add_Reu1.dateetHeure_Reunion}
                onChange={changeHandler}
                InputLabelProps={{ shrink: true }}
              />
                          {add_Reu1.dateetHeure_Reunion.trim().length === 0 && (
      <MDTypography variant="caption" color="error">
        Champ obligatoire
      </MDTypography>
    )}
            </MDBox>
            </MDBox>
            <MDBox mt={3} display="flex" justifyContent="flex-end">
              <MDButton variant="gradient" color="info" type="submit">
                Enregistrer
              </MDButton>
            </MDBox>
          </MDBox>
        </Header>
        <Footer />
      </DashboardLayout>
    </ThemeProvider>
  );
};

export default Add_Reu1;
