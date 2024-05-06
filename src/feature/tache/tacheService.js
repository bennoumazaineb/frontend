import axios from "axios";
import { base_url } from "../../utils/baseUrl";
const createTask = async (add_task) => {
  const response = await axios.post(`${base_url}task/register/`, add_task);

  return response.data;
};


const getAllTasks = async () => {
  const response = await axios.get(`${base_url}task/all-tasks/`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    }
  });

  return response.data;
};

const getATask = async (id) => {
  const response = await axios.get(`${base_url}task/${id} `);

  return response.data;
};

const DeleteTask = async (id) => {
  const response = await axios.delete(`${base_url}task/${id}`);

  return response.data;
};
const UpdateTask = async (add_task) => {
  const response = await axios.put(`${base_url}task/${add_task.id}`,add_task );
  return response.data;
};

const updateTaskEmployee = async (taskId, employeeId) => {
  console.log(employeeId)
  const response = await axios.put(`${base_url}task/update-employee/${taskId}`, { employe: employeeId });
  return response.data;
};

const getTasksByProject = async () => {
  const response = await axios.get(`${base_url}task/project/`);
  return response.data;
};
const tasksService = {
  getAllTasks,
  createTask,
  DeleteTask,
  UpdateTask,
  getATask,
  updateTaskEmployee,getTasksByProject
};

export default tasksService;