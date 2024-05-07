import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Header from "./Header";
import { MenuItem } from "@mui/material";
import { delImg, uploadImg } from "feature/upload/uploadSlice";
import Dropzone from "react-dropzone";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import { AddHistorique, resetState } from "feature/historique/historiqueSlice";
import { useNavigate } from "react-router-dom";
import MDSelect from "components/MDSelect";
const add_Historique = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [notification, setNotification] = useState(false);
  const gethistoId = location.pathname.split("/")[2];
  const [serviceList, setServiceList] = useState([]);

  const [images, setImages] = useState([]);
  const client = useSelector((state) => state);
  const imgState = useSelector((state) => state.upload?.images); // Use optional chaining to safely access images



  const img = [];
  imgState?.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });
  
  useEffect(() => {
    setImages(img);
  }, [img]);


 
  useEffect(() => {
    setAdd_historiuqe({
      ...add_historique,
      image: images,
    });
  }, [images]);


  const [add_historique, setAdd_historiuqe] = useState({
    Id_histo: gethistoId,
    titre: "",
    description: "",
    type: "",

  });
  const [isDemo, setIsDemo] = useState(false);
  const [errors, setErrors] = useState({
    titreError: false,
    descriptionError: false,
    typeError: false,
 
  });

  useEffect(() => {
    if (notification === true) {
      setTimeout(() => {
        setNotification(false);
      }, 5000);
    }
  }, [notification]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdd_historiuqe({
      ...add_historique,
      [name]: value,
    });
  };



  const submitHandler = async (e) => {
    e.preventDefault();

    // Validation des champs
    if (
      add_historique.titre.trim().length === 0 ||
      add_historique.description.trim().length === 0 ||
      add_historique.type.trim().length === 0
    ) {
      setNotification({ show: true, message: "Veuillez remplir tous les champs obligatoires." });
      return;
    }

    const add_historiqueData = {
      titre: add_historique.titre,
      type: add_historique.type,
      description: add_historique.description,
    };

    setErrors({
        titreError: false,
        descriptionError: false,
        typeError: false,
    });
    try {
      const response = await dispatch (AddHistorique(add_historique));
      if (response.error) {
        throw new Error(response.error.message); // Gestion explicite de l'erreur
      }
      setNotification({ show: true, message: "Historique ajouté avec succès." });
      setTimeout(() => {
        navigate("/Historique");
      }, 1500);
    } catch (error) {
      console.error("Erreur lors de la création  du Historique ", error);
      setNotification({ show: true, message: "Une erreur s'est produite lors de l'opération. Veuillez réessayer." });
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
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
          onChange={handleInputChange}
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
                  type="text"
                  fullWidth
                  name="titre"
                  value={add_historique.titre}
                  placeholder="Titre"
                  onChange={handleInputChange}
                />
                {add_historique.titre.trim().length === 0 && (
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
          value={add_historique.type}
          onChange={handleInputChange}
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
      {add_historique.type.trim().length === 0 && (
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
              mr={2}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
              Description
              </MDTypography>
              <MDBox mb={2} width="100%">
                <MDInput
                  type="text"
                  fullWidth
                  name="description"
                  value={add_historique.description}
                  placeholder="Description"
                  onChange={handleInputChange}
                />
                     {add_historique.description.trim().length === 0 && (
      <MDTypography variant="caption" color="error">
        Champ obligatoire
      </MDTypography>
    )}
              </MDBox>
            </MDBox>
          <MDBox mb={3}>
            
              <MDTypography
                variant="body2"
                color="text"
                ml={1}
                fontWeight="regular"
              >
                Images
              </MDTypography>
              <Dropzone
                onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
              >
                {({ getRootProps, getInputProps }) => (
                  <MDBox>
                    <MDBox
                      {...getRootProps()}
                      style={{
                        border: "outset", // exemple de style de bordure en pointillé noir
                        padding: "20px",
                        borderRadius: "5px",
                        width: "100%",
                        margin: "auto"
                      }}
                    >
                      <MDInput {...getInputProps()} />
                      <MDBox style={{ margin: "auto", width: "fit-content" }}>
                        <MDTypography
                          variant="body2"
                          color="text"
                          ml={1}
                          fontWeight="regular"
                        >
                          Faites glisser et déposez l'image de votre template.
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                  </MDBox>
                )}
              </Dropzone>
        
            <MDBox className="showimages d-flex flex-wrap gap-3">
              {images.map((i, j) => (
                <Grid
                  container
                  item
                  key={j}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  justifyContent="center"
                  alignItems="center"
                >
                  <MDBox
                    className="position-relative"
                    style={{ position: "relative", marginBottom: "8px" }}
                  >
                    <img src={i.url} alt="" width={200} height={200} />
                    <DeleteIcon
                      color="black"
                      onClick={() => dispatch(delImg(i.public_id))}
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        cursor: "pointer",
                      }}
                    />
                  </MDBox>
                </Grid>
              ))}
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

export default add_Historique;
