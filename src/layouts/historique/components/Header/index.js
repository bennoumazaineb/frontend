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

import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import burceMars from "assets/images/gedplus.png";
import backgroundImage from "assets/images/documents-validation-700x393.png";
import MDButton from "components/MDButton";

function Header({ children }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    window.addEventListener("resize", handleTabsOrientation);
    handleTabsOrientation();

    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const token = localStorage.getItem("user");
  const currentUser = JSON.parse(token);
  const isAdmin = currentUser?.role === "admin";

  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="8.75rem"
        borderRadius="xl"
      />

      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        {isAdmin && ( // Affiche le bouton "Ajouter" uniquement si l'utilisateur est admin
          <MDButton
            variant="contained"
            sx={{ position: "absolute", top: 20, right: 20 }}
            href={`Ajouter_Historique`}
          >
            Ajouter
          </MDButton>
        )}

        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item>
            <MDBox
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
              minHeight="8.75rem"
              borderRadius="xl"
              sx={{ overflow: "hidden" }}
            >
              <h1 className="title" style={{ textAlign: "center" }}>
                <span className="title-word title-word-2">GED_</span>
                <span className="title-word title-word-3">PLUS:</span>
                <span className="title-word title-word-4">HISTORIQUE</span>
              </h1>
            </MDBox>
          </Grid>
        </Grid>
        <style>
        {`
          .title-word {
            animation: color-animation 4s linear infinite;
          }
          .title-word-2 {
  --color-1: #52aef;
  --color-2: #4e6bff; 
  --color-3: #cfe5ff; 
}
.title-word-3 {
  --color-1: #70b3ff; 
  --color-2: #52aef; 
  --color-3: #0da6ff; 
}
.title-word-4 {
  --color-1: #0da6ff; 
  --color-2:#70b3ff; 
  --color-3: #52aef; 
}

          @keyframes color-animation {
            0%    {color: var(--color-1)}
            32%   {color: var(--color-1)}
            33%   {color: var(--color-2)}
            65%   {color: var(--color-2)}
            66%   {color: var(--color-3)}
            99%   {color: var(--color-3)}
            100%  {color: var(--color-1)}
          }
        `}
      </style>
        {children}
      </Card>
    </MDBox>
  );
}

Header.propTypes = {
  children: PropTypes.node,
};

export default Header;





