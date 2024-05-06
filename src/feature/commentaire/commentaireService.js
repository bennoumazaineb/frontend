import axios from "axios";
import { base_url } from "../../utils/baseUrl";

export const getallCommentaire = async () => {
  const response = await axios.get(`${base_url}commentaire/all`);
  return response.data;
};

export const createCommentaire = async (addCommentaire) => {
  const response = await axios.post(`${base_url}commentaire/register`, addCommentaire);
  return response.data;
};

export const deleteCommentaire = async (id) => {
  const response = await axios.delete(`${base_url}commentaire/${id}`);
  return response.data;
};

const commentaireService = {
  getallCommentaire,
  createCommentaire,
  deleteCommentaire,
};

export default commentaireService;
