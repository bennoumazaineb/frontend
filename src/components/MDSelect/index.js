

import { forwardRef } from "react";
import PropTypes from "prop-types";
import MDSelectroot from "components/MDSelect/MdSelectRoot";

const MDSelect = forwardRef(({ error, success, disabled, value, ...rest }, ref) => (
  <MDSelectroot
    {...rest}
    ref={ref}
    ownerState={{ error, success, disabled }}
    value={rest.multiple ? (Array.isArray(value) ? value : [value]) : value}
  />
));

MDSelect.defaultProps = {
  error: false,
  success: false,
  disabled: false,
  value: "", // Utiliser une chaîne de caractères par défaut
};

MDSelect.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]), // Peut être une chaîne de caractères ou un tableau
};




export default MDSelect;
