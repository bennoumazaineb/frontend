import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getAllFacture, updateFacturePaymentStatus } from '../../feature/facture/factureSlice';
import { useLocation } from 'react-router-dom';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import MDTypography from 'components/MDTypography';
import MDModel from 'components/MDModel';
import MDButton from 'components/MDButton';
import gg from './gg.jpg';
import MDBox from 'components/MDBox';
import axios from 'axios';
import { base_url } from '../../utils/baseUrl';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const RecipeReviewCard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;
  const { client } = state || {};
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    dispatch(getAllFacture());
  }, [dispatch]);

  const factureState = useSelector((state) => state.facture.fact);
  console.log('factureState', factureState);

  const [open, setOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleUpdatePayment = (id) => {
    dispatch(updateFacturePaymentStatus(id))
      .then(() => {
        dispatch(getAllFacture());
      })
      .catch((error) => {
        console.error('Failed to update payment:', error);
      });
  };

  // Récupérer l'utilisateur actuel depuis le localStorage
  const token = localStorage.getItem('user');
  const currentUser = JSON.parse(token);

  // Déterminer si l'utilisateur actuel est un administrateur
  const isAdmin = currentUser?.role === 'admin';
  // Déterminer si l'utilisateur actuel est un client
  const isClient = currentUser?.role === 'client';

  const handleOpen = (id) => {
    setSelectedItemId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handlePayment = (amount) => {
    axios
      .post(`${base_url}payment/`, { amount: amount })
      .then((response) => {
        const { result } = response.data;
        window.location.href = result.link; // Rediriger vers la page de paiement
      })
      
      .catch((error) => {
        console.error('Payment failed:', error);
      });
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {isAdmin && ( // Afficher le bouton "Nouveau" uniquement pour les administrateurs
        <MDBox display="flex" justifyContent="flex-end">
          <MDButton
            variant="contained"
            href={`Ajouter_Facture`}
            style={{
              backgroundColor: 'transparent', // Couleur de fond transparente
            }}
          >
            Nouveau
          </MDButton>
        </MDBox>
      )}


      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      {Array.isArray(factureState) ? (
  factureState.map((facture) => {
    if (isAdmin || (isClient && facture.client === currentUser.Nom_Prénom)) {
      return (
        <Card key={facture.id} sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: '#2196f3' }}>{facture.client ? facture.client.charAt(0).toUpperCase() : ''}</Avatar>}
            title={`Client: ${facture.client}`}
          />
          <CardMedia component="img" height="194" image={gg} alt="Image" />
          <CardContent>
            <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
              Montant: {facture.montant} Dinar.
              <br />
              Projet: {facture.project}
            </MDTypography>
          </CardContent>

          <MDButton
            style={{
              background: facture.Payement === 'payée' ? 'linear-gradient(45deg, #0c71c2 30%, #21cbf3 90%)' : 'linear-gradient(45deg, #c21c10 30%, #b03b31 90%)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '10px',
              padding: '8px 50px',
              justifyContent: 'center',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
              maxWidth: '100%',
              boxSizing: 'border-box',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textAlign: 'center',
            }}
            onClick={() => isAdmin && handleUpdatePayment(facture._id)}
            disabled={!isAdmin}
          >
            {facture.Payement}
          </MDButton>

          {/* Condition pour afficher le bouton "Payée maintenant" uniquement lorsque Payement est "non payée" */}
          {isClient && facture.Payement === 'Non payée' && (
            <MDButton
                onClick={() => handlePayment(facture.montant)} // Appeler la fonction de paiement avec le montant de la facture
                style={{
                  background: 'linear-gradient(45deg, #008000 30%, #32cd32 90%)',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '10px',
                  padding: '8px 50px',
                  justifyContent: 'center',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                  maxWidth: '100%',
                  boxSizing: 'border-box',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textAlign: 'center',
                  marginTop: '10px',
                }}
              >
                Payer maintenant
              </MDButton>
          )}

          <CardActions disableSpacing>
            <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <MDTypography paragraph>Méthode de paiement :</MDTypography>
              <MDTypography variant="body2" color="text" ml={1} fontWeight="regular">
                Pour payer votre projet, veuillez noter que le paiement peut être effectué en ligne ou en personne (présentiel). Pour les paiements en ligne, vous pouvez utiliser notre plateforme sécurisée de paiement sur notre site web. Pour les paiements en personne, veuillez vous présenter à notre société et notre équipe sera ravie de vous assister.
              </MDTypography>
            </CardContent>
          </Collapse>
        </Card>
      );
    }
    return null;
  })
) : (
  <Typography variant="body2" color="text.secondary">
    Aucune facture disponible.
  </Typography>
)}

      
      </div>

      <Footer />
    </DashboardLayout>
  );
};

export default RecipeReviewCard;
