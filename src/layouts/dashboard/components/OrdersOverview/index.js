import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import TimelineItem from 'examples/Timeline/TimelineItem';
import Icon from '@mui/icons-material/FormatListNumbered';
import { getTasks } from '../../../../feature/tache/tacheSlice';
import { getProjects } from '../../../../feature/project/projectSlice';
import { getClients } from "feature/auth/authSlice";

function OrdersOverview() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('user');
  const currentUser = token ? JSON.parse(token) : null;

  const projects = useSelector((state) => state.project?.projects);
  const tasksState = useSelector((state) => state.task.tasks);
  const clientState = useSelector((state) => state.auth?.clients);

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getProjects());
    dispatch(getClients());
  }, [dispatch]);

  if (!currentUser) {
    return null; // Render null if currentUser is not defined
  }

  const filteredTasks = useMemo(() => {
    return tasksState.filter((task) => {
      const project = projects.find((proj) => proj.nom === task.project);

      if (!project) return false;

      const { client } = project;
      const isPartner = currentUser.role === 'partner';
      const isAdmin = currentUser.role === 'admin';
      const isClient = currentUser.role === 'client';
      const isEmployee = currentUser.role === 'employee' && task.Employe?._id === currentUser._id;

      const shouldDisplayProject =
        isAdmin ||
        (isPartner && clientState.find((cli) => cli.Nom_Prénom === client && cli.Partenaire === currentUser._id)) ||
        (isClient && client === currentUser.Nom_Prénom) ||
        isEmployee;

      return shouldDisplayProject;
    });
  }, [currentUser, projects, clientState, tasksState]);

  return (
    <Card sx={{ height: '100%' }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Tâches
        </MDTypography>
        <MDBox mt={0} mb={2}>
          {currentUser.role === 'admin' && (
            <MDTypography variant="button" color="text" fontWeight="medium">
              <MDTypography display="inline" variant="body2" verticalAlign="middle">
                <Icon sx={{ color: ({ palette: { success } }) => success.main }} />
              </MDTypography>
              &nbsp;
              {filteredTasks.length} tâches
            </MDTypography>
          )}
        </MDBox>
      </MDBox>

      {filteredTasks.length === 0 && (
        <MDBox pt={2} px={3}>
          <MDTypography variant="body1" color="dark">
            Aucune tâche trouvée.
          </MDTypography>
        </MDBox>
      )}

      {filteredTasks.map((task, index) => (
        <TimelineItem
          key={index}
          icon="task icon"
          title={`${task.Titre} (${task.Employe ? task.Employe.Nom_Prénom : 'Non affecté'})`}
          dateTime={task.Etat}
          lastItem={index === filteredTasks.length - 1}
        />
      ))}
    </Card>
  );
}

export default OrdersOverview;
