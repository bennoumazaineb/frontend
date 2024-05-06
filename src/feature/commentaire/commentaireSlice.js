import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import commentaireService from "./commentaireService";

export const getAllCommentaire = createAsyncThunk(
  "commentaire/getallCommentaire",
  async (thunkAPI) => {
    try {
      return await commentaireService.getallCommentaire();
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des commentaires');
    }
  }
);

export const createCommentaire = createAsyncThunk(
  "commentaire/createCommentaire",
  async (addCommentaire, thunkAPI) => {
    try {
      return await commentaireService.createCommentaire(addCommentaire);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCommentaire = createAsyncThunk(
  "commentaire/deleteCommentaire",
  async (id, thunkAPI) => {
    try {
      return await commentaireService.deleteCommentaire(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  commentaire: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const commentaireSlice = createSlice({
  name: "commentaire",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCommentaire.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCommentaire.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.commentaire = action.payload;
      })
      .addCase(getAllCommentaire.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(createCommentaire.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCommentaire.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.commentaire = action.payload;
      })
      .addCase(createCommentaire.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(deleteCommentaire.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCommentaire.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.commentaire = action.payload; // Correction ici
      })
      .addCase(deleteCommentaire.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default commentaireSlice.reducer;
