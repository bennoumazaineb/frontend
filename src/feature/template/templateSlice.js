import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import templateService from "./templateServices";
export const createTemplate = createAsyncThunk(
  "template/createTemplate",
  async (templateData, thunkAPI) => {
    try {
      return await templateService.createTemplate(templateData);
    } catch (error) {
      // Utilisation de rejectWithValue pour renvoyer une valeur et une erreur
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getallTemplate = createAsyncThunk(
  "template/getallTemplate",
  async (thunkAPI) => {
    try {
      return await templateService.getallTemplate();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const deleteTemplate = createAsyncThunk(
  'template/deleteTemplate',
  async (id, { rejectWithValue }) => {
    try {
      const response = await templateService.deleteTemplate(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getaTemplate = createAsyncThunk(
  "template/getaTemplate",
  async (id, thunkAPI) => {
    try {
      return await templateService.getaTemplate(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateTemplate = createAsyncThunk(
  "template/updateTemplate",
  async (template, thunkAPI) => {
    try {
      return await templateService.updateTemplate(template);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");
const initialState = {
  template: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const templateSlice = createSlice({
  name: "template",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTemplate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTemplate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.template = action.payload;
      })
      .addCase(createTemplate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.error;
      })
      .addCase(getallTemplate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getallTemplate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.template = action.payload;
      })
      .addCase(getallTemplate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteTemplate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTemplate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedTemplate = action.payload;
      })
      .addCase(deleteTemplate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getaTemplate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getaTemplate.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.TemplateByUser = action.payload;
        state.message = "success";
      })
      .addCase(getaTemplate.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(updateTemplate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTemplate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedTemplate = action.payload;
      })
      .addCase(updateTemplate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
    
      .addCase(resetState, () => initialState);
  },
});

export default templateSlice.reducer;