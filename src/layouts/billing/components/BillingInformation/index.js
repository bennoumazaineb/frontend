import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useSelector, useDispatch } from "react-redux";
import { getallAvis } from "feature/avis/avisSlice";
import Bill from "layouts/billing/components/Bill";
import { useNavigate } from "react-router-dom"; // Importer useNavigate
import MDButton from "components/MDButton";

function BillingInformation() {
  const dispatch = useDispatch();
  const allAvis = useSelector((state) => state.avis.allavis);
  const token = localStorage.getItem("user");
  const currentUser = JSON.parse(token);
  const navigate = useNavigate(); // Utiliser useNavigate pour la navigation

  useEffect(() => {
    dispatch(getallAvis());
  }, [dispatch]);

  console.log(allAvis);

  // Déterminer le rôle de l'utilisateur actuel
  const isAdmin = currentUser?.role === "admin";

  const isPartner = currentUser?.role === "partner";
  const isClient = currentUser?.role === "client";
  const userFullName = currentUser?.Nom_Prénom;

  const handleAddAvis = () => {
    // Rediriger l'utilisateur vers la page d'ajout d'avis
    navigate("/Ajouter_avis"); // Utiliser navigate pour la redirection
  };

  return (
    <Card id="billing-information">
 <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          LES AVIS
        </MDTypography>
        {/* Bouton "Ajouter un avis" à l'extrémité droite */}
        <MDButton
          variant="gradient"
          color="dark"
          onClick={handleAddAvis}
        >
          Ajouter un avis
        </MDButton>
      </MDBox>


      
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {allAvis.map((avis) => {
            const { _id, Avis, affecte_par, Note, createdAt } = avis;

            // Vérifier si l'utilisateur peut voir cet avis
            if (isAdmin || (isPartner && affecte_par === userFullName) || (isClient && affecte_par === userFullName)) {
              return (
                <Bill
                  key={_id}
                  _id={_id}
                  Avis={Avis}
                  affecte_par={affecte_par}
                  Note={Note}
                  vat={createdAt}
                />
              );
            }

            return null; // Ne pas afficher l'avis pour les autres utilisateurs
          })}
        </MDBox>
      </MDBox>

      {/* Bouton "Ajouter" affiché pour tous les utilisateurs */}
     
    </Card>
  );
}

export default BillingInformation;
