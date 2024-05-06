// page3Service.js
import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";
const createPage3 = async (newPage3) => {
  try {
      console.log("Tentative de création de formulaire avec les données :", newPage3);
      const response = await axios.post(`${base_url}page3/`, newPage3);
      console.log("Réponse de la création du formulaire :", response.data);
      return response.data;
  } catch (error) {
      console.error("Erreur lors de la création du formulaire :", error);
      throw error; // Lancez simplement l'erreur sans la modifier
  }
};
export const getallPage3 = async () => {
  try {
    const response = await axios.get(`${base_url}page3/all`);
    console.log("Données récupérées avec succès :", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de tous les formulaires:", error);
    throw error; 
  }
};
export const getFormpage3 = async (Id_template, clients) => {
  try {
    const response = await axios.get(`${base_url}page3/${Id_template}/${clients}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du formulaire:", error);
    throw error;
  }
};
const deleteForm3 = async (id, config) => { // Ajout du paramètre config
  try {
    const response = await axios.delete(`${base_url}page3/${id}`, config); // Utilisation de la configuration passée en paramètre
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    throw error;
  }
};
const page3Service = {
  createPage3,
  getFormpage3,
  getallPage3,deleteForm3
};

export default page3Service;
