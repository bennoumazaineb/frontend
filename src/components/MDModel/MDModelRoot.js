import Modal from '@mui/material/Modal';
import { styled } from "@mui/material/styles";

export default styled(Modal)(({ theme, ownerState }) => {
  const { palette } = theme;
  const { text, background } = palette;

  return {
    backgroundColor: ownerState.disabled ? background.primary : background.primary,
    color: text.primary, // Couleur principale du texte en fonction du thème

    "& .MuiTypography-root": {
      color: text.primary, // Couleur du texte interne
    },

    "& .MuiButton-root": {
      color: text.white, // Couleur des boutons
      transition: "background-color 0.3s", // Animation de transition pour la couleur de fond
    },

    "& .MuiButton-root:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)", // Fond avec transparence au survol
    },

    "& .MuiButton-root.Mui-disabled": {
      color: text.secondary, // Couleur du texte pour les boutons désactivés
    },
  };
});
