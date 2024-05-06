import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import recService from "./recService";

export const getAllRecs = createAsyncThunk(
    "recs/get-recs",
    async ( thunkAPI) => {
      try {
        return await recService.getAllRecs();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);
export const getARec = createAsyncThunk(
  "recs/geta-recs",
  async (id,thunkAPI) => {
    try {
      return await recService.getARec(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addRec = createAsyncThunk(
    "recs/add-recs",
    async ( add_Rec,thunkAPI) => {
      try {
        return await recService.addRec(add_Rec);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);

export const UpdateRec = createAsyncThunk(
  "recs/up-recs",
  async (id,add_Rec, thunkAPI) => {
    try {
      return await recService.UpdateRec(id,add_Rec);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



export const deleteRec = createAsyncThunk(
  'recs/delete-rec',
  async (id, { rejectWithValue }) => {
    try {
      const response = await recService.deleteRec(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getRecCountByMonth = createAsyncThunk(
  'recs/getRecCountByMonth',
  async () => {
    try {
      const response = await recService.getRecCountByMonth();
      return response; // Retourne les données du nombre de clients par mois
    } catch (error) {
      throw error; // Gérer ou transmettre l'erreur
    }
  }
);
export const resetState = createAction("Reset_all");

const initialState = {
  recs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  RecCountByMonth: [], // Assurez-vous que cette propriété est définie dans l'état initial
};


export const recSlice = createSlice({
    name: "recs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllRecs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllRecs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.recs = action.payload;
            })
            .addCase(getAllRecs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })  
            .addCase(getARec.pending, (state) => {
              state.isLoading = true;
          })
          .addCase(getARec.fulfilled, (state, action) => {
              state.isLoading = false;
              state.isError = false;
              state.isSuccess = true;
              state.recs = action.payload;
          })
          .addCase(getARec.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.isSuccess = false;
              state.message = action.error;
          })  

            .addCase(addRec.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addRec.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.recs = action.payload;
            })
            .addCase(addRec.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

            .addCase(deleteRec.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteRec.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
            })
            .addCase(deleteRec.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })

            .addCase(UpdateRec.pending, (state) => {
              state.isLoading = true;
          })
          .addCase(UpdateRec.fulfilled, (state , action) => {
              state.isLoading = false;
              state.isError = false;
              state.isSuccess = true;
              state.updatedRec = action.payload;
          })
          .addCase(UpdateRec.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.isSuccess = false;
              state.message = action.error;
          })
          .addCase(getRecCountByMonth.pending, (state) => {
            state.isLoading = true;
          })
          // Ajouter le cas pour getClientCountByMonth.fulfilled
          .addCase(getRecCountByMonth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.RecCountByMonth = action.payload; // Mettre à jour les données du nombre de clients par mois dans l'état
          })
          // Ajouter le cas pour getClientCountByMonth.rejected
          .addCase(getRecCountByMonth.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
          })
           
    },
});

export default recSlice.reducer;