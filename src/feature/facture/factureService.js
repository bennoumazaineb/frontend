import axios from "axios";

import { base_url } from "../../utils/baseUrl";

const getAllFacture = async () => {
  const response = await axios.get(`${base_url}facture/all/` );

  return response.data;
};

const createFacture = async (add_Facture) => {
  const response = await axios.post(`${base_url}facture/register/`,add_Facture );

  return response.data;
};



const deleteFacture = async (id) => {
  const response = await axios.delete(`${base_url}facture/${id}` );

  return response.data;
};

const updateFacturePaymentStatus = async (id) => {
  const response = await axios.put(`${base_url}facture/factures/${id}`, { Payement: 'payée' }, { Payement: 'Non payée' });
  return response.data;
};






const FactureService = {
    getAllFacture,
    createFacture,
    deleteFacture,
    updateFacturePaymentStatus,
    
   
 
  };
 
  export default FactureService;