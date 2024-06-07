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
import { getEmps } from "../../../feature/auth/authSlice";
// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import MDModel from "components/MDModel";
import MDButton from "components/MDButton";
import * as React from 'react';
import { deleteaUser } from "feature/auth/authSlice";
import  { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Employe from "layouts/Employe";
export default function Data() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [colorMap, setColorMap] = useState({});
  useEffect(() => {
    dispatch(getEmps());
  }, []);

  const empState = useSelector((state) => state.auth?.emps);
  console.log("empState",empState)

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
        navigate("/Employees");
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

   useEffect(() => {
    // Generate color map
    const generateColor = (name) => {
      const initials = name.split(" ").map((part) => part[0]).join("");
      const colors = ["#2196f3"];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const newColorMap = {};
    empState.forEach((emps) => {
      const { Nom_Prénom } = emps;
      if (!colorMap[Nom_Prénom]) {
        newColorMap[Nom_Prénom] = generateColor(Nom_Prénom);
      }
    });
    setColorMap((prevColorMap) => ({ ...prevColorMap, ...newColorMap }));
  }, [empState]);
  
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
  const rows = empState && Array.isArray(empState) ? empState.map((item, index) => ({
    key: index + 1,
    Nom_Prénom: <Author name={item.Nom_Prénom} email={item.email} />,
    Email: <Job title={item.email} description="" />,
    Téléphone: <Job title={item.Téléphone} description="" />,
   
    Poste:<Job title={item.Poste} description="" />,
    action: (
      <>
          <MDBox>
              <MDTypography component="a" href={`Modifier_Employe/${item._id}`} variant="caption" color="text" fontWeight="medium" mr={2}>
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
      { Header: "Email", accessor: "Email", align: "left" },
      { Header: "Téléphone", accessor: "Téléphone", align: "center" },
    
      { Header: "Poste", accessor: "Poste", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows
  };
}
