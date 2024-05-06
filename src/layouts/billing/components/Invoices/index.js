import React, { useEffect } from 'react';
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from 'feature/tache/tacheSlice';
import Invoice from "layouts/billing/components/Invoice";
import { getProjects } from "../../../../feature/project/projectSlice";
import { deleteaUser, getClients } from "feature/auth/authSlice";

function Invoices() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task?.tasks);
  const projects = useSelector((state) => state.project?.projects);
  const clientState = useSelector((state) => state.auth?.clients);

  useEffect(() => {
    dispatch(getClients()); // Récupérer les clients au montage du composant
    dispatch(getProjects()); // Récupérer les projets au montage du composant
    dispatch(getTasks()); // Récupérer les tâches au montage du composant
  }, [dispatch]);

  const token = localStorage.getItem("user");
  const currentUser = token ? JSON.parse(token) : {};
  const { role, Nom_Prénom: userFullName, _id: userId } = currentUser;

  const isAdmin = role === "admin";
  const isClient = role === "client";
  const isPartner = role === "partner";

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Phase projet & Version (si disponible)
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {tasks && tasks.map((task) => {
            const { _id, Phase_projet, Version, project } = task;
            const projectMatch = projects.find((proj) => proj.nom === project);

            if (!projectMatch) return null;

            const { client } = projectMatch;

            // Vérifier si le client du projet correspond à l'utilisateur actuel (client)
            if (isClient && client === userFullName) {
              return (
                <Invoice
                  key={_id}
                  Phase_projet={Phase_projet}
                  Version={Version}
                />
              );
            }

            // Vérifier si le partenaire du client correspond à l'utilisateur actuel (partenaire)
            if (isPartner) {
              const clientPartner = clientState.find((cli) => cli.Nom_Prénom === client && cli.Partenaire === userId);
              if (clientPartner) {
                return (
                  <Invoice
                    key={_id}
                    Phase_projet={Phase_projet}
                    Version={Version}
                  />
                );
              }
            }

            // Afficher tous les projets pour l'administrateur
            if (isAdmin) {
              return (
                <Invoice
                  key={_id}
                  Phase_projet={Phase_projet}
                  Version={Version}
                />
              );
            }

            return null;
          })}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Invoices;
