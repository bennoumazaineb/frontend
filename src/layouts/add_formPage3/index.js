import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import MDBox from "components/MDBox";

import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { delImg, uploadImg3 } from "feature/upload/uploadSlice";
import Header from "layouts/add_formPage3/Header";
import Dropzone from "react-dropzone";
import DeleteIcon from "@mui/icons-material/Delete";
import * as yup from "yup";
import { createPage3 } from "feature/page3/page3Slice";
import { useFormik } from "formik";
import imageCompression from 'browser-image-compression';
const Add_formPage3 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [serviceList, setServiceList] = useState([
    { titre: "", description_court: "", description: "", images: [] }
  ]);
  const [notification, setNotification] = useState(false);

  const getclientsId = location.pathname.split("/")[3];
  const gettemplateId = location.pathname.split("/")[2];

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const updatedServices = serviceList.map((service, i) => {
      if (i === index) {
        return { ...service, [name]: value };
      }
      return service;
    });
    setServiceList(updatedServices);
  };


  const imgState = useSelector((state) => state.upload?.images3);

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { titre: "" , description_court:"" , description:"" , images:[]} ]);
  };
  const index = serviceList.length
  const list = [...serviceList];
   console.log(index-1)
  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });
  useEffect(() => {
    console.log("img",img)
    list[index-1]["images"] = img;
    setServiceList(list)
      }, [ imgState]);
      
  const handleServiceRemove = (index) => {
    const updatedServices = [...serviceList];
    updatedServices.splice(index, 1);
    setServiceList(updatedServices);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validate all services
    const isValid = serviceList.every(
      (service) =>
        service.description_court.trim().length > 0 &&
        service.titre.trim().length > 0 &&
        service.description.trim().length > 0 
    );

    if (!isValid) {
      setNotification({
        show: true,
        message: "Veuillez remplir tous les champs obligatoires pour chaque service."
      });
      return;
    }

    // Create page 3 with the data
    try {
      await dispatch(createPage3({ Id_template: gettemplateId, clients: getclientsId, services: serviceList }));
      setNotification({ show: true, message: "Formulaire ajouté avec succès." });
      // Reset form or navigate to another page
    } catch (error) {
      setNotification({ show: true, message: "Une erreur s'est produite. Veuillez réessayer." });
    }
  };
  const handleImageRemove = (serviceIndex, imageIndexToRemove) => {
    const updatedServices = [...serviceList];
    updatedServices[serviceIndex].images.splice(imageIndexToRemove, 1);
    setServiceList(updatedServices);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
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
          display="flex"
          flexDirection="column"
          onSubmit={submitHandler}
        >
          {serviceList.map((singleService, index) => (
            <MDBox key={index} className="services">
              {/* Service Title */}
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
              Titre de service
              </MDTypography>
              <MDBox mb={2} width="100%">
              <MDInput
                name="titre"
                type="text"
                placeholder="Titre de service *"
                value={singleService.titre}
                onChange={(e) => handleServiceChange(e, index)}
                required
                fullWidth
              />
           </MDBox>
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                Description courte
              </MDTypography>
              <MDBox mb={2} width="100%">
              <MDInput
                name="description_court"
                type="text"
                placeholder="Description courte *"
                value={singleService.description_court}
                onChange={(e) => handleServiceChange(e, index)}
                required
                fullWidth
              />
                </MDBox>
              {/* Description */}
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                Description
              </MDTypography>
              <MDBox mb={2} width="100%">
              <MDInput
                name="description"
                type="text"
                placeholder="Description *"
                value={singleService.description}
                onChange={(e) => handleServiceChange(e, index)}
                required
                fullWidth
              />
               </MDBox>
              {/* Image Upload */}
              <Dropzone
            onDrop={(acceptedFiles) => dispatch(uploadImg3(acceptedFiles))}
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
                        margin: "auto",
                      }}
                    >
              <MDInput {...getInputProps()} />
                <MDTypography variant="body2" color="text">
                  Faites glisser et déposez quelques images ici, ou cliquez pour sélectionner des images.
                </MDTypography>
              </MDBox>
            )}
          </Dropzone>
          
<MDBox display="flex" justifyContent="space-between">
  {singleService.images.map((image, imgIndex) => (
    <MDBox key={imgIndex}>
    <img src={image.url} alt="" width={200} height={200} />
    <MDBox style={{ display: "flex", justifyContent: "flex-start" }}>
      <MDButton type="button" onClick={() => handleImageRemove(index, imgIndex)}>
        Supprimer
      </MDButton>
      </MDBox>
    </MDBox>
  ))}
</MDBox>
<MDBox style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
  <MDButton type="button" onClick={handleServiceAdd}>
    Ajouter un Service
  </MDButton>
 
   <MDButton type="button" onClick={() => handleServiceRemove(index)}>
    Supprimer le service
  </MDButton>
</MDBox>

            </MDBox>
            
          ))}
      
          {/* Submit Button */}
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

export default Add_formPage3;

