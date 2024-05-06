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
import{ useState } from 'react';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { useDispatch, useSelector } from "react-redux";
import {
  getTasks,
  DeleteTask,
  updateTaskEmployee,
} from '../../../feature/tache/tacheSlice';
import MDProgress from "components/MDProgress";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MDModel from "components/MDModel";
import MDButton from "components/MDButton";
import PersonPinIcon from '@mui/icons-material/PersonPin';
import MDSelect from 'components/MDSelect';
import MenuItem from '@mui/material/MenuItem';
// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAllEmployeesWithLessThanTenTasks,
} from '../../../feature/auth/authSlice';

import * as React from 'react';
const Progress = ({ color, value }) => {
  // Convert the 'value' prop to a number
  const numericValue = parseFloat(value);

  return (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={numericValue} label={false} />
      </MDBox>
    </MDBox>
  );
};
const generateColor = (name) => {
  const initials = name.split(" ").map((part) => part[0]).join("");
  const colors = ["#2196f3"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getAvatarColor = (name) => {
  // Définir colorMap si ce n'est pas déjà défini
  const colorMap = {};
  if (!colorMap[name]) {
    colorMap[name] = generateColor(name);
  }
  return colorMap[name];
};

 function Data() {
  
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [selectedItemId, setSelectedItemId] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const token = localStorage.getItem("user");
  const currentUser = JSON.parse(token);
const handleClose = () => {
  setAffectationOpen(false);
  setConfirmationOpen(false);
};
const userToken = localStorage.getItem('user');


  useEffect(() => {
    dispatch(getTasks());
    dispatch(getAllEmployeesWithLessThanTenTasks());
  }, [dispatch]); // Ajouter dispatch à la liste de dépendances
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
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const empState = useSelector((state) => state.auth?.empstasks);
  const [isDemo, setIsDemo] = useState(false);
  const [add_affemp, setAddAffemp] = useState({ Employe: '' });
  const [affectationOpen, setAffectationOpen] = useState(false);
  const taskState = useSelector((state) => state.task?.tasks);
  const handleEmployeeChange = (selectedEmployeeId) => {
    setAddAffemp({ Employe: selectedEmployeeId });
  };
  const submitHandler = async (taskId, employeeId) => {
    if (taskId && employeeId) {
      dispatch(updateTaskEmployee({ taskId, employeeId }));
      window.location.href = '/Tache';
      setTimeout(() => {
        window.location.href = '/Tache';
      }, 300);
    } else {
      console.error('Task ID or Employee ID is undefined');
    }
  };

  const handleAffect = () => {
    if (selectedItemId && add_affemp.Employe) {
      // Si selectedItemId et add_affemp.Employe sont définis, effectuez l'affectation
      submitHandler(selectedItemId, add_affemp.Employe);
      // Fermez le modèle d'affectation après l'affectation
      setAffectationOpen(false);
    } else {
      console.error('Task ID or Employee ID is missing.'); // Gérer les cas où l'ID de la tâche ou l'ID de l'employé est manquant
    }
  };
  
  const handleOpen = (id, modelType) => {
    if (modelType === 'affectation') {
      setSelectedItemId(id); // Définir l'identifiant de la tâche sélectionnée
      setAffectationOpen(true); // Ouvrir le modèle d'affectation
    } else if (modelType === 'confirmation') {
      setSelectedItemId(id); // Définir l'identifiant de la tâche sélectionnée
      setConfirmationOpen(true); // Ouvrir le modèle de confirmation
    }
  };
  
  const handledelete = (id) => {
    dispatch(DeleteTask(id));
    setConfirmationOpen(false);
    setTimeout(() => {
      dispatch(getTasks());
    }, 100);
  };


  // Déterminer si l'utilisateur actuel est un administrateur
  const isAdmin = currentUser?.role === "admin";
  const isEmployee = currentUser?.role === "employee";
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
  
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
    
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
  const Job1 = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="error" fontWeight="medium">
        {title}
      </MDTypography>

    </MDBox>
  );
  const rows = Array.isArray(taskState)
    ? taskState
        .filter((item) => {
          if (isAdmin) {
            return true; // Affiche toutes les tâches pour les administrateurs
          } else {
            return item.Employe?._id === currentUser?._id; // Affiche les tâches affectées à l'utilisateur actuel
          }
        })
        .map((item, index) => ({
    key: index + 1,
    Titre: <Author name={item.Titre}  />,
    Description: <Job title={item.Description} description="" />,
    Priorite: <MDBox ml={-1}>
    <MDBadge badgeContent={item.Priorité} color="dark" variant="gradient" size="sm" />
  </MDBox>,
    Duree: <Job title={item.Durée} description="" />,
    Phase_projet: <Job title={item.Phase_projet} description="" />,
    Remarque: <Job title={item.Remarque || "Aucune"} description="" />, // Affiche "Aucune" si la valeur est vide ou non définie
    Version: <Job title={item.Version || "Aucune"} description="" />,
    date_debuttask:<Job1 title={item.date_debuttask} description="" />,
    date_fintask:<Job1 title={item.date_fintask} description="" />,
    Employe: (
      <Job title={item.Employe ? item.Employe.Nom_Prénom : 'Non affecté'} />
    ),
    
    Etat: <Progress value={item.Etat|| "0"} color="info" variant="gradient" label={false}  description="" />,
    action: (
      <>
       {isAdmin && (
    <>
    <MDTypography
  component="a"
  href="#"
  onClick={() => handleOpen(item._id, 'affectation')}
  variant="caption"
  color="text"
  fontWeight="medium"
>
  <PersonPinIcon />
</MDTypography>

      <MDModel
        open={affectationOpen}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <MDBox sx={{ ...style, width: 400 }}>
          <MDTypography variant="h5" fontWeight="medium">
            Affectation
          </MDTypography>
          <MDSelect
            fullWidth
            name="Employe"
            value={add_affemp.Employe}
            onChange={(e) => handleEmployeeChange(e.target.value)}
            disabled={isDemo}
          >
            <MenuItem value="" disabled>
              Select Employe
            </MenuItem>
            {empState?.map((itememp) => (
              <MenuItem key={itememp._id} value={itememp._id}>
                {itememp.Nom_Prénom}
              </MenuItem>
            ))}
          </MDSelect>
          <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
            <MDBox ml={1} display="flex">
              <MDButton onClick={() => handleAffect(item._id, selectedItemId)} variant="gradient" color="info">
                Affecter
              </MDButton>
            </MDBox>
            <MDBox ml={15} display="flex">
              <MDButton onClick={handleClose} ml={2} variant="gradient" color="info" type="submit">
                Cancel
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </MDModel>
    </>
  )}
        {(isAdmin || isEmployee) && (
          <MDTypography
            component="a"
            href={`Modifier_tache/${item._id}`}
            variant="caption"
            color="text"
            fontWeight="medium"
            mr={2}
          >
            <EditIcon />
          </MDTypography>
        )}
    
        {isAdmin && (
  <>
    <MDTypography
      component="a"
      href="#"
      onClick={() => handleOpen(item._id, 'confirmation')}
      variant="caption"
      color="text"
      fontWeight="medium"
    >
      <DeleteIcon />
    </MDTypography>

    <MDModel
      open={confirmationOpen}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <MDBox sx={{ ...style, width: 400 }}>
        <MDTypography variant="h5" fontWeight="medium">
          Confirmation
        </MDTypography>
        <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
          <MDBox ml={1} display="flex">
            <MDButton onClick={() => handledelete(selectedItemId)} variant="gradient" color="info">
              Delete
            </MDButton>
          </MDBox>
          <MDBox ml={15} display="flex">
            <MDButton onClick={handleClose} ml={2} variant="gradient" color="info" type="button">
              Cancel
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </MDModel>
  </>
)}
      </>
    )
    
  })) : [];

  
  return {
    columns: [
      { Header: "Titre", accessor: "Titre", width: "30%", align: "left" },
      { Header: "Description", accessor: "Description", align: "left" },
      { Header: "Priorite", accessor: "Priorite", align: "center" },
      { Header: "Durée", accessor: "Duree", align: "center" },
      { Header: "Phase_projet", accessor: "Phase_projet", align: "center" },
      { Header: "Employé", accessor: "Employe", align: "center" },
      { Header: "Remarque", accessor: "Remarque", align: "center" },
      { Header: "Version", accessor: "Version", align: "center" },
      { Header: "Etat", accessor: "Etat", align: "center" },
      { Header: "date de début de tâche", accessor: "date_debuttask", align: "center" },
      { Header: "date de fin de tâche", accessor: "date_fintask", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],
    rows: rows
  };
}
export default Data;