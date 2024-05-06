import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import { getFormpage2 } from "feature/page2/page2Slice";
import { useLocation } from "react-router-dom";
import MDButton from "components/MDButton";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from "./Header";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

const ViewFormulaire2 = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const getForm2Id = location.pathname.split("/")[2];
  const { Id_template, clients } = useParams();
  const navigate = useNavigate();
  console.log("Location pathname:", location.pathname);
  const [error, setError] = useState(null);
  console.log("Form ID:", getForm2Id);
  // Utilisez useSelector pour récupérer les données du formulaire à partir du Redux store
  const formState = useSelector((state) => state.page2.page2);

  console.log("Form State:", formState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getFormpage2({ Id_template, clients }));
      } catch (error) {
        setError(error);
        console.error("Erreur lors de la récupération du formulaire :", error);
      }
    };
  
    fetchData();
  }, [Id_template, clients, dispatch]);
  const handleBack = () => {
    navigate(`/Affichage_Formulaire1/${Id_template}/${clients}`);
  };
  const handleNext = () => {
    // Naviguer vers la vue suivante (par exemple, ViewFormulaire2)
    navigate(`/Affichage_Formulaire3/${Id_template}/${clients}`);
  };
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox pt={6} pb={3}>
          <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info" textAlign="center">
            <MDTypography variant="h6" color="white">
              Formulaire 2
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox pt={3} px={2}>
          {formState && (
            <>
              <MDBox mb={3}>
                <MDTypography variant="h6"> A propos de société : {formState.a_propos || ""}</MDTypography>
              </MDBox>
              <MDBox mb={3}>
                <MDTypography variant="h6">Les valeurs de société: {formState.valeur || ""}</MDTypography>
              </MDBox>
              <MDBox mb={3}>
                <MDTypography variant="h6">Équipe du société: {formState.equipe || ""}</MDTypography>
              </MDBox>
              <MDBox mb={3}>
                <MDTypography variant="h6">Information et remarques: {formState.information || ""}</MDTypography>
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

export default ViewFormulaire2;
