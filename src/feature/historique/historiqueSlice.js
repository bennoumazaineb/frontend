import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import historiqueService from "./historiqueService";

export const getAllHistoriques = createAsyncThunk(
    "historiques/get-historiques",
    async (thunkAPI) => {
      try {
        return await historiqueService.getAllHistoriques();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );




  export const AddHistorique = createAsyncThunk(
    "historiques/add-historiques",
    async (add_historique,thunkAPI) => {
      try {
        return await historiqueService.AddHistorique(add_historique);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );





  export const resetState = createAction("Reset_all");
  const initialState = {
    historiques: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  };

  export const historiqueSlice = createSlice({
    name: "historiques",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getAllHistoriques.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllHistoriques.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.historiques = action.payload;
        })
        .addCase(getAllHistoriques.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })

       
         
          .addCase(AddHistorique.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(AddHistorique.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.historiques = action.payload;
        })
        .addCase(AddHistorique.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })


         

        },
    });
 
   
   
    export default historiqueSlice.reducer;
