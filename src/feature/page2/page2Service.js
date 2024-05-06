import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";
export const createPage2 = async (newPage2) => {
  try {
    console.log("Tentative de création de formulaire avec les données :", newPage2);
    const response = await axios.post(`${base_url}page2/`, newPage2);
    console.log("Réponse de la création du formulaire :", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création du formulaire:", error);
    throw error;
  }
};

export const getallPage2 = async () => {
  try {
    const response = await axios.get(`${base_url}page2/all`);
    console.log("Données récupérées avec succès :", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de tous les formulaires:", error);
    throw error; 
  }
};
export const getFormpage2 = async (Id_template, clients) => {
  try {
    const response = await axios.get(`${base_url}page2/${Id_template}/${clients}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du formulaire:", error);
    throw error;
  }
};
const deleteForm2 = async (id, config) => { // Ajout du paramètre config
  try {
    const response = await axios.delete(`${base_url}page2/${id}`, config); // Utilisation de la configuration passée en paramètre
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    throw error;
  }
};
const page2Service = {
  createPage2,
  getFormpage2,
  getallPage2,deleteForm2
};

export default page2Service;
