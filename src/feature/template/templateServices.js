import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const config = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*"
  }
};

const createTemplate = async (template) => {
  try {
    const response = await axios.post(`${base_url}template/`, template);
    return response.data;

  } catch (error) {
    console.error("Erreur lors de la création de template:", error);
    throw error; 
  }
};

const getallTemplate = async () => {
  try {
    const response = await axios.get(`${base_url}template/`, config);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de tous les templates:", error);
    throw error; 
  }
};

const deleteTemplate = async (id) => {
  try {
    const response = await axios.delete(`${base_url}template/${id}`, config);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de template:", error);
    throw error; 
  }
};

const getaTemplate = async (id) => {
  try {
    const response = await axios.get(`${base_url}template/${id}`, config);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de template:", error);
    throw error; 
  }
};

const updateTemplate = async (template) => {
  const response = await axios.put(
    `${base_url}template/${template.id}`,
    { 
      Id_template: template.templateData.Id_template,
      URL: template.templateData.URL,
      images: template.templateData.images,
      Description: template.templateData.Description },
    config
  );

  return response.data;
};


const templateService = {
  createTemplate,
  getallTemplate,
  deleteTemplate,
  getaTemplate,
  updateTemplate
};

export default templateService;