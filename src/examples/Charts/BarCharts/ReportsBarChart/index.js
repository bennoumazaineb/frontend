import React from "react";
import { Chart } from "react-chartjs-2";
import { Card, Divider, Icon } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import configs from "./configs"; // Assurez-vous d'importer correctement le fichier de configuration

function ReportsBarChart({ color, title, description, date, chart }) {
  const { data, options } = configs(chart.labels, chart.datasets);

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox padding="1rem">
        <MDBox
          variant="gradient"
          bgColor={color}
          borderRadius="lg"
          coloredShadow={color}
      
        
          mt={-5}
          height="12.5rem"
        >
          <Chart type="bar" data={data} options={options} />
        </MDBox>
        <MDBox pt={3} pb={1} px={1}>
          <MDTypography variant="h6" textTransform="capitalize">
            {title}
          </MDTypography>
          <MDTypography component="div" variant="button" color="text" fontWeight="light">
            {description}
          </MDTypography>
          <Divider />
          <MDBox display="flex" alignItems="center">
          
           
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default ReportsBarChart;
