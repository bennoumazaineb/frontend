// page3Slice.js
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import page3Service from "./page3Service";

export const createPage3 = createAsyncThunk(
  "page3/createPage3",
  async (newPage3Data, thunkAPI) => {
    try {
      return await page3Service.createPage3(newPage3Data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Utilisation du message d'erreur seulement
    }
  }
);
export const getallPage3 = createAsyncThunk(
  "page3/getallPage3",
  async (_, thunkAPI) => {
    try {
      return await page3Service.getallPage3();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const getFormpage3 = createAsyncThunk(
  "page3/getFormpage3",
  async ({ Id_template, clients }, { rejectWithValue }) => {
    try {
      const response = await page3Service.getFormpage3(Id_template, clients);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const deleteForm3 = createAsyncThunk(
  'page3/deleteForm3',
  async (id, { rejectWithValue }) => {
    try {
      const response = await page3Service.deleteForm3(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const resetState = createAction("Reset_all");

const initialState = {
  page3: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const pageSlice = createSlice({
  name: "page3",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPage3.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPage3.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.page3 = action.payload; // Remplace `state.form` par `state.page1`
      })
      .addCase(createPage3.rejected, (state, action) => {
        console.error("Erreur lors de la création de la page :", action.payload);
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; // Utilisation de action.payload (le message d'erreur) plutôt que action.error.message
      })
      .addCase(getallPage3.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getallPage3.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.page3 = action.payload;
      })
      .addCase(getallPage3.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.error;
      })
      .addCase(getFormpage3.pending, (state) => {
        state.isLoading = true;
      })
     
      .addCase(getFormpage3.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.page3 = action.payload;
      })
      .addCase(getFormpage3.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteForm3.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteForm3.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deletedForm3 = action.payload;
      })
      .addCase(deleteForm3.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      })
      
      .addCase(resetState, () => initialState);
  },
});
export default pageSlice.reducer;
