import axios from "axios";

import { base_url } from "../../utils/baseUrl";

const getAllReus = async () => {
  const response = await axios.get(`${base_url}reu/all-reu/` );

  return response.data;
};

const getaReu = async (id) => {
  const response = await axios.get(`${base_url}reu/GetAReu/${id}` );

  return response.data;
};
const AddReu = async (add_Reu) => {
  const response = await axios.post(`${base_url}reu/Add-reu/`,add_Reu );

  return response.data;
};



const DeleteReus = async (id) => {
  const response = await axios.delete(`${base_url}reu/${id}` );

  return response.data;
};

const UpdateReus = async (add_Reu) => {
  const response = await axios.put(`${base_url}reu/${add_Reu.id}`,add_Reu );

  return response.data;
};



const updatePropositionRefusedToAccepted = async (id) => {
  const response = await axios.put(`${base_url}reu/propositions/${id}`, { Proposition: 'acceptée' }, { Proposition: 'refusée' });
  return response.data;
};






const ReuService = {
    getAllReus,
    AddReu,
    DeleteReus,
    getaReu,
    UpdateReus,
    updatePropositionRefusedToAccepted,
    
   
 
  };
 
  export default ReuService;