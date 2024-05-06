import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import MDBox from 'components/MDBox';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import MasterCard from 'examples/Cards/MasterCard';
import DefaultInfoCard from 'examples/Cards/InfoCards/DefaultInfoCard';
import { getallAvis } from 'feature/avis/avisSlice';
import PaymentMethod from 'layouts/billing/components/PaymentMethod';
import Invoices from 'layouts/billing/components/Invoices';
import BillingInformation from 'layouts/billing/components/BillingInformation';
import Transactions from 'layouts/billing/components/Transactions';
import { getallUsersExceptAdminAndEmployees, getAdmin } from 'feature/auth/authSlice';

function Billing() {
  const dispatch = useDispatch();
  const allAvis = useSelector((state) => state.avis.allavis);
  const userSaufAdEm = useSelector((state) => state.auth.usersaufempAdmin);
  const admin = useSelector((state) => state.auth.admin);
  console.log("aaaaaaaaaaaaaaaaaaaaaaaa", admin);
  useEffect(() => {
    dispatch(getallAvis());
    dispatch(getallUsersExceptAdminAndEmployees());
    dispatch(getAdmin());
  }, [dispatch]);



  return (
    <DashboardLayout>
    <DashboardNavbar />
    <MDBox mb={2} />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} xl={6}>
                <MasterCard
  Nom_Prénom={admin?.[0]?.Nom_Prénom || ''}
  Téléphone={admin?.[0]?.Téléphone ? parseInt(admin[0].Téléphone) : 0}
  Email={admin?.[0]?.email || ''}
/>


                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="assessment"
                    title="Avis"
                    description="Nombre total des avis"
                    value={allAvis ? `${allAvis.length}` : 'Chargement...'}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="person"
                    title="Nombre total"
                    description="Clients + Partenaires"
                    value={userSaufAdEm ? `${userSaufAdEm.length}` : 'Chargement...'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <PaymentMethod />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Invoices />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <BillingInformation />
            </Grid>
            <Grid item xs={12} md={5}>
              <Transactions />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
