/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { useDispatch, useSelector } from "react-redux";
import { getPartners } from "../../../feature/auth/authSlice";
// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteaUser } from "feature/auth/authSlice";
import MDModel from "components/MDModel";
import MDButton from "components/MDButton";
import * as React from 'react';
import  { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
export default function Data() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [selectedItemId, setSelectedItemId] = React.useState(null);
  const [colorMap, setColorMap] = useState({});
  useEffect(() => {
    dispatch(getPartners());
  }, [dispatch]);

  const partnerState = useSelector((state) =>  state.auth?.partners);


  const handleOpen = (id) => {
    setSelectedItemId(id);
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const handldelete = (userId) => {
    dispatch(deleteaUser(userId));
    setOpen(false);
    setTimeout(() => {
      dispatch(getPartners());
    }, 100);
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const generateColor = (name) => {
  const initials = name.split(" ").map((part) => part[0]).join("");
  const colors = ["#2196f3"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getAvatarColor = (name) => {
  return colorMap[name] || "#2196f3"; // Default color
};
const Author = ({ name, email }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDAvatar sx={{ bgcolor: getAvatarColor(name) }}>{name.charAt(0)}</MDAvatar>
    <MDBox ml={2} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {name}
      </MDTypography>
      <MDTypography variant="caption">{email}</MDTypography>
    </MDBox>
  </MDBox>
);
const Job = ({ title, description }) => (
  <MDBox lineHeight={1} textAlign="left">
    <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
      {title}
    </MDTypography>

  </MDBox>
);

  // Construction des lignes de données
  const rows = partnerState && Array.isArray(partnerState) ? partnerState.map((item, index) => ({
    key: index + 1,
    Nom_Prénom: <Author name={item.Nom_Prénom}  email={item.email} />,
    Société:<Job title={item.Société} description="" />,
    email:<Job title={item.email} description="" />,
    Téléphone:<Job title={item.Téléphone} description="" />,
    Role: <Job title={item.role} description="" />,
    action: (
      <>
          <MDBox>
              <MDTypography component="a" href={`Modifier_Partenaire/${item._id}`} variant="caption" color="text" fontWeight="medium" mr={2}>
              <EditIcon /> 
              </MDTypography>
              <MDTypography component="a" href="#" onClick={() => handleOpen(item._id)} variant="caption" color="text" fontWeight="medium">
              <DeleteIcon />
              </MDTypography>
              <MDModel
          open={open && selectedItemId === item._id}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <MDBox sx={{ ...style, width: 400 }}>
            <MDTypography variant="h5" fontWeight="medium" color="dark">
              Confirmation
            </MDTypography>
            <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
              <MDBox ml={1} display="flex">
                <MDButton onClick={() => handldelete(item._id)} variant="gradient" color="info">Delete</MDButton>
              </MDBox>
              <MDBox ml={15} display="flex">
                <MDButton onClick={handleClose} ml={2} variant="gradient" color="info">Cancel</MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </MDModel>
          </MDBox>
      </>
      )
    })) : [];
  
  return {
    columns: [
      { Header: "Nom et Prénom", accessor: "Nom_Prénom", width: "45%", align: "left" },
      { Header: "Société", accessor: "Société", align: "left" },
      { Header: "Email", accessor: "email", align: "left" },
      { Header: "Téléphone", accessor: "Téléphone", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows: rows
  };
}
