import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import avisService from "./avisServices";

export const getallAvis = createAsyncThunk(
  "avis/getallAvis",
  async (thunkAPI) => {
    try {
      return await avisService.getallAvis();
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des avis');
    }
  }
);

export const createAvis = createAsyncThunk(
  "avis/createAvis",
  async (addAvis, thunkAPI) => {
    try {
      return await avisService.createAvis(addAvis);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAvis = createAsyncThunk(
  "avis/deleteAvis",
  async (id, thunkAPI) => {
    try {
      return await avisService.deleteAvis(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  allavis: [], // Utilisez 'allavis' au lieu de 'avis'
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};


export const avisSlice = createSlice({
  name: "avis",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getallAvis.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getallAvis.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.allavis = action.payload; // Assurez-vous que 'allavis' est correct
    })
      .addCase(getallAvis.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(createAvis.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAvis.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.avis = action.payload;
      })
      .addCase(createAvis.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(deleteAvis.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAvis.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.avis = action.payload; // Correction ici
      })
      .addCase(deleteAvis.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default avisSlice.reducer;
