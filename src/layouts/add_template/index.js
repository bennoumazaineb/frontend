import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Header from "./Header";
import Dropzone from "react-dropzone";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import MDTextarea from "components/MDTextarea";
import { deleteImg1, uploadImg1 } from "feature/upload/uploadSlice";
import { createTemplate, updateTemplate, getaTemplate } from "feature/template/templateSlice";
import { delImg } from "feature/upload/uploadSlice";

const schema = yup.object().shape({
  Id_template: yup.string().required("Id_template est requis"),
  URL: yup.string().required("URL est requis"),
  Description: yup.string().required("Description est requise"),
});

const Add_template = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [notification, setNotification] = useState(false);
  const [images, setimages] = useState([]);
  const imgState = useSelector((state) => state.upload.images1);
  const getaTemplateId = location.pathname.split("/")[2];
console.log(imgState)
  useEffect(() => {
    if (getaTemplateId !== undefined) {
      dispatch(getaTemplate(getaTemplateId));
    } else {

    }
  }, [dispatch, getaTemplateId]);

  const newTemplate = useSelector((state) => state.template?.TemplateByUser?.getaTemplate);
  const img = [];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      Id_template: newTemplate?.Id_template || "",
      URL: newTemplate?.URL || "",
      images: images || [],
      Description: newTemplate?.Description || "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const { Id_template, URL,  Description } = values;

      if (!Id_template || !Id_template.trim() || !URL || !URL.trim() || !Description || !Description.trim()) {
        setNotification(true);
        return;
      }

      const data = getaTemplateId !== undefined ? { id: getaTemplateId, templateData: values } : values;
      try {
        if (getaTemplateId !== undefined) {
          // Modification d'un template existant
          const response = await dispatch(updateTemplate(data));
      
          if (!response.payload) {
            throw new Error("Une erreur s'est produite lors de la modification du template.");
          }
      
          setNotification({ show: true, message: "Template modifié avec succès." });
        } else {
          // Création d'un nouveau template
          const response = await dispatch(createTemplate(data));
      
          if (!response.payload) {
            throw new Error("Une erreur s'est produite lors de la création du template.");
          }
      
          setNotification({ show: true, message: "Template ajouté avec succès." });
        }
      
        // Redirection après succès de l'opération
        setTimeout(() => {
          navigate("/Template");
        }, 1500);
      
      } catch (error) {
        // Gestion des erreurs survenues pendant la création ou la modification du template
        console.error("Erreur lors de la création ou de la modification du template :", error);
        setNotification({
          show: true,
          message: "Une erreur s'est produite lors de l'opération. Veuillez réessayer."
        })
      } }});


  const changeHandler = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };
  useEffect(() => {
      imgState.forEach((i) => {
        img.push({
          public_id: i.public_id,
          url: i.url,
        });
      });
      setimages(img)

    
  }, [imgState]);

 

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
        <form onSubmit={formik.handleSubmit}>
          <MDBox display="flex" flexDirection="column">
            <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
              <MDBox display="flex" flexDirection="column" alignItems="flex-start" width="100%" mr={2}>
                <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                  Id Template
                </MDTypography>
                <MDBox mb={2} width="100%">
                  <MDInput
                    type="text"
                    name="Id_template"
                    fullWidth
                    value={formik.values.Id_template}
                    placeholder="Entrez Id_template"
                    onChange={changeHandler}
                  />
                  {formik.errors.Id_template && <MDTypography variant="caption" color="error">Champ obligatoire</MDTypography>}
                </MDBox>
              </MDBox>
              <MDBox display="flex" flexDirection="column" alignItems="flex-start" width="100%" mr={2}>
                <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                  URL
                </MDTypography>
                <MDBox mb={2} width="100%">
                  <MDInput
                    type="text"
                    name="URL"
                    fullWidth
                    value={formik.values.URL}
                    placeholder="Entrez URL"
                    onChange={changeHandler}
                  />
                  {formik.errors.URL && 
                  <MDTypography variant="caption" color="error">Champ obligatoire</MDTypography>}
                </MDBox>
              </MDBox>
            </MDBox>
            <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
            <MDBox display="flex" flexDirection="column" alignItems="flex-start" width="100%" mr={2}>
                <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                  Description
                </MDTypography>
                <MDBox mb={1} width="100%">
                <MDTextarea
    rows={5}
    name="Description"
    placeholder="Entrez Description"
    value={formik.values.Description}
    onChange={changeHandler}
    style={{
      padding: "10px",
      width: "100%",
      margin: "0",
      lineHeight: "1.5",
      borderRadius: "5px",
      border: "1px solid #ccc",
      boxShadow: "1px 1px 1px #999",
      fontFamily: "Roboto",
      fontSize: "14px", // Taille de police pour le texte du textarea
      height: '60px',
    }}
  />
                         {formik.errors.Description && <MDTypography variant="caption" color="error">Champ obligatoire</MDTypography>}
                </MDBox>
              </MDBox>
            </MDBox>
            <MDBox width="100%">
           
                <MDBox>
                  <Dropzone   onDrop={(acceptedFiles) => dispatch(uploadImg1(acceptedFiles))}>
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
                        <input {...getInputProps()} />
                        <MDBox style={{ margin: "auto", width: "fit-content" }}>
                          <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                            Faites glisser et déposez l'image de votre template (une seule image).
                          </MDTypography>
                        </MDBox>
                      </MDBox>
                    )}
                  </Dropzone>
                </MDBox>
                <MDBox className="showimages d-flex flex-wrap gap-3">
                {images && (
  images.map((image, index) => (
    <Grid container item key={index} xs={12} sm={6} md={4} lg={3} justifyContent="center" alignItems="center">
      <MDBox className="position-relative" style={{ position: "relative", marginBottom: "8px" }}>
        {console.log(image.public_id,"sss")}
        <DeleteIcon color="black" onClick={() => dispatch(deleteImg1(image.public_id))} style={{ position: "absolute", top: 0, right: 0, cursor: "pointer" }} />
        <img src={image.url} alt="" width={200} height={200} />
      </MDBox>
    </Grid>
  ))
)}

                </MDBox>
    
            </MDBox>
            <MDBox mt={4} display="flex" justifyContent="end">
              <MDButton variant="gradient" color="info" type="submit">
                Ajouter template
              </MDButton>
            </MDBox>
          </MDBox>
        </form>
      </Header>
      <Footer />
    </DashboardLayout>
  );
};

export default Add_template;
