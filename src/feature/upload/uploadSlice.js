import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

export const uploadImg = createAsyncThunk(
  "upload/images",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }
      return await uploadService.uploadImg(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const uploadImg1 = createAsyncThunk(
  "upload1/images",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }
      return await uploadService.uploadImg1(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
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
export const uploadImg3 = createAsyncThunk(
  "upload3/images",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }
      return await uploadService.uploadImg3(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const delImg = createAsyncThunk(
  "delete/images",
  async (id, thunkAPI) => {
    try {
      return await uploadService.deleteImg(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// Assurez-vous que la fonction `delImg1` est exportée de `uploadService`
export const deleteImg1 = createAsyncThunk(
  "delete1/images",
  async (id, thunkAPI) => {
    try {
      // Utilisez la fonction `delImg1` correctement depuis `uploadService`
      return await uploadService.deleteImg1(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const delImg2 = createAsyncThunk(
  "delete2/images",
  async (id, thunkAPI) => {
    try {
      return await uploadService.delImg2(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const delImg3 = createAsyncThunk(
  "delete3/images",
  async (id, thunkAPI) => {
    try {
      return await uploadService.delImg3(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  images: [],
  images1: [],
  images2: [],
  images3: [],
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
      .addCase(uploadImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = action.payload;
      })
      .addCase(uploadImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(uploadImg1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImg1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images1 = action.payload;
      })
      .addCase(uploadImg1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
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
      .addCase(uploadImg3.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImg3.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images3 = action.payload;
      })
      .addCase(uploadImg3.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(delImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = [];
      })
      .addCase(delImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteImg1.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteImg1.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images1 = [];
      })
      .addCase(deleteImg1.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(delImg2.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delImg2.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images2 = [];
      })
      .addCase(delImg2.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(delImg3.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delImg3.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images3 = [];
      })
      .addCase(delImg3.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});
export default uploadSlice.reducer;