import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";



const uploadImg2 = async (data) => {
  const response = await axios.post(`${base_url}upload/page2`, data);
  return response.data;
};

const deleteImg2 = async (id) => {
  const response = await axios.delete(
    `${base_url}upload/delete-img/${id}`,

    config
  );
  return response.data;
};


const uploadService = {

  uploadImg2,

  deleteImg2
};

export default uploadService;