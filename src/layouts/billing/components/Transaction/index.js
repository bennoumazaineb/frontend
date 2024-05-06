import React from 'react';
import PropTypes from 'prop-types';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import { styled } from '@mui/system';

// Utilisation de styled pour créer un composant avec des styles personnalisés
const StyledTransaction = styled(MDBox)(({ theme }) => ({
  py: 1,
  pr: 2,
  mb: 1,

  transition: 'transform 0.2s ease-in-out', // Animation de transition sur le hover
  '&:hover': {
    transform: 'scale(1.05)', // Zoom léger au survol
  },
}));

function Transaction({ index, project, Titre }) {
  return (
    <StyledTransaction>
      <MDBox display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="button" fontWeight="medium" gutterBottom>
          {index}. {project}
        </MDTypography>
        <MDTypography variant="caption" color="text" fontWeight="regular">
          {Titre}
        </MDTypography>
      </MDBox>
    </StyledTransaction>
  );
}

Transaction.propTypes = {
  index: PropTypes.number.isRequired,
  project: PropTypes.string.isRequired,
  Titre: PropTypes.string.isRequired,
};

export default Transaction;
