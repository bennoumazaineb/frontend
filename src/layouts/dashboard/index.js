import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects, getProjectCountByMonth } from '../../feature/project/projectSlice';
import { getTasks } from '../../feature/tache/tacheSlice';
import DashboardLayout from '../../examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from '../../examples/Navbars/DashboardNavbar';
import Footer from '../../examples/Footer';
import { Grid } from '@mui/material';
import MDBox from '../../components/MDBox';
import ComplexStatisticsCard from '../../examples/Cards/StatisticsCards/ComplexStatisticsCard';
import ReportsBarChart from '../../examples/Charts/BarCharts/ReportsBarChart';
import ReportsLineChart from '../../examples/Charts/LineCharts/ReportsLineChart';
import Projects from '../../layouts/dashboard/components/Projects';
import OrdersOverview from '../../layouts/dashboard/components/OrdersOverview';
import reportsLineChartData from '../../layouts/dashboard/data/reportsLineChartData';
import { getEmps, getPartners, getClients, getClientCountByMonth } from 'feature/auth/authSlice';
import { getRecCountByMonth } from 'feature/reclamation/recSlice';

function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getTasks());
    dispatch(getClients());
    dispatch(getPartners());
    dispatch(getEmps());
    dispatch(getClientCountByMonth());
    dispatch(getProjectCountByMonth());
    dispatch(getRecCountByMonth());
   
  }, [dispatch]);
 
  const RecCountByMonth = useSelector((state) => state.rec.RecCountByMonth);


  const projectCountsByMonth = useSelector((state) => state.project.projectCountsByMonth);
  const clientCountsByMonth = useSelector((state) => state.auth.clientCountsByMonth);
  const projectState = useSelector((state) => state.project.projects);
  const empState = useSelector((state) => state.auth.emps);
  const partnerState = useSelector((state) => state.auth.partners);
  const clientState = useSelector((state) => state.auth.clients);

  const projectCount = projectState?.length || 0;
  const employeeCount = empState?.length || 0;
  const partnerCount = partnerState?.length || 0;
  const clientCount = clientState?.length || 0;
  
  const allMonths = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const countsByMonth = allMonths.map(monthAbbrev => {
    const monthData = clientCountsByMonth ? clientCountsByMonth.find(item => item.month === monthAbbrev) : undefined;
    const count = monthData ? monthData.count : 0;
    return { month: monthAbbrev, count: count };
  });

  const countsByMonth1 = allMonths.map(monthAbbrev => {
    const monthData = projectCountsByMonth ? projectCountsByMonth.find(item => item.month === monthAbbrev) : undefined;
    const count = monthData ? monthData.count : 0;
    return { month: monthAbbrev, count: count };
  });

  const countsByMonth2= allMonths.map(monthAbbrev => {
    const monthData = RecCountByMonth ? RecCountByMonth.find(item => item.month === monthAbbrev) : undefined;
    const count = monthData ? monthData.count : 0;
    return { month: monthAbbrev, count: count };
  }); 
  const token = localStorage.getItem("user");

  const userRole = token ? JSON.parse(token).role : null;
  const userName = token ? JSON.parse(token).Nom_Prénom : null;
  const userName1 = token ? JSON.parse(token)._id : null;
  const isAdmin = userRole === "admin";
  const isEmployee = userRole === "employee";
  const isClient = userRole === "client";
  const isPartner = userRole === "partner";
  const labels = countsByMonth.map(item => item.month);
  const data = countsByMonth.map(item => item.count);
  const data1 = countsByMonth1.map(item => item.count);
  const data2 = countsByMonth2.map(item => item.count);
  const [colorMap, setColorMap] = useState({});
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Nombre Total des clients",
        data: data,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const salesData = {
    labels: labels,
    datasets: [
      {
        label: "Nombre Total des projets",
        data: data1,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };
  const RecData = {
    labels: labels,
    datasets: [
      {
        label: "Nombre Total des Réclamations",
        data: data2,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {/* Statistiques complexes */}
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="secondary"
                icon="airplay"
                title="Projects"
                count={projectCount}
                percentage={{ color: 'success', amount: '', label: '' }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="engineeringOutlined"
                title="Employées"
                count={employeeCount}
                percentage={{ color: 'success', amount: '', label: '' }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="groupsTwoTone"
                title="Partenaires"
                count={partnerCount}
                percentage={{ color: 'success', amount: '', label: '' }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="contacts"
                title="Clients"
                count={clientCount}
                percentage={{ color: 'success', amount: '', label: '' }}
              />
            </MDBox>
          </Grid>

          {/* Graphiques */}
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsBarChart
                color="info"
                title="Nombre Total Des Clients"
                description="Par mois"
                chart={chartData}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsBarChart
                color="success"
                title="Nombre Total des Projets"
                description="Par mois"
                date=""
                chart={salesData}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsBarChart
                color="dark"
                title="Nombre Total Des Reclamations"
                description="Par mois"
                date=""
                chart={RecData}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrdersOverview />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
