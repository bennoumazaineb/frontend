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


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DataTable from "examples/Tables/DataTable";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import clientsTableData from "layouts/tables/data/clientsTableData";
import MDButton from "components/MDButton";
import Ajouter_client from "layouts/add_client";

function Client() {
        
        const { columns: pColumns, rows: pRows } = clientsTableData();
  
      
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
                        Clients 
                      </MDTypography>
                      <MDBox display="flex" justifyContent="flex-end">
  <MDButton variant="contained" href={`Ajouter_client/`}>Nouveau</MDButton>
</MDBox>

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
      };
      
export default Client;
