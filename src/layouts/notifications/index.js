import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCommentaire, deleteCommentaire } from "feature/commentaire/commentaireSlice";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import DeleteIcon from "@mui/icons-material/Close";
import MDButton from "components/MDButton";

function Notifications() {
  const dispatch = useDispatch();
  const commentaireState = useSelector((state) => state.commentaire.commentaire);
  const [userRole, setUserRole] = useState(""); // State pour stocker le rôle de l'utilisateur connecté
  const [userName, setUserName] = useState(""); // State pour stocker le Nom_Prénom de l'utilisateur connecté
  const token = localStorage.getItem("user");

  // Extraction du Nom_Prénom et du rôle du token
  useEffect(() => {
    if (token) {
      const parsedToken = JSON.parse(token);
      const user = parsedToken.email || "";
      const role = parsedToken.role || "";
      setUserName(user);
      setUserRole(role);

      // Charger les commentaires en fonction de l'utilisateur connecté
      dispatch(getAllCommentaire(user));
    }
  }, [dispatch, token]);

  const handleDeleteCommentaire = (commentaireId) => {
    // Vérifier si l'utilisateur a le rôle d'administrateur pour autoriser la suppression
   
      dispatch(deleteCommentaire(commentaireId));
      // Recharger les commentaires après la suppression
      setTimeout(() => {
        dispatch(getAllCommentaire());
      }, 100);
    
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2}>
                <MDTypography variant="h5">Commentaires</MDTypography>
              </MDBox>
              <MDBox display="flex" justifyContent="flex-end">
                <MDButton variant="contained" href={`Ajouter_Commentaire/`}>Nouveau</MDButton>
              </MDBox>
              {Array.isArray(commentaireState) && (
                <MDBox pt={2} px={2}>
                  {commentaireState.map((commentaire, index) => {
                    // Vérifier si l'utilisateur a le rôle d'admin ou si le commentaire correspond à l'utilisateur connecté
                    if (userRole === "admin" || commentaire.affecte_par === userName) {
                      return (
                        <Card key={index}>
                          <MDAlert color="info" style={{ maxHeight: 100, overflow: "hidden" }}>
                            <div>
                              <MDTypography variant="body2" style={{ color: "white" }}>
                                <strong>Projet :</strong> {commentaire.project}
                              </MDTypography>      
                              <MDTypography variant="body2" style={{ color: "white" }}>
                                <strong>Affecté Par:</strong> {commentaire.affecte_par}
                              </MDTypography>
                              <MDTypography variant="body2" style={{ color: "white" }}>
                                <strong>Commentaire:</strong> {commentaire.Commentaire}
                              </MDTypography>
                            </div>
                            <CardActions style={{ justifyContent: "flex-end" }}>
                              <DeleteIcon
                                style={{
                                  color: "white",
                                  cursor: "pointer",
                                  position: "absolute",
                                  right: 0,
                                  top: 0 // Ajustez la valeur en fonction de votre préférence
                                }}
                                onClick={() => handleDeleteCommentaire(commentaire._id)}
                              />
                            </CardActions>
                          </MDAlert>
                        </Card>
                      );
                    } else {
                      return null; // Ignorer le rendu du commentaire si l'utilisateur n'est pas autorisé à le voir
                    }
                  })}
                </MDBox>
              )}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;
