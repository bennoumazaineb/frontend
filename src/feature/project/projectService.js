import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getAllProjects = async () => {
  const response = await axios.get(`${base_url}project/all-project/`);
  return response.data;
};

const addProject = async (add_Project) => {
  try {
      console.log("Tentative de création de task avec les données :", add_Project);
      const response = await axios.post(`${base_url}project/addproject/`, add_Project);
      console.log("Réponse de la création du task :", response.data);
      return response.data;
  } catch (error) {
      console.error("Erreur lors de la création du task :", error);
      throw error; // Lancez simplement l'erreur sans la modifier
  }
};

const createProjectTask = async (add_Project) => {
  try {
    console.log("Tentative de création de tâche avec les données :", add_Project);
    const response = await axios.post(`${base_url}project/addtask/`, add_Project);
    console.log("Réponse de la création de la tâche :", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de la tâche :", error);
    throw error; // Lancer simplement l'erreur sans la modifier
  }
};




const updateProject = async (add_Project) => {
  const response = await axios.put(`${base_url}project/${add_Project.id}`, add_Project);
  return response.data;
};

const deleteProject = async (id) => {
  const response = await axios.delete(`${base_url}project/${id}`);
  return response.data;
};

const getProjectById = async (id) => {
  const response = await axios.get(`${base_url}project/getAproj/${id}`);
  return response.data;
};
const getProjectCountByMonth = async () => {
  try {
    const response = await axios.get(`${base_url}project/project-count-by-month`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du nombre de projets par mois :", error);
    throw error;
  }
};

const projectService = {
  getAllProjects,
  addProject,
  updateProject,
  deleteProject,
  getProjectById,
  createProjectTask,getProjectCountByMonth

};

export default projectService;
