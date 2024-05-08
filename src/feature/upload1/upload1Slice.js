import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from "./upload1Service";



export const uploadImg2 = createAsyncThunk(
  "upload2/images",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }
      return await uploadService.uploadImg2(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



export const deleteImg2 = createAsyncThunk(
  "delete2/images",
  async (id, thunkAPI) => {
    try {
      return await uploadService.deleteImg2(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {

  images2: [],

  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const uploadSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    
      .addCase(uploadImg2.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImg2.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images2 = action.payload;
      })
      .addCase(uploadImg2.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
   
     
     
      .addCase(deleteImg2.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images2 = [];
      })
      .addCase(deleteImg2.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
     
  },
});
export default uploadSlice.reducer;