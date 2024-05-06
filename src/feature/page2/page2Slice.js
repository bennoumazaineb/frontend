import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import page2Service from "./page2Service";

export const createPage2 = createAsyncThunk(
  "page1/createPage2",
  async (newPage2Data, thunkAPI) => {
    try {
      return await page2Service.createPage2(newPage2Data);
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const getallPage2 = createAsyncThunk(
  "page2/getallPage2",
  async (_, thunkAPI) => {
    try {
      return await page2Service.getallPage2();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const getFormpage2 = createAsyncThunk(
  "page2/getFormpage2",
  async ({ Id_template, clients }, { rejectWithValue }) => {
    try {
      const response = await page2Service.getFormpage2(Id_template, clients);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteForm2 = createAsyncThunk(
  'page2/deleteForm2',
  async (id, { rejectWithValue }) => {
    try {
      const response = await page2Service.deleteForm2(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const resetState = createAction("Reset_all");

const initialState = {
  page2: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const pageSlice = createSlice({
  name: "page2",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(createPage2.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(createPage2.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.page2 = action.payload; // Remplace `state.form` par `state.page1`
    })
    .addCase(createPage2.rejected, (state, action) => {
      console.error("Erreur lors de la création de la page :", action.payload.error);
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.error;
  })
  .addCase(getallPage2.pending, (state) => {
    state.isLoading = true;
  })
  .addCase(getallPage2.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.page2 = action.payload;
  })
  .addCase(getallPage2.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload.error;
  })
  .addCase(getFormpage2.pending, (state) => {
    state.isLoading = true;
  })
 
  .addCase(getFormpage2.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.page2 = action.payload;
  })
  .addCase(getFormpage2.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload;
  })
  
  .addCase(deleteForm2.pending, (state) => {
    state.isLoading = true;
  })
  .addCase(deleteForm2.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.deletedForm2 = action.payload;
  })
  .addCase(deleteForm2.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.message = action.error;
  })
      .addCase(resetState, () => initialState);
  },
});
export default pageSlice.reducer;