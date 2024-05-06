import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios'; // Importez axios ici
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import { base_url } from './utils/baseUrl';

function Success() {
  const [searchParams] = useSearchParams();
  const [result, setResult] = useState('');
  const dispatch = useDispatch(); // Vous pouvez utiliser useDispatch si nécessaire

  useEffect(() => {
    console.log("Payment ID:", searchParams.get("payment_id")); // Ajout d'un console.log pour afficher l'ID de paiement
    axios
      .post(`${base_url}payment/${searchParams.get("payment_id")}`)
      .then((res) => {
        console.log("Response data:", res.data); // Ajout d'un console.log pour afficher la réponse de l'API
        setResult(res.data.result.status);
      })
      .catch((err) => console.error(err));
  }, []); // Déclenchez l'effet lorsque searchParams change

  return (
  
    <DashboardLayout>
    <DashboardNavbar />
    <div className='p-4'>
      <React.Fragment>
        {result === 'SUCCESS' && (
          <div className="alert alert-success">Success</div>
        )}
      </React.Fragment>
    </div>
    <Footer />
  </DashboardLayout>
);
}

export default Success;
