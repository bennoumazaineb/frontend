import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // Importer l'icône de flèche

export default styled(Select)(({ theme, ownerState }) => {
  const { palette, functions } = theme;
  const { error, success, disabled } = ownerState;

  const { grey, transparent, error: colorError, success: colorSuccess } = palette;
  const { pxToRem } = functions;

  // Styles spécifiques au menu déroulant
  const dropdownStyles = {
    fontSize: "30px", // Taille de police souhaitée
    fontFamily: "Roboto, sans-serif", // Police de caractères
    color: "rgba(0, 0, 0, 0.87)", // Couleur du texte
  };

  // Styles spécifiques pour le texte sélectionné dans le menu déroulant
  const selectedTextStyles = {
    fontSize: "15px", // Taille de police souhaitée pour le texte sélectionné
    fontFamily: "Roboto, sans-serif", // Police de caractères
    color: "rgba(0, 0, 0, 0.87)", // Couleur du texte
  };

  // styles for the input with error={true}
  const errorStyles = () => ({
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23F44335' viewBox='0 0 12 12'%3E%3Ccircle cx='6' cy='6' r='4.5'/%3E%3Cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3E%3Ccircle cx='6' cy='8.2' r='.6' fill='%23F44335' stroke='none'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: `right ${pxToRem(12)} center`,
    backgroundSize: `${pxToRem(16)} ${pxToRem(16)}`,

    "& .Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline, &:after": {
        borderColor: colorError.main,
      },
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: colorError.main,
    },
  });

  // styles for the input with success={true}
  const successStyles = () => ({
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8'%3E%3Cpath fill='%234CAF50' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: `right ${pxToRem(12)} center`,
    backgroundSize: `${pxToRem(16)} ${pxToRem(16)}`,

    "& .Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline, &:after": {
        borderColor: colorSuccess.main,
      },
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: colorSuccess.main,
    },
  });

  return {
    fontSize: "30px",
    backgroundColor: disabled ? `${grey[200]} !important` : transparent.main,
    pointerEvents: disabled ? "none" : "auto",
    ...(error && errorStyles()),
    ...(success && successStyles()),
    "& .MuiSelect-root": dropdownStyles, // Appliquer les styles au menu déroulant
    "& .MuiSelect-select.MuiSelect-select": selectedTextStyles, // Appliquer les styles au texte sélectionné
    "& .MuiSelect-icon": {
      // Appliquer les styles à l'icône de flèche
      color: "rgba(0, 0, 0, 0.54)", // Couleur de l'icône de flèche
    },
  };
});