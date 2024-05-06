import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { getAllHistoriques,  } from "feature/historique/historiqueSlice";
import MDButton from "components/MDButton";
import DefaultHistoriqueCard from "examples/Cards/historiqueCards/DefaultHistoriqueCard";
import Header from "./components/Header";
import { useNavigate } from 'react-router-dom';

function Overview() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [colorMap, setColorMap] = useState({});

  useEffect(() => {
    dispatch(getAllHistoriques());
  }, [dispatch]);

  const historiqueState = useSelector((state) => state.historique.historiques);

  const navigate = useNavigate();
  


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox p={2}>
          <Grid container spacing={6}>
            {Array.isArray(historiqueState) &&
              historiqueState.map((item, index) => (
                <Grid item xs={12} md={6} xl={3} key={index}>
                  <DefaultHistoriqueCard
                   
                    image={
                      item.image && item.image.length > 0
                        ? item.image[0].url
                        : ""
                    }
                    titre={item.titre}
                    description={item.description}
                    type={item.type}
                    authors={item.authors}
                 
                  />
                </Grid>
              ))}
          </Grid>
          
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
