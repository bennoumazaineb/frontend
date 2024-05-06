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
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import { styled } from '@mui/system';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Box from '@mui/material/Box';
// Images
import masterCardLogo from "assets/images/logos/mastercard.png";
import visaLogo from "assets/images/logos/visa.png";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

function PaymentMethod() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

// Utilisation de styled pour créer un composant animé
const AnimatedBox = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(3),
  border: `${theme.borders.borderWidth[1]} solid ${theme.palette.divider}`,
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)', // Animation de zoom au survol
    boxShadow: theme.shadows[4], // Ajoute une ombre portée au survol
  },
}));
  return (
    <Card >
     <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          A_PROPOS
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
       <AnimatedBox>
        {/* Image ici */}
        <MDTypography variant="h6" fontWeight="medium" sx={{ flex: 1 }}>
          C'est une plateforme web dédiée à la gestion de projet. Cette plateforme simplifiera et automatisera la collecte des informations en proposant au client un moyen intuitif de fournir les détails nécessaires pour la création du site. De plus, elle offrira une visibilité en temps réel sur l’avancement du travail, favorisant ainsi la collaboration et la satisfaction des parties impliquées.
        </MDTypography>
      </AnimatedBox>
</MDBox>
    </Card>
  );
}

export default PaymentMethod;
