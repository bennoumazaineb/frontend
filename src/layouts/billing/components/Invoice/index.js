import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useNavigate } from "react-router-dom";

function Invoice({ Phase_projet, Version, noGutter }) {
  const navigate = useNavigate();

  const handleViewVersion = () => {
    if (Version) {
      window.open(Version, "_blank"); // Ouvrir le lien dans un nouvel onglet
    }
  };

  const showlinkText = Version ? "Version" : "Version";
  const LINKTextColor = Version ? "green" : "red";

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1}
      pr={1}
      mb={noGutter ? 0 : 1}
    >

        
        <MDTypography variant="caption" fontWeight="regular" color="text" ml={2}>
          Phase du projet: {Phase_projet}
        </MDTypography>
  
        <MDBox
          display="flex"
          alignItems="center"
          justifyContent="flex-end" // Aligner à l'extrémité droite
          flex={1} // Permet d'occuper tout l'espace disponible
        >
          <MDBox
            display="flex"
            alignItems="center"
            lineHeight={1}
            sx={{ cursor: "pointer" }}
            onClick={handleViewVersion}
          >
 <Icon fontSize="small" style={{ marginRight: 3 }}>link</Icon>
            <MDTypography
              variant="button"
              fontWeight="bold"
              sx={{
                textDecoration: "underline",
                cursor: "pointer",
                color: LINKTextColor, // Utiliser la couleur calculée
                marginLeft: 1, // Marge à gauche pour l'espace
              }}
            >
              &nbsp;{showlinkText}
            </MDTypography>
          </MDBox>
        </MDBox>
   
    </MDBox>
  );
}

Invoice.defaultProps = {
  noGutter: false,
};

Invoice.propTypes = {
  Phase_projet: PropTypes.string.isRequired,
  Version: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Invoice;
