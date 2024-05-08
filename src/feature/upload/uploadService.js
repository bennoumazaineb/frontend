import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";


const uploadImg = async (data) => {
  const response = await axios.post(`${base_url}upload/`, data, config);
  return response.data;
};
const uploadImg1 = async (data) => {
  const response = await axios.post(`${base_url}upload/template`, data, config);
  return response.data;
};
const uploadImg2 = async (data) => {
  const response = await axios.post(`${base_url}upload/page2`, data);
  return response.data;
};
const deleteImg = async (id) => {
  const response = await axios.delete(
    `${base_url}upload/delete-img/${id}`,

    config
  );
  return response.data;
};
const deleteImg1 = async (id) => {
  const response = await axios.delete(
    `${base_url}upload/delete-img/${id}`,

    config
  );
  return response.data;
};
const deleteImg2 = async (id) => {
  const response = await axios.delete(
    `${base_url}upload/delete-img/${id}`,

    config
  );
  return response.data;
};
const deleteImg3 = async (id) => {
  const response = await axios.delete(
    `${base_url}upload/delete-img/${id}`,

    config
  );
  return response.data;
};

const uploadImg3 = async (data) => {
  const response = await axios.post(`${base_url}upload/page3`, data, config);
  return response.data;
};
const uploadService = {
  uploadImg,
  uploadImg2,
  deleteImg,
  uploadImg1,
  deleteImg2,
  uploadImg3,
  deleteImg3,
  deleteImg1
};

export default uploadService;