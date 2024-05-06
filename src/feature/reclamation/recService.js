import axios from "axios";
import { base_url } from "../../utils/baseUrl";

// Définition des en-têtes communs pour toutes les requêtes
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  "Access-Control-Allow-Origin": "*"
};

export const getAllRecs = async () => {
  try {
    const response = await axios.get(`${base_url}rec/all-rec/`, { headers });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getARec = async (id) => {
  try {
    const response = await axios.get(`${base_url}rec/${id}`,{ headers });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};



export const addRec = async (add_Rec) => {
  try {
    const response = await axios.post(`${base_url}rec/addrec/`, add_Rec,{ headers });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteRec = async (id) => {
  try {
    const response = await axios.delete(`${base_url}rec/${id}`, { headers });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const UpdateRec = async (add_Rec) => {
  console.log(add_Rec)
  try {
    const response = await axios.put(`${base_url}rec/${add_Rec.id}`,add_Rec);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getRecCountByMonth = async () => {
  try {
    const response = await axios.get(`${base_url}rec/all-rec-month`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      }
    });

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du nombre de Rec par mois :', error);
    throw error; // Propagez l'erreur pour la gérer côté client
  }
};

const recService = {
  getAllRecs,
  addRec,
  deleteRec,
  UpdateRec,
  getARec,getRecCountByMonth
};

export default recService;