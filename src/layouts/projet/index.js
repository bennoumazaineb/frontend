/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { getProjects, deleteProject } from "../../feature/project/projectSlice";
import React, { useEffect, useState } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DataTable from "examples/Tables/DataTable";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import projectsTableData from "layouts/tables/data/projectsTableData";
import MDButton from "components/MDButton";
import { useDispatch, useSelector } from "react-redux";

function Projet() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("user");
  const projectState = useSelector((state) => state.project?.projects);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const handleOpen = (id) => {
    setSelectedItemId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (projectId) => {
    dispatch(deleteProject(projectId));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProjects());
    }, 100);
  };

  const userRole = token ? JSON.parse(token).role : null;
  const isAdmin = userRole === "admin";

  const { columns: pColumns, rows: pRows } = projectsTableData();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects
                </MDTypography>
                {isAdmin && (
                  <MDBox display="flex" justifyContent="flex-end">
                    <MDButton variant="contained" href={`Ajouter_projet/`}>
                      Nouveau
                    </MDButton>
                  </MDBox>
                )}
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Projet;

     

