import axios from "axios";

import { base_url } from "../../utils/baseUrl";

const getAllHistoriques = async () => {
  const response = await axios.get(`${base_url}historique/all-historiques/` , {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
   
    }
  });
 

  return response.data;
};
const AddHistorique = async (add_historique) => {
  const response = await axios.post(`${base_url}historique/addhistorique/` ,add_historique );
 

  return response.data;
};




 




const historiqueService = {
    getAllHistoriques,
    AddHistorique,
 
   
 
  };
 
  export default historiqueService;