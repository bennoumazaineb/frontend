import axios from "axios";

import { base_url } from "../../utils/baseUrl";



const createReunionAndSendEmail = async (add_Reu1) => {
  const response = await axios.post(`${base_url}reu1/reunion/`,add_Reu1 );

  return response.data;
};









const Reu1Service = {

    createReunionAndSendEmail
   
 
  };
 
  export default Reu1Service;