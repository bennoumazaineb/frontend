import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation instead of useSearchParams
import axios from 'axios';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import { base_url } from './utils/baseUrl';

function Success() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Use useLocation to access query parameters

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      const searchParams = new URLSearchParams(location.search);
      const paymentId = searchParams.get("payment_id");

      if (paymentId) {
        try {
          const token = localStorage.getItem('user');
          const currentUser = JSON.parse(token);
          const userName = currentUser ? currentUser.Nom_Prénom : '';

          const response = await axios.post(`${base_url}payment/${paymentId}`, { userName });
          console.log("Response data:", response.data);
          setResult(response.data.result?.status );
        } catch (error) {
          console.error("Failed to fetch payment status:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchPaymentStatus();
  }, [location]);

  return (
    <DashboardLayout>
    <DashboardNavbar />
    <div className='p-4'>
      {/* Rendu conditionnel en fonction du résultat du paiement */}
      {!loading && result === 'SUCCESS' ? (
        <div className="alert alert-success">Payment Successful</div>
      ) : (
        <div >En attente de verification</div>
      )}
    </div>
    <Footer />
  </DashboardLayout>
);
}

export default Success;
