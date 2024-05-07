import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { createPage1 } from "feature/page1/page1Slice";
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
import { delImg, uploadImg } from "feature/upload/uploadSlice";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getallTemplate,getaTemplate } from "feature/template/templateSlice";
import { getClients } from "feature/auth/authSlice";

  const Add_formPage1 = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const imgState = useSelector((state) => state.upload.images);
console.log(imgState)
    const [isDemo, setIsDemo] = useState(false);
    const location = useLocation();
    const gettemplateId = location.pathname.split("/")[2];
    console.log(gettemplateId)
    useEffect(() => {
      dispatch(getallTemplate());
    }, [dispatch]);
  

  
    const getclientsId = location.pathname.split("/")[3]; // Accédez au troisième élément dans le chemin


    console.log("getclientsId",getclientsId);

    useEffect(() => {
      dispatch(getClients());
      console.log("getClients",getClients);
    }, [dispatch]);
    
    const [notification, setNotification] = useState(false);
    // Déclaration de l'état initial du formulaire
    const submitHandler = async (e) => {
      
      e.preventDefault();

      const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (
        add_formPage1.clients.trim().length === 0 ||
        add_formPage1.nom_domaine.trim().length === 0 ||
        add_formPage1.nom_societe.trim().length === 0 ||
        add_formPage1.adresse.trim().length === 0 ||
        add_formPage1.email.trim().length === 0 ||
        add_formPage1.telephone=== 0 ||
      !add_formPage1.email.trim().match(mailFormat)

         ) {
          setNotification(true);
          return;
         
        }
        dispatch(createPage1(add_formPage1));
        setTimeout(() => {
       navigate(`/Ajouter_Formulaire2/${gettemplateId}/${add_formPage1.clients}`);
        }, 300);
    };
    const clientState = useSelector((state) => state.auth?.clients);
    console.log("clientState",clientState)
  
    const [add_formPage1, setadd_formPage1] = useState({

      Id_template: gettemplateId,
      clients:"",
      nom_domaine: "",
      nom_societe: "",
      adresse: "",
      email: "",
      telephone: "", // Utilisez "telephone" au lieu de "Téléphone"
      images: [],
    });
  console.log(add_formPage1)
    // Récupération des données du template


    // Initialisation de l'état du formulaire une fois que les données du template sont disponibles
   
    useEffect(() => {
    
        const img = [];
        imgState?.forEach((i) => {
          img.push({
            public_id: i.public_id,
            url: i.url,
          });
        });
         setadd_formPage1((prevForm) => ({
         ...prevForm,
          images: img,
        }));
      
    }, [imgState]);
    
    const changeHandler = (e) => {
      const { name, value } = e.target;
    
      // Vérifier si le champ de téléphone contient uniquement des chiffres et a une longueur maximale de 8
      if (name === "telephone") {
        const formattedValue = value.replace(/\D/g, ""); // Supprimer tous les caractères non numériques
        const maxLengthValue = formattedValue.slice(0, 8); // Limiter à 8 chiffres max
        setadd_formPage1({ ...add_formPage1, [name]: maxLengthValue });
      } else {
        setadd_formPage1({ ...add_formPage1, [name]: value });
      }
    };
    const handleClientSelect = (clientName) => {
      setadd_formPage1(prevState => ({
        ...prevState,
        clients: clientName
      }));
    };



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
          <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              mr={2}
            >
               <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
              Id Template
              </MDTypography>
              <MDBox mb={2} width="100%">
                <MDInput
                  type="Id_template"
                  fullWidth
                  name="Id_template"
                  value={add_formPage1.Id_template}
                  onChange={changeHandler}
                  disabled // Désactiver le champ Id_template
                />
                {add_formPage1.Id_template.trim().length === 0 && (
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
             Nom et Prénom du client
            </MDTypography>
            <MDSelect 
  fullWidth
  name="clients"
  value={add_formPage1.clients}
  onChange={(e) => handleClientSelect(e.target.value)}
  displayEmpty // Permet d'afficher le placeholder
        renderValue={(selected) => selected || "Selectionner client"} 
>
  <MenuItem value="" disabled>
    Sélectionner un client
  </MenuItem>
  {clientState?.map((item, index) => (
    <MenuItem key={index} value={item.Nom_Prénom}>{item.Nom_Prénom}</MenuItem>
  ))}
</MDSelect>
       {add_formPage1.clients.trim().length === 0 && (
      <MDTypography variant="caption" color="error">
        Champ obligatoire
      </MDTypography>
    )}
        
            </MDBox>
            
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
              mr={2}
            >
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
             Domaine de société
              </MDTypography>
              <MDBox mb={1} width="100%">
                <MDInput
                  type="nom_domaine"
                  fullWidth
                  name="nom_domaine"
                  placeholder="Entrez le domaine de société "
                  value={add_formPage1.nom_domaine}
                  onChange={changeHandler}
                />
                {add_formPage1.nom_domaine.trim().length === 0 && (
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
Nom de société
</MDTypography>
<MDBox mb={1} width="100%">
<MDInput
               type="nom_societe"
               fullWidth
               name="nom_societe"
               value={add_formPage1.nom_societe}
               onChange={changeHandler}
               placeholder="Entrez le nom de société"
             />
{add_formPage1.nom_societe.trim().length === 0 && (
<MDTypography variant="caption" color="error">
Champ obligatoire
</MDTypography>
)}
</MDBox>
</MDBox>
</MDBox>      <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
      <MDBox
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          width="100%"
          mr={2}
        >
          <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
          Adresse de société
          </MDTypography>
          <MDBox mb={1} width="100%">
            <MDInput
              type="adresse"
              fullWidth
              name="adresse"
              value={add_formPage1.adresse}
              onChange={changeHandler}
              placeholder="Entrez l'adresse de société"
            />
            {add_formPage1.adresse.trim().length === 0 && (
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
    Téléphone de société
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
      name="telephone" // Utilisez "telephone" au lieu de "Téléphone"
      placeholder="(+216)XX-XXX-XXX"
      value={add_formPage1.telephone}
      onChange={changeHandler}
    />
    {typeof add_formPage1.telephone === "string" &&
      add_formPage1.telephone.trim().length === 0 && (
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
            Email de société
          </MDTypography>
          <MDBox mb={1} width="100%">
            <MDInput
              type="email"
              fullWidth
              name="email"
              value={add_formPage1.email}
              onChange={changeHandler}
              placeholder="pseudo@exemple.com"
              disabled={isDemo}
            />
             {add_formPage1.email.trim().length === 0 && (
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
      <MDBox display="flex" flexDirection="column" mt={5} mb={3} width="100%">
      <MDBox display="flex" flexDirection="row" justifyContent="center">
      <MDBox width="100%">
        
                <Dropzone               onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}>
                  {({ getRootProps, getInputProps }) => (
                    <MDBox
                      {...getRootProps()}
                      style={{
                        border: "outset",
                        padding: "20px",
                        borderRadius: "5px",
                        width: "100%",
                        margin: "auto",
                      }}
                    >
                      <MDInput {...getInputProps()} />
                      <MDBox style={{ margin: "auto", width: "fit-content" }}>
                        <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                        Faites glisser et déposez quelques images ici, ou cliquez pour sélectionner des images.
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                  )}
                </Dropzone>
              </MDBox>
            </MDBox>
            <MDBox className="showimages d-flex flex-wrap gap-3">
  {add_formPage1.images && add_formPage1.images.map((image, index) => (
    <Grid container item key={index} xs={12} sm={6} md={4} lg={3} justifyContent="center" alignItems="center">
      <MDBox className="position-relative" style={{ position: 'relative', marginBottom: '8px' }}>
      {console.log(image.public_id,"sss")}
        <DeleteIcon
          color="black"
          onClick={() => dispatch(delImg(image.public_id))}
          style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }}
        />
        <img src={image.url} alt="" width={200} height={200} />
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

export default Add_formPage1;

