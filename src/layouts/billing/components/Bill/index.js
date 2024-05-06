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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
// @mui material components
import Icon from "@mui/material/Icon";
import { deleteAvis,getallAvis } from "feature/avis/avisSlice";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import ReactStars from "react-stars"; // Importez ReactStars
// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

function Bill({ Avis, affecte_par, Note, vat,_id,noGutter }) {
  const dispatch = useDispatch();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const handldelete = (_id) => {
    dispatch(deleteAvis(_id));
    setTimeout(() => {
      dispatch(getallAvis());
    }, 100);
  };
  

  return (
    
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >
    
    {/* Bouton "Ajouter" en haut à droite */}
   
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {affecte_par}
          </MDTypography>
         
          <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
            <MDBox mr={1}>
            <MDButton variant="text" color="error" onClick={() => handldelete(_id)}>
  <Icon>delete</Icon>&nbsp;Supprimer
</MDButton>

            </MDBox>
           
          </MDBox>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
          Avis :&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {Avis}
            </MDTypography>
          </MDTypography>
        </MDBox>
       
                
        <MDBox display="flex" alignItems="center">
                <MDTypography variant="caption" color="text">
                  Note :{" "}
                </MDTypography>
                <ReactStars
                  count={5}
                  size={20}
                  edit={false}
                  value={Note}
                />
              </MDBox>
        <MDTypography variant="caption" color="text">
          <MDTypography variant="caption" fontWeight="medium">
            {vat}
          </MDTypography>
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Bill
Bill.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
Bill.propTypes = {
  Avis: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  affecte_par: PropTypes.string.isRequired,
  vat: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Bill;
