import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from "./Header";
import { getFormpage1 } from "../../feature/page1/page1Slice";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ViewFormulaire1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Id_template, clients } = useParams();

  const [error, setError] = useState(null);
  const formState = useSelector((state) => state.page1.page1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getFormpage1({ Id_template, clients }));
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [Id_template, clients, dispatch]);

  const handleBack = () => {
    navigate("/Formulaires");
  };

  const handleNext = () => {
    // Naviguer vers la vue suivante (par exemple, ViewFormulaire2)
    navigate(`/Affichage_Formulaire2/${Id_template}/${clients}`);
  };
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox pt={6} pb={3}>
          <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info" textAlign="center">
            <MDTypography variant="h6" color="white">
              Formulaire 1
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox pt={3} px={2}>
          {formState && (
            <>
              <MDBox mb={3}>
                <MDTypography variant="h6"> Domaine de société: {formState.nom_domaine}</MDTypography>
              </MDBox>
              <MDBox mb={3}>
                <MDTypography variant="h6">Nom de société: {formState.nom_societe}</MDTypography>
              </MDBox>
              <MDBox mb={3}>
                <MDTypography variant="h6">Email: {formState.email}</MDTypography>
              </MDBox>
              <MDBox mb={3}>
                <MDTypography variant="h6">Adresse de société: {formState.adresse}</MDTypography>
              </MDBox>
              <MDBox mb={3}>
                <MDTypography variant="h6"> Téléphone: {formState.telephone}</MDTypography>
              </MDBox>
              <MDBox mb={3}>
                <MDTypography variant="h6">Images:</MDTypography>
                {formState.images && formState.images.map((image, index) => (
                  <React.Fragment key={index}>
                    <a style={{ fontSize: "16px" }} href={image.url}>{image.url}</a>
                    {index !== formState.images.length - 1 && ", "}
                  </React.Fragment>
                ))}
              </MDBox>
            </>
          )}
        </MDBox>
        <MDBox mt={4} display="flex" justifyContent="space-between">
          <MDButton variant="gradient" color="info" onClick={handleBack}>
            <ArrowBackIcon /> Retour
          </MDButton>
          <MDButton variant="gradient" color="info" onClick={handleNext}>
            Suivant <ArrowForwardIcon />
          </MDButton>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
};

export default ViewFormulaire1;
