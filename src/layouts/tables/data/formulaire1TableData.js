import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDModel from "components/MDModel";
import MDAvatar from "components/MDAvatar";
import { useDispatch, useSelector } from "react-redux";
import { getallPage1, deleteForm1 } from "feature/page1/page1Slice";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Data = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    dispatch(getallPage1());
  }, [dispatch]);

  const formState = useSelector((state) => state.page1?.page1 || []); // Assurez-vous que formState est un tableau
  const token = localStorage.getItem("user");
  const userRole = token ? JSON.parse(token).role : null;

  const handleOpen = (id) => {
    setSelectedItemId(id);
    setOpen(true);
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

  const handleClose = () => {
    setOpen(false);
  };

  const handldelete = (form1Id) => {
    dispatch(deleteForm1(form1Id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getallPage1());
    }, 100);
  };

  const Job = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
    </MDBox>
  );

  // Vérifiez si formState est un tableau avant d'appeler map()
  const rows = Array.isArray(formState)
    ? formState.map((item, index) => ({
        Id_template: <Job title={item.Id_template} />,
        clients: <Job title={item.clients} />,
        action: (
          <MDBox>
            <MDBox sx={{ display: 'flex', alignItems: 'center' }}>
              <Link to={`/Affichage_Formulaire1/${item.Id_template}/${item.clients}`} style={{ textDecoration: 'none' }}>
                <MDBox sx={{ display: 'flex' }}>
                  <VisibilityIcon style={{ color: 'gray', fontSize: '16px' }} />
                </MDBox>
              </Link>
              {userRole === 'admin' && (
                <MDButton onClick={() => handleOpen(item._id)}>
                  <DeleteIcon style={{ color: 'gray', fontSize: '16px' }} />
                </MDButton>
              )}
            </MDBox>

            <MDModel
              open={open && selectedItemId === item._id}
              onClose={handleClose}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <MDBox sx={{ ...style, width: 400 }}>
                <MDTypography variant="h5" fontWeight="medium" color="dark">
                  Confirmation
                </MDTypography>
                <MDBox display="flex" flexDirection="row" mt={5} mb={3}>
                  <MDBox ml={1} display="flex">
                    <MDButton onClick={() => handldelete(item._id)} variant="gradient" color="info">Delete</MDButton>
                  </MDBox>
                  <MDBox ml={15} display="flex">
                    <MDButton onClick={handleClose} ml={2} variant="gradient" color="info">Cancel</MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </MDModel>
          </MDBox>
        )
      }))
    : []; // Retourne un tableau vide si formState n'est pas un tableau

  const columns = [
    { Header: "Id Template", accessor: "Id_template", align: "left" },
    { Header: "Nom et Prénom du client", accessor: "clients", align: "left" },
    { Header: "Action", accessor: "action", align: "center" },
  ];

  return { columns, rows };
};

export default Data;
