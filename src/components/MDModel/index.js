import { forwardRef } from "react";
import PropTypes from "prop-types";
import MDModelRoot from "components/MDModel/MDModelRoot";

const MDModel = forwardRef(({ error, success, disabled, ...rest }, ref) => (
  <MDModelRoot {...rest} ref={ref} ownerState={{ error, success, disabled }} />
));

MDModel.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

MDModel.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default MDModel;
