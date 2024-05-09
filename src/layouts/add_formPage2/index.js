import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation ,useParams} from "react-router-dom";
import { createPage2 } from "feature/page2/page2Slice";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";
import Header from "./Header";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDSelect from "components/MDSelect";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import Dropzone from "react-dropzone";
import MenuItem from '@mui/material/MenuItem';
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteImg2, uploadImg2 } from "feature/upload/uploadSlice";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getClients} from "feature/auth/authSlice"
import imageCompression from 'browser-image-compression';

const Add_formPage2 = () => {
  const [notification, setNotification] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedClient } = useParams();
  const [images, setimages] = useState([]);
  const gettemplateId = location.pathname.split("/")[2];
  const getclientsId = location.pathname.split("/")[3];

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);
  const imgState = useSelector((state) => state.upload?.images2);
  const submitHandler = async (e) => {
    e.preventDefault();

    // Vérification des champs obligatoires
    if (
      !add_page2.a_propos.trim() ||
      !add_page2.valeur.trim() ||
      !add_page2.equipe.trim() ||
      !add_page2.information.trim()
    ) {
      setNotification(true);
      return;
    }

   
      // Création de la page 2 avec les images compressées
      const pageData = {
        ...add_page2,
        
      };

      dispatch(createPage2(pageData));

      setTimeout(() => {
        navigate(`/Ajouter_Formulaire3/${gettemplateId}/${getclientsId}`);
      }, 300);
  
  };

  const [add_page2, setAdd_page2] = useState({
    Id_template: gettemplateId,
    clients: getclientsId,
    a_propos: "",
    valeur: "",
    equipe: "",
    information: "",
    images: [],
  });
  const img = [];
  const changeHandler = (name, value) => {
    setAdd_page2({
      ...add_page2,
      [name]: value,
    });
  };
  useEffect(() => {
  

      imgState.forEach((i) => {
        img.push({
          public_id: i.public_id,
          url: i.url,
        });
      });
      setAdd_page2((prevForm) => ({
        ...prevForm,
         images: img,
       }));

    
  }, [imgState]);

console.log("add_page2",add_page2)
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        {notification && (
          <MDAlert  mt="20px">
            <MDTypography variant="body2" color="white">
              Veuillez remplir tous les champs obligatoires.
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

<MDBox display="flex" flexDirection="row" mt={5} mb={3} width="100%">
<MDBox display="flex" flexDirection="column" alignItems="flex-start" className="textAlign" width="100%">
  <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
    A propos de votre société *
  </MDTypography>
  <ReactQuill 
    style={{ width: '100%', height: '30%' }}
    theme="snow"
    onChange={(html) => changeHandler("a_propos", html)} // Pass field name and value to changeHandler
   
  />
  {add_page2.a_propos && add_page2.a_propos.trim().length === 0 && (
    <MDTypography variant="caption" color="error">
      Champ obligatoire
    </MDTypography>
  )}
</MDBox>

           
          </MDBox>
          <MDBox display="flex" flexDirection="row" mt={5} mb={3} width="100%">
  <MDBox display="flex" flexDirection="column" alignItems="flex-start" className="textAlign" width="100%">
    <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
      Les valeurs de votre société *
    </MDTypography>
    <ReactQuill 
      style={{ width: '100%', height: '30%' }}
      theme="snow"
      value={add_page2.valeur} // Use the field value from state
      onChange={(html) => changeHandler("valeur", html)} // Pass field name and value to changeHandler
    />
  </MDBox>
</MDBox>



          <MDBox display="flex" flexDirection="row" mt={5} mb={3} width="100%">
            <MDBox display="flex" flexDirection="column" alignItems="flex-start" className="textAlign" width="100%">
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
              Votre équipe *
              </MDTypography>
              <ReactQuill 
                style={{ width: '100%',height:'30%' }}
                theme="snow"
                onChange={(html) => changeHandler("equipe", html)}
                value={add_page2.equipe}
              />
            </MDBox>
          </MDBox>
          <MDBox display="flex" flexDirection="row" mt={5} mb={3} width="100%">
            <MDBox display="flex" flexDirection="column" alignItems="flex-start" className="textAlign" width="100%">
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
              Plus d'information et vos remarque *
              </MDTypography>
              <ReactQuill 
                style={{ width: '100%',height:'30%' }}
                theme="snow"
                onChange={(html) => changeHandler("information", html)}
                value={add_page2.information}
              />
            </MDBox>
          </MDBox>
          <MDBox display="flex" flexDirection="column" mt={5} mb={3} width="100%">
       {/* Dropzone pour les images */}
       <MDBox display="flex" flexDirection="row" justifyContent="center">
            <MDBox width="100%">

            <Dropzone
            onDrop={(acceptedFiles) => dispatch(uploadImg2(acceptedFiles))}
            multiple
          >
             {({ getRootProps, getInputProps }) => (
                    <MDBox
                      {...getRootProps()}
                      style={{
                        border: "outset",
                        padding: "20px",
                        borderRadius: "5px",
                        width: "100%",
                        margin: "auto",            // Utiliser flexbox
        flexDirection: "column",     // Aligner les enfants en colonne
        alignItems: "center",        // Centrer les enfants horizontalement
        justifyContent: "center",    // Centrer les enfants verticalement
                      }}
                    >
             <MDInput {...getInputProps()} />
             <MDBox style={{ margin: "auto", width: "fit-content" }}>
                        <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                  Faites glisser et déposez quelques images ici, ou cliquez pour sélectionner des images.
                </MDTypography>
              </MDBox>      </MDBox>
            )}
          </Dropzone>

          {/* Affichage des images sélectionnées */}
          <MDBox display="flex" flexDirection="row" flexWrap="wrap" mt={3}>
            {add_page2.images.map((image, index) => (
              <Grid item key={index}>
                <MDBox className="position-relative" style={{ marginBottom: "8px" }}>
                <DeleteIcon
          color="black"
          onClick={() => dispatch(deleteImg2(image.public_id))}
          style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }}
        />
                  <img src={image.url} alt="" width={150} height={150} />
                </MDBox>
              </Grid>
            ))}
          </MDBox>

          </MDBox>     </MDBox>
          {/* Bouton de soumission du formulaire */}
          <MDBox mt={4} display="flex" justifyContent="end">
            <MDButton variant="gradient" color="info" type="submit">
              Enregistrer
            </MDButton>
          </MDBox>      </MDBox>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
};

export default Add_formPage2;

