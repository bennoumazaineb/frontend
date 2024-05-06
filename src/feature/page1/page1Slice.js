import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import page1Service from "./page1Service";

export const createPage1 = createAsyncThunk(
  "page1/createPage1",
  async (newPage1Data, thunkAPI) => {
    try {
      return await page1Service.createPage1(newPage1Data);
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getallPage1 = createAsyncThunk(
  "page1/getallPage1",
  async (_, thunkAPI) => {
    try {
      return await page1Service.getallPage1();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getFormpage1 = createAsyncThunk(
  "page1/getFormpage1",
  async ({ Id_template, clients }, { rejectWithValue }) => {
    try {
      const response = await page1Service.getFormpage1(Id_template, clients);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteForm1 = createAsyncThunk(
  "page1/deleteForm1",
  async (id, { rejectWithValue }) => {
    try {
      const response = await page1Service.deleteForm1(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  page1: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const pageSlice = createSlice({
  name: "page1",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPage1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPage1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.page1 = action.payload;
      })
      .addCase(createPage1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.error;
      })
      .addCase(getallPage1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getallPage1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.page1 = action.payload;
      })
      .addCase(getallPage1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.error;
      })
      .addCase(getFormpage1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFormpage1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.page1 = action.payload;
      })
      .addCase(getFormpage1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteForm1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteForm1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deletedForm1 = action.payload;
      })
      .addCase(deleteForm1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default pageSlice.reducer;
