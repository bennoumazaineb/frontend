import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import FactureService from "./factureService";

export const getAllFacture = createAsyncThunk(
    "fact/getAllFacture",
    async (thunkAPI) => {
      try {
        return await FactureService.getAllFacture();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const updateFacturePaymentStatus = createAsyncThunk(
    "fact/updateFacturePaymentStatus",
    async (id) => {
      try {
        const response = await FactureService.updateFacturePaymentStatus(id);
        return response; // Réponse de l'API après la mise à jour réussie
      } catch (error) {
        throw new Error(error.message);
      }
    }
  );


  
  
  export const createFacture = createAsyncThunk(
    "fact/createFacture",
    async (add_Facture,thunkAPI) => {
      try {
        return await FactureService.createFacture(add_Facture);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );


  export const deleteFacture = createAsyncThunk(
    "fact/deleteFacture",
    async (id,thunkAPI) => {
      try {
        return await FactureService.deleteFacture(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const resetState = createAction("Reset_all");
  const initialState = {
    fact: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  };
  export const FactureSlice = createSlice({
    name: "fact",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getAllFacture.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllFacture.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.fact = action.payload;
        })
        .addCase(getAllFacture.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })


        .addCase(createFacture.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createFacture.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.fact = action.payload;
        })
        .addCase(createFacture.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
    
        .addCase(deleteFacture.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteFacture.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.fact = action.payload;
        })
        .addCase(deleteFacture.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
      .addCase(updateFacturePaymentStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFacturePaymentStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Vous pouvez gérer les données mises à jour ici si nécessaire
      })
      .addCase(updateFacturePaymentStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
       
    },
  });
  export default FactureSlice.reducer;
