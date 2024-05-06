import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./authServices";
import { useHistory } from 'react-router-dom';
const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: [],
  clients: [],
  partners: [],
  emps: [],
  admin:[],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const getallUser = createAsyncThunk(
  "auth/get-allUser",
  async (thunkAPI) => {
    try {
      return await authService.getallUser();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getallUsersaufemployees = createAsyncThunk(
  "auth/get-allUsersaufemployees",
  async (thunkAPI) => {
    try {
      return await authService.getallUsersaufemployees();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getClients = createAsyncThunk(
  "auth/get-clients",
  async (thunkAPI) => {
    try {
      return await authService.getAllclients();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getallUsersExceptAdminAndEmployees = createAsyncThunk(
  "auth/getallUsersExceptAdminAndEmployees",
  async (thunkAPI) => {
    try {
      return await authService.getallUsersExceptAdminAndEmployees();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getPartners = createAsyncThunk(
  "auth/get-partners",
  async (thunkAPI) => {
    try {
      return await authService.getAllpartners();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAllEmployeesWithLessThanTenTasks = createAsyncThunk(
  "auth/getUsertasks",
  async ( thunkAPI) => {
    try {
      return await authService.getAllEmployeesWithLessThanTenTasks();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getEmps = createAsyncThunk(
  "auth/get-emps",
  async (thunkAPI) => {
    try {
      return await authService.getAllEmps();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAdmin = createAsyncThunk(
  "auth/getAdmin",
  async (thunkAPI) => {
    try {
      return await authService.getAdmin();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await authService.logout(); // Appel à la méthode de déconnexion
      return true; // Marquer la déconnexion comme réussie
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Gérer les erreurs ou rejeter avec un message d'erreur
    }
  }

);





export const createAllUser = createAsyncThunk(
  "auth/createUser",
  async (userData, thunkAPI) => {
    try {
      return await authService.createUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteaUser = createAsyncThunk(
  'auth/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      const response = await authService.deleteUser(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getUserByUser = createAsyncThunk(
  "auth/getUser",
  async (id, thunkAPI) => {
    try {
      return await authService.getUser(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (user, thunkAPI) => {
    try {
      return await authService.updateUser(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const forgotPasswordToken = createAsyncThunk(
  "auth/forgotPasswordToken",
  async (email, thunkAPI) => {
    try {
      return await authService.forgotPasswordToken(email);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetUserPassword = createAsyncThunk(
  "auth/resetUserPassword",
  async ({ password, token }, { rejectWithValue }) => {
    try {
      const response = await authService.resetPassword(password, token);
      return response.data; // Retourner les données de la réponse si nécessaire
    } catch (error) {
      return rejectWithValue(error); // Gérer ou transmettre l'erreur
    }
  }
);
export const getClientCountByMonth = createAsyncThunk(
  'auth/getClientCountByMonth',
  async () => {
    try {
      const response = await authService.getClientCountByMonth();
      return response; // Retourne les données du nombre de clients par mois
    } catch (error) {
      throw error; // Gérer ou transmettre l'erreur
    }
  }
);





export const resetState = createAction("Reset_all");


export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  clientCountsByMonth: [], 
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
   // Dans votre slice Redux
.addCase(login.rejected, (state, action) => {
  state.isError = true;
  state.isSuccess = false;
  state.message = action.payload.message; // Utilisez action.payload.message au lieu de action.error
  state.isLoading = false;
})

      .addCase(createAllUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAllUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdUser = action.payload;
      })
      .addCase(createAllUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getallUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getallUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getallUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })   
      .addCase(getallUsersExceptAdminAndEmployees.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getallUsersExceptAdminAndEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.usersaufempAdmin = action.payload;
      })
      .addCase(getallUsersExceptAdminAndEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      }) 
      .addCase(getallUsersaufemployees.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getallUsersaufemployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.usersaufemp = action.payload;
      })
      .addCase(getallUsersaufemployees.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      }) 
      .addCase(getClients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.clients = action.payload;
      })
      .addCase(getClients.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })   
      .addCase(getAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.admin = action.payload;
      })
      .addCase(getAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })   
      .addCase(getPartners.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPartners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.partners = action.payload;
      })
      .addCase(getPartners.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })   
      .addCase(getEmps.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmps.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.emps = action.payload;
      })
      .addCase(getEmps.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })   
      .addCase(deleteaUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteaUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCategory = action.payload;
      })
      .addCase(deleteaUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getUserByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserByUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orderbyuser = action.payload;
        state.message = "success";
      })
      .addCase(getUserByUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCategory = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
    
        // Ajouter le cas pour forgotPasswordToken.pending
        .addCase(forgotPasswordToken.pending, (state) => {
          state.isLoading = true;
        })
        // Ajouter le cas pour forgotPasswordToken.fulfilled
        .addCase(forgotPasswordToken.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.message = "Forgot password token sent successfully";
        })
        // Ajouter le cas pour forgotPasswordToken.rejected
        .addCase(forgotPasswordToken.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error.message || "Failed to send forgot password token";
        })
        .addCase(getAllEmployeesWithLessThanTenTasks.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllEmployeesWithLessThanTenTasks.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.empstasks = action.payload;
        })
        .addCase(getAllEmployeesWithLessThanTenTasks.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        }) 
        .addCase(resetUserPassword.pending, (state) => {
          // Mettre à jour l'état pendant la requête
          state.resetPasswordStatus = "loading"; // Indiquer que la réinitialisation est en cours
          state.resetPasswordError = null; // Réinitialiser l'erreur en cas de nouvelle tentative
        })
        .addCase(resetUserPassword.fulfilled, (state, action) => {
          state.resetPasswordStatus = "succeeded"; // Indiquer que la réinitialisation a réussi
        })
        .addCase(resetUserPassword.rejected, (state, action) => {
          state.resetPasswordStatus = "failed";
          state.resetPasswordError = action.error.message;
        })
        .addCase(logoutUser.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
          state.errorMessage = null;
        })
        .addCase(logoutUser.fulfilled, (state) => {
          state.isLoading = false;
          state.isError = false;
          state.user = null; // Mettre à jour l'état pour indiquer que l'utilisateur est déconnecté
          state.errorMessage = null;
         
        })
        .addCase(logoutUser.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.errorMessage = action.payload ? action.payload : 'Logout failed'; // Définir le message d'erreur en cas d'échec de déconnexion
        })
        .addCase(getClientCountByMonth.pending, (state) => {
          state.isLoading = true;
        })
        // Ajouter le cas pour getClientCountByMonth.fulfilled
        .addCase(getClientCountByMonth.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.clientCountsByMonth = action.payload; // Mettre à jour les données du nombre de clients par mois dans l'état
        })
        // Ajouter le cas pour getClientCountByMonth.rejected
        .addCase(getClientCountByMonth.rejected, (state) => {
          state.isLoading = false;
          state.isError = true;
        })
      .addCase(resetState, () => initialState);
  },
  
});
export default authSlice.reducer;
