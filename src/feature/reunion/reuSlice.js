import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import ReuService from "./reuService";

export const getReus = createAsyncThunk(
    "reus/getReus",
    async (thunkAPI) => {
      try {
        return await ReuService.getAllReus();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const getaReu = createAsyncThunk(
    "reus/getaReus",
    async (id,thunkAPI) => {
      try {
        return await ReuService.getaReu(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const UpdateReus = createAsyncThunk(
    "reus/updateReus",
    async (add_Reu,thunkAPI) => {
      try {
        return await ReuService.UpdateReus(add_Reu);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const updatePropositionRefusedToAccepted = createAsyncThunk(
    "reus/updatePropositionRefusedToAccepted",
    async (id) => {
      try {
        const response = await ReuService.updatePropositionRefusedToAccepted(id);
        return response; // Réponse de l'API après la mise à jour réussie
      } catch (error) {
        throw new Error(error.message);
      }
    }
  );


  
  
  export const AddReus = createAsyncThunk(
    "reus/AddReus",
    async (add_Reu,thunkAPI) => {
      try {
        return await ReuService.AddReu(add_Reu);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );


  export const DeleteReus = createAsyncThunk(
    "reus/DeleteReus",
    async (id,thunkAPI) => {
      try {
        return await ReuService.DeleteReus(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const resetState = createAction("Reset_all");
  const initialState = {
    reus: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  };
  export const ReuSlice = createSlice({
    name: "reus",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getReus.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getReus.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.reus = action.payload;
        })
        .addCase(getReus.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(getaReu.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getaReu.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.reus = action.payload;
        })
        .addCase(getaReu.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })

        .addCase(AddReus.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(AddReus.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.reus = action.payload;
        })
        .addCase(AddReus.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
    
        .addCase(DeleteReus.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(DeleteReus.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.reus = action.payload;
        })
        .addCase(DeleteReus.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })

        .addCase(UpdateReus.pending, (state) => {
          state.isLoading = true;
      })
      .addCase(UpdateReus.fulfilled, (state , action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.updatedRec = action.payload;
      })
      .addCase(UpdateReus.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
      })
      .addCase(updatePropositionRefusedToAccepted.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePropositionRefusedToAccepted.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Vous pouvez gérer les données mises à jour ici si nécessaire
      })
      .addCase(updatePropositionRefusedToAccepted.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
       
    },
  });
  export default ReuSlice.reducer;
