import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";
import MDTypography from "../../components/MDTypography";
import MDBox from "../../components/MDBox";
import MDButton from "../../components/MDButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from "./Header";
import { useParams } from "react-router-dom";
import { getFormpage3 } from "../../feature/page3/page3Slice";

const ViewFormulaire3 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { Id_template, clients } = useParams();
  const getForm3Id = location.pathname.split("/")[2];
  const formState = useSelector((state) => state.page3.page3);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getFormpage3({ Id_template, clients }));
      } catch (error) {
        setError(error);
        console.error("Erreur lors de la récupération du formulaire :", error);
      }
    };
  
    fetchData();
  }, [Id_template, clients, dispatch]);

  const handleBack = () => {
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
              Formulaire 3
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox pt={3} px={2}>
          {formState?.services?.map((item, index) => (
            <div key={index}>
              <div style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "10px" }}>
                {index + 1}
              </div>
              <div className="d-flex align-items-center gap-3">
                <h6 className="mb-0">Titre de service:</h6>
                <p className="mb-0">{item?.titre}</p>
              </div>
              <br/>
              <div className="d-flex align-items-center gap-3">
                <h6 className="mb-0">Description courte:</h6>
                <p className="mb-0">{item?.description_court}</p>
              </div>
              <br/>
              <div className="d-flex align-items-center gap-3">
                <h6 className="mb-0">Description:</h6>
                <p className="mb-0">{item?.description}</p>
              </div>
              <br/>
              <div className="d-flex gap-3">
                <h6 className="mb-0">Images:</h6>
                <p className="mb-0">
                // Affichage des images si item.images est défini et est un tableau non vide
{item?.images && item.images.length > 0 && (
  <div className="d-flex gap-3">
    <h6 className="mb-0">Images:</h6>
    <div>
      {item.images.map((image, imageIndex) => (
        <React.Fragment key={imageIndex}>
          <a style={{ fontSize: "17px" }} href={image.url}>{image.url}</a>
          <br/>
        </React.Fragment>
      ))}
    </div>
  </div>
)}

// Affichage d'un message si item.images n'est pas défini ou est vide
{(!item?.images || item.images.length === 0) && (
  <p>Aucune image disponible.</p>
)}

                </p>
              </div>
              <br/><br/>
            </div>
          ))}
        </MDBox>
        <MDBox mt={4} display="flex" justifyContent="space-between">
          <MDButton variant="gradient" color="info" onClick={handleBack}>
            <ArrowBackIcon /> Retour
          </MDButton>
        
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
};

export default ViewFormulaire3;
