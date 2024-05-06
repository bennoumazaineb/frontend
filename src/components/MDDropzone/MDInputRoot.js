import { styled } from "@mui/material/styles";
import Dropzone from "react-dropzone";

const StyledUploadDropzone = styled(Dropzone)(({ theme, ownerState }) => {
  const { palette, functions } = theme;
  const { error, success, disabled } = ownerState;

  const { grey, transparent, error: colorError, success: colorSuccess } = palette;
  const { pxToRem } = functions;

  // styles for the Dropzone with error={true}
  const errorStyles = () => ({
    borderColor: colorError.main,
    "&:hover": {
      borderColor: colorError.main,
    },
  });

  // styles for the Dropzone with success={true}
  const successStyles = () => ({
    borderColor: colorSuccess.main,
    "&:hover": {
      borderColor: colorSuccess.main,
    },
  });

  return {
    backgroundColor: disabled ? `${grey[200]} !important` : transparent.main,
    pointerEvents: disabled ? "none" : "auto",
    borderWidth: "2px",
    borderStyle: "dashed",
    borderRadius: "4px",
    transition: "border-color 0.2s ease-in-out",
    ...(error && errorStyles()),
    ...(success && successStyles()),
  };
});

export default StyledUploadDropzone;
