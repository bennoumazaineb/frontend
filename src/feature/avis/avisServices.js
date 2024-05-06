import axios from "axios";
import { base_url } from "../../utils/baseUrl";

export const getallAvis = async () => {
  const response = await axios.get(`${base_url}avis/all`);
  return response.data;
};

export const createAvis = async (addAvis) => {
  const response = await axios.post(`${base_url}avis/register`, addAvis);
  return response.data;
};

export const deleteAvis = async (id) => {
  const response = await axios.delete(`${base_url}avis/${id}`);
  return response.data;
};

const avisService = {
    getallAvis,
    createAvis,
  deleteAvis,
};

export default avisService;
