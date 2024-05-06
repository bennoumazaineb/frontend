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

function DefaultHistoriqueCard({
  image,
  type,
  titre,
  description,
  authors,

}) {
  const renderAuthors = authors.map(({ image: media, name }) => (
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
    <div style={{ width: "240%", height:"100%",marginBottom: "20px", display: "flex", justifyContent: "space-between" }}>
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "16px",
        transition: "transform 0.3s ease-in-out",
        width: "45%", // Utilisez un pourcentage pour la largeur pour permettre à deux cartes de tenir sur la même ligne avec un espacement entre elles
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
        <MDBox
          position="relative"
          width="100.25%"
          shadow="xl"
          borderRadius="xl"
        >
          <CardMedia
            component="img"
            src={image}
            sx={{
              maxWidth: "100%",
              margin: 0,
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "16px",
              maxHeight: "300px",
            }}
          />
        </MDBox>
        <MDBox mt={1} mx={2}>
  <MDTypography
    variant="h6" // Decreased from h5 to h6
    fontWeight="bold"
    color="info"
  >
    {titre}
  </MDTypography>
  
  <MDTypography variant="caption" color="secondary">
  {description}
</MDTypography>


  <MDTypography variant="h6"  color="info" fontWeight="bold">
    {type}
  </MDTypography>



  <MDBox mt={1} display="flex">
    {renderAuthors}
  </MDBox>
</MDBox>

      </Card>
    </div>
  );
}

DefaultHistoriqueCard.defaultProps = {
  authors: [],
};

DefaultHistoriqueCard.propTypes = {
  image: PropTypes.string.isRequired,

  type: PropTypes.string.isRequired,
  titre: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.object),
 
};

export default DefaultHistoriqueCard;
