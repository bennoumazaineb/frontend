import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import Transaction from 'layouts/billing/components/Transaction';
import { getTasksByProject } from 'feature/tache/tacheSlice';
import { getProjects } from '../../../../feature/project/projectSlice';
import { deleteaUser, getClients } from "feature/auth/authSlice";
function Transactions() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task?.TasksByProject);
  const projects = useSelector((state) => state.project?.projects);
  const token = localStorage.getItem('user');
  const currentUser = JSON.parse(token);
  const { role, _id: userId, Nom_Prénom: userFullName } = currentUser;
  const clientState = useSelector((state) => state.auth?.clients);
  useEffect(() => {
    dispatch(getTasksByProject());
    dispatch(getProjects());
    dispatch(getClients());
  }, [dispatch]);

  return (
    <Card sx={{ height: '100%' }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Projets & Tâches
        </MDTypography>
      </MDBox>
      <MDBox pt={3} px={2}>
        {tasks &&
          Object.keys(tasks).map((key) => {
            const project = projects.find((proj) => proj.nom === key);
            if (!project) return null; // Ignorer si le projet n'est pas trouvé

            const { client, Partenaire } = project;
            const isPartner = role === 'partner';
            const isAdmin = role === 'admin';
            const isClient = role === 'client';

            // Vérifier si le projet correspond aux critères d'affichage
            const shouldDisplayProject =
              isAdmin || // Afficher tous les projets pour l'admin
              (isPartner && clientState.find((cli) => cli.Nom_Prénom === client && cli.Partenaire === userId)) || // Afficher les projets pour un partenaire
              (isClient && client === userFullName); // Afficher les projets pour un client

            if (shouldDisplayProject) {
              return (
                <MDBox key={key} mb={2}>
                  <MDTypography color="success" variant="caption" fontWeight="bold" textTransform="uppercase">
                    {key}
                  </MDTypography>
                  {Array.isArray(tasks[key]) && tasks[key].length > 0 ? (
                    tasks[key].map((task, index) => (
                      <Transaction key={task._id} index={index + 1} project={task.Titre} Titre={task.Etat} />
                    ))
                  ) : (
                    <MDTypography variant="body1" color="dark">
                      Aucune transaction trouvée pour {key}.
                    </MDTypography>
                  )}
                </MDBox>
              );
            }

            return null;
          })}
        {(!tasks || Object.keys(tasks).length === 0) && (
          <MDTypography variant="body1" color="dark">
            Aucune transaction trouvée.
          </MDTypography>
        )}
      </MDBox>
    </Card>
  );
}

export default Transactions;
