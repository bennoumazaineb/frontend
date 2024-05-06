import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

export const createPage1 = async (newPage1) => {
  try {
    console.log("Tentative de création de formulaire avec les données :", newPage1);
    const response = await axios.post(`${base_url}page1/`, newPage1);
    console.log("Réponse de la création du formulaire :", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création du formulaire:", error);
    throw error;
  }
};

export const getallPage1 = async () => {
  try {
    const response = await axios.get(`${base_url}page1/all`);

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de tous les formulaires:", error);
    throw error; 
  }
};

export const getFormpage1 = async (Id_template, clients) => {
  try {
    const response = await axios.get(`${base_url}page1/${Id_template}/${clients}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du formulaire:", error);
    throw error;
  }
};


const deleteForm1 = async (id, config) => { // Ajout du paramètre config
  try {
    const response = await axios.delete(`${base_url}page1/${id}`, config); // Utilisation de la configuration passée en paramètre
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    throw error;
  }
};

const page1Service = {
  createPage1,
  getallPage1,
  getFormpage1 ,
  deleteForm1// Ajout de l'export de la fonction getFormpage1
};

export default page1Service;
