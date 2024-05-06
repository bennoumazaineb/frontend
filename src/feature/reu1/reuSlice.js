import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import ReuService from "./reuService";



  // Action asynchrone pour créer une réunion et envoyer un email
export const createReunionAndSendEmail = createAsyncThunk(
  "reus/createReunionAndSendEmail",
  async (add_Reu1, thunkAPI) => {
    try {
      const response = await ReuService.createReunionAndSendEmail(add_Reu1);
      return response; // Utilisez directement la réponse de l'API
    } catch (error) {
      console.error('Erreur dans createReunionAndSendEmail:', error);
      throw error; // Renvoyer l'erreur pour la gestion dans Redux
    }
  }
);
  
  
  
  export const resetState = createAction("Reset_all");
  const initialState = {
    reus: [],
    ReunionAndSendEmail:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  };
  export const Reu1Slice = createSlice({
    name: "reus",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      
        .addCase(createReunionAndSendEmail.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createReunionAndSendEmail.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.reus = action.payload; // Mettez à jour l'état avec la réponse de l'API
        })
        .addCase(createReunionAndSendEmail.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.errorMessage = action.error.message; // Capturer le message d'erreur
        })
        
       
    },
  });
  export default Reu1Slice.reducer;
