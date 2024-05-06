import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { getallTemplate, deleteTemplate,updateTemplate,getaTemplate } from "feature/template/templateSlice";
import MDButton from "components/MDButton";
import DefaultPartnerCard from "examples/Cards/PartnerCards/DefaultPartnerCard";
import Header from "layouts/template/components/Header";
import { useNavigate } from 'react-router-dom';
function Overview() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [colorMap, setColorMap] = useState({});
  const token = localStorage.getItem("user");
  const currentUser = JSON.parse(token);
  const userRole = currentUser ? currentUser.role : null;
  useEffect(() => {
    dispatch(getallTemplate());
  }, [dispatch]);

  const templateState = useSelector((state) => state.template);
 
 
  const handleOpen = (id) => {
    setSelectedItemId(id);
    setOpen(true);
  };
  const navigate = useNavigate(); // Utilisation de useNavigate
  
 
  
  const handleDelete = (id) => {
  
    dispatch(deleteTemplate(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getallTemplate());
    }, 100);
  };
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox p={2}>
          <Grid container spacing={6}>
            {Array.isArray(templateState.template) &&
              templateState.template.map((item, index) => (
                <Grid item xs={12} md={6} xl={3} key={index}>
                  <DefaultPartnerCard
                    Id_template={item.Id_template}
                    images={
                      item.images && item.images.length > 0
                        ? item.images[0].url
                        : ""
                    }
                    Description={item.Description}
                    id={item._id}
                    action={{
                      route: item.URL,
                      color: "info",
                      label: "Demo",
                    }}
                    action2={{
                      onClick: () => handleOpen(item._id),
                      color: "info",
                      label: "Choisir",
                      route: `/Ajouter_Formulaire1/${item.Id_template}`,
                    }}
                    action3={
                      
                         {
                            route: `/Modifier_template/${item._id}` || "",
                            color: "info",
                            label: "Edit",
                          }
                    
                    }
                    action4={{
                      onClick: () => handleOpen(item._id),
                      color: "info",
                      label: "Delete",
                    }}
                    handleDelete={handleDelete} // Pass handleDelete as a prop
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
