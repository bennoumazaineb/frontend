import { forwardRef } from "react";
import PropTypes from "prop-types";
import MDDropzoneRoot from "components/MDDropzone";

const MDUpload = forwardRef(({ error, success, disabled, ...rest }, ref) => (
  <MDDropzoneRoot {...rest} ref={ref} ownerState={{ error, success, disabled }} />
));

MDUpload.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

MDUpload.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default MDUpload;
