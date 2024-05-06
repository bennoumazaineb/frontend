import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Header from "layouts/add_partner/Header";
import { resetState, createAllUser, updateUser, getUserByUser } from "feature/auth/authSlice";

const Add_PartnerProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [add_partner, setAdd_partner] = useState({
    Nom_Prénom: "",
    Société: "",
    email: "",
    Téléphone: "", // Ajout du champ Téléphone
    password: "",
    Poste: "null",
    role: "partner",
    Partenaire: "null",
  });

  const [isDemo, setIsDemo] = useState(false);
  const [notification, setNotification] = useState(false);
  const getPartnerID = location.pathname.split("/")[2];
  const newPartner = useSelector((state) => state.auth?.orderbyuser?.getaUser);

  useEffect(() => {
    if (getPartnerID !== undefined) {
      dispatch(getUserByUser(getPartnerID));
      setAdd_partner({
        Nom_Prénom: newPartner?.Nom_Prénom || "",
        Société: newPartner?.Société || "",
        email: newPartner?.email || "",
        Téléphone: newPartner?.Téléphone || "", // Initialiser Téléphone
        password: newPartner?.password || "",
        Poste: "null",
        role: "partner",
        Partenaire: "null",
      });
    } else {
      dispatch(resetState());
    }
  }, [getPartnerID]);

  
  useEffect(() => {
    if (getPartnerID !== undefined) {
      setAdd_partner({
        id: getPartnerID,
        Nom_Prénom: newPartner?.Nom_Prénom || "",
        Société: newPartner?.Société || "",
        email: newPartner?.email || "",
        Téléphone: newPartner?.Téléphone || "", // Initialiser Téléphone
        password: newPartner?.password || "",
        Poste: "null",
        role: "partner",
        Partenaire: "null",
      });
    } else {
    
    }
  }, [newPartner]);



  const changeHandler = (e) => {
    const { name, value } = e.target;
    
    // Vérifier si le champ de téléphone contient uniquement des chiffres et a une longueur maximale de 8
    if (name === "Téléphone") {
      const formattedValue = value.replace(/\D/g, ""); // Supprimer tous les caractères non numériques
      const maxLengthValue = formattedValue.slice(0, 8); // Limiter à 8 chiffres max
      setAdd_partner({ ...add_partner, [name]: maxLengthValue });
    } else {
      setAdd_partner({ ...add_partner, [name]: value });
    }
  };
  useEffect(() => {
    if (notification === true) {
      setTimeout(() => {
        setNotification(false);
      }, 5000);
    }
  }, [notification]);
  const submitHandler = async (e) => {
    e.preventDefault();

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (
      add_partner.Nom_Prénom.trim().length === 0 ||
      add_partner.email.trim().length === 0 ||
      (typeof add_partner.Téléphone === 'string' && add_partner.Téléphone.trim().length === 0) ||
      add_partner.Partenaire.trim().length === 0 ||
      add_partner.Poste.trim().length === 0 ||
      !add_partner.email.trim().match(mailFormat) ||
      add_partner.password.trim().length === 0
    ) {
      // Si l'une des conditions de validation échoue, afficher le message approprié
      if (add_partner.password.trim().length < 6) {
        // Si le mot de passe a moins de 6 caractères
        setNotification({ show: true, message: "Le mot de passe doit comporter au moins 6 caractères." });
      } else {
        // Si d'autres champs obligatoires sont manquants ou invalides
        setNotification({ show: true, message: "Veuillez remplir tous les champs obligatoires." });
      }
      return;
    }
    const add_partnerData = {
      data: {
        type: "profile",
        attributes: {
          name: add_partner.Nom_Prénom,
          email: add_partner.email,
          password: add_partner.password,
          Société: add_partner.Société,
          Téléphone: add_partner.Téléphone, // Inclure Téléphone dans les attributs
          Partenaire: add_partner.Partenaire,
        },
      },
    };
  
      try {
        if (getPartnerID == '') {
          const response = await dispatch(createAllUser(add_partner));
          if (response.error) {
            throw new Error(response.error.message); // Gestion explicite de l'erreur
          }
          setNotification({ show: true, message: "Partenaire ajouté avec succès." });
        } else {
          const response = await dispatch(updateUser(add_partner));
          if (response.error) {
            throw new Error(response.error.message); // Gestion explicite de l'erreur
          }
          setNotification({ show: true, message: "Partenaire modifié avec succès." });
        }
    
         
          setTimeout(() => {
            navigate("/Partenaires");
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
      <Header name={add_partner.Nom_Prénom}>
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
                  value={add_partner.Nom_Prénom}
                  placeholder="Entrez nom_prénom du partenaire"
                  onChange={changeHandler}
                />
                {add_partner.Nom_Prénom.trim().length === 0 && (
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
                  value={add_partner.email}
                  placeholder="pseudo@exemple.com"
                  onChange={changeHandler}
                  disabled={isDemo}
                />
                {add_partner.email.trim().length === 0 && (
                  <MDTypography variant="caption" color="error">
                    Champ obligatoire
                  </MDTypography>
                )}
              </MDBox>
              {isDemo && (
                <MDTypography variant="caption" color="text" fontWeight="light">
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
          Téléphone
        </MDTypography>
        <MDBox mb={2} width="100%">
          <MDInput
            type="text"
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              maxLength: 8,
            }}
            fullWidth
            name="Téléphone"
            placeholder="(+216)XX-XXX-XXX"
            value={add_partner.Téléphone}
            onChange={changeHandler}
          />
        {typeof add_partner.Téléphone === 'string' && add_partner.Téléphone.trim().length === 0 && (
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
                Société
              </MDTypography>
              <MDBox mb={1} width="100%">
                <MDInput
                  type="text"
                  fullWidth
                  name="Société"
                  placeholder="Entrez le nom du société (s'il existe)"
                  value={add_partner.Société}
                  onChange={changeHandler}
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
                Mot de passe 
              </MDTypography>
              <MDBox mb={2} width="100%">
                <MDInput
                  type="password"
                  fullWidth
                  name="password"
                  placeholder="Créez un mot de passe(au moins 6 caractères)"
                  value={add_partner.password}
                  onChange={changeHandler}
                />
                {add_partner.password.trim().length === 0 && (
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

export default Add_PartnerProfile;
