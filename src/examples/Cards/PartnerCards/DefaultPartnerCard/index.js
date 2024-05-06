import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MDModel from "components/MDModel";

function DefaultPartnerCard({
  images,
  Id_template,
  id,
  Description,
  action,
  action2,
  action3,
  action4,
  authors,
  handleDelete,
}) {
  const token = localStorage.getItem("user");
  const currentUser = JSON.parse(token);
  const userRole = currentUser ? currentUser.role : null;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClick = () => {
    handleDelete(id);
    setOpen(false);
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
  const renderAuthors = authors.map(({ images: media, name }) => (
    <Tooltip key={name} title={name} placement="bottom">
      <MDAvatar
        src={media}
        alt={name}
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",
          ml: -1.25,
          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    </Tooltip>
  ));

  return (
    <Card sx={{ display: "flex", flexDirection: "column", backgroundColor: "transparent", boxShadow: "none", overflow: "visible" }}>
      <MDBox position="relative" width="100.25%" shadow="xl" borderRadius="xl">
        <CardMedia
          component="img"
          src={images}
          sx={{ maxWidth: "100%", margin: 0, boxShadow: ({ boxShadows: { md } }) => md, objectFit: "cover", objectPosition: "center" }}
        />
      </MDBox>
      <MDBox mt={1} mx={0.5}>
        <MDTypography variant="button" fontWeight="regular" color="text" textTransform="capitalize">
          {Id_template}
        </MDTypography>
        <MDBox mb={3} lineHeight={0}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {Description}
          </MDTypography>
        </MDBox>
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          {action && (
            <MDButton component="a" href={action.route} variant="outlined" size="small" color={action.color} target="_blank" rel="noreferrer">
              {action.label}
            </MDButton>
          )}
          {action2 && (
            <MDButton component="a" href={action2.route} variant="outlined" size="small" color={action.color} target="_blank" rel="noreferrer">
              {action2.label}
            </MDButton>
          )}
       
          {userRole === "admin" && (
            <MDBox>
              <MDTypography component="a" href={action3.route} variant="caption" color="text" fontWeight="medium" mr={2}>
                <EditIcon />
              </MDTypography>
              <MDTypography component="a" onClick={handleOpen} variant="caption" color="text" fontWeight="medium">
                <DeleteIcon />
              </MDTypography>
              <MDModel
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
              >
                <MDBox sx={{ ...style, width: 400 }}>
                  <MDTypography variant="h5" fontWeight="medium">
                    Confirmation
                  </MDTypography>
                  <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
                    <MDBox ml={1} display="flex">
                      <MDButton onClick={handleDeleteClick} variant="gradient" color="info">Delete</MDButton>
                    </MDBox>
                    <MDBox ml={15} display="flex">
                      <MDButton onClick={handleClose} ml={2} variant="gradient" color="info" type="submit">Cancel</MDButton>
                    </MDBox>
                  </MDBox>
                </MDBox>
              </MDModel>
            </MDBox>
          )}
          <MDBox display="flex">{renderAuthors}</MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

DefaultPartnerCard.defaultProps = {
  authors: [],
};

DefaultPartnerCard.propTypes = {
  images: PropTypes.string.isRequired,
  Id_template: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  Description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  action2: PropTypes.shape({
    route: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  action3: PropTypes.shape({
    route: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  action4: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      images: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  handleDelete: PropTypes.func.isRequired,
};

export default DefaultPartnerCard;
