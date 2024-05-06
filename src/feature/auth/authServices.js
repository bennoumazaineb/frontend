

import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const login = async (user) => {
  const response = await axios.post(`${base_url}user/login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};



const createUser = async (user) => {
  try {
    const response = await axios.post(`${base_url}user/register/`, user, config);
    return response.data;
  } catch (error) {
    throw error; // Gérer les erreurs ou rejeter pour un traitement ultérieur
  }
};



const getallUsersaufemployees = async () => {
  const response = await axios.get(`${base_url}user/all-user-saufemployee/` , {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
   
    }
  });

  return response.data;
};
const getAllclients = async () => {
  const response = await axios.get(`${base_url}user/all-user-client/` , {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
   
    }
  });

  return response.data;
};
const getAdmin = async () => {
  const response = await axios.get(`${base_url}user/admin/` , {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
   
    }
  });

  return response.data;
};
const getAllpartners = async () => {
  const response = await axios.get(`${base_url}user/all-user-partner/` , {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
   
    }
  });

  return response.data;
};
const getallUsersExceptAdminAndEmployees = async () => {
  const response = await axios.get(`${base_url}user/all-user-saufemployeeAdmin/` , {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
   
    }
  });

  return response.data;
};

const getallUser = async () => {
  const response = await axios.get(`${base_url}user/all-user/` , {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
   
    }
  });

  return response.data;
};
const getAllEmps = async () => {
  const response = await axios.get(`${base_url}user/all-user-employee/` , {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
   
    }
  });

  return response.data;
};
const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${base_url}user/${id}`, config);
    return response.data;
  } catch (error) {
    // Gérer les erreurs
    throw error; // Remarque : vous pouvez choisir de gérer ou de relancer l'erreur ici
  }
};

const getUser = async (id) => {
  try {
    const response = await axios.get(`${base_url}user/${id}`, config);
    return response.data;
  } catch (error) {
    // Logger l'erreur pour un débogage futur

    // Traiter spécifiquement certaines erreurs
    
    }
  }



const updateUser = async (user) => {
  const response = await axios.put(
    `${base_url}user/${user.id}`,
    { Nom_Prénom: user.Nom_Prénom ,
     Société: user.Société ,
     email: user.email ,
    Téléphone: user.Téléphone ,
     Poste: user.Poste ,
    role: user.role ,
     Partenaire: user.Partenaire },
    config
  );

  return response.data;
};


const forgotPasswordToken = async (email) => {
  try {
    const response = await axios.post(`${base_url}user/forgot-password-token`, { email });
    return response.data;
  } catch (error) {
  
    throw error; // Lancer simplement l'erreur sans la modifier
  }
};

const resetPassword = async (password, token) => {
  try {
    const response = await axios.put(`${base_url}user/reset-password/${token}`, { password });

    return response.data;
  } catch (error) {
  
    throw error; // Propagez l'erreur pour la gérer côté client
  }
};

const logout = async () => {
  try {
    const response = await axios.get(`${base_url}user/logout`, null, config);

    // Efface les données utilisateur du localStorage après déconnexion réussie
    localStorage.removeItem("user");

    return response.data; // Vous pouvez retourner les données de réponse si nécessaires
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
    throw error; // Propagez l'erreur pour la gérer côté client
  }
};


const getAllEmployeesWithLessThanTenTasks = async () => {
  const response = await axios.get(`${base_url}user/all-user-taskemployee/` , {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
   
    }
  });

  return response.data;
};

const getClientCountByMonth = async () => {
  try {
    const response = await axios.get(`${base_url}user/clients/count-by-month`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      }
    });

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du nombre de clients par mois :', error);
    throw error; // Propagez l'erreur pour la gérer côté client
  }
};


const authService = {
  login,resetPassword,forgotPasswordToken,logout,createUser,getAllclients,getAllEmps,getAllpartners,deleteUser,getUser,updateUser,getallUser,getallUsersaufemployees
,getAllEmployeesWithLessThanTenTasks,getClientCountByMonth,getallUsersExceptAdminAndEmployees,getAdmin
};

export default authService;