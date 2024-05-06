import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import tasksService from "./tacheService";



export const createTask = createAsyncThunk(
  'task/createTask',
  async (taskData, thunkAPI) => {
    try {
      return await tasksService.createTask(taskData);
    } catch (error) {
      // Extraire les informations pertinentes de l'erreur
      const errorMessage = error.message;
      const errorCode = error.code;
      
      // Retourner uniquement les informations nécessaires
      return { errorMessage, errorCode };
    }
  }
);

export const getTasks = createAsyncThunk(
  "task/getTasks",
  async (_, thunkAPI) => { // Correction du paramètre manquant
    try {
      return await tasksService.getAllTasks();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTasksByProject = createAsyncThunk(
  "task/getTasksByProject",
  async (_, thunkAPI) => { // Correction du paramètre manquant
    try {
      return await tasksService.getTasksByProject();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getATask = createAsyncThunk(
  "task/getaTasks",
  async (id, thunkAPI) => { // Correction du paramètre manquant
    try {
      return await tasksService.getATask(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const DeleteTask = createAsyncThunk(
  "task/deleteTasks",
  async (id, thunkAPI) => { // Correction du paramètre manquant
    try {
      return await tasksService.DeleteTask(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const UpdateTask = createAsyncThunk(
  "task/updateTasks",
  async (add_task, thunkAPI) => { // Correction du paramètre manquant
    try {
      return await tasksService.UpdateTask(add_task);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateTaskEmployee = createAsyncThunk(
  "tasks/updateempTasks",
  async ({ taskId, employeeId }, thunkAPI) => {
    try {
      return await tasksService.updateTaskEmployee(taskId, employeeId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


    

export const resetState = createAction("Reset_all");

const initialState = {
  tasks: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  TasksByProject: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdTask = action.payload;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getTasksByProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasksByProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.TasksByProject = action.payload;
      })
      .addCase(getTasksByProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      
      .addCase(getATask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getATask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.tasks = action.payload;
      })
      .addCase(getATask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(DeleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.tasks = action.payload;
      })
      .addCase(DeleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(UpdateTask.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(UpdateTask.fulfilled, (state , action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.tasks = action.payload;
    })
    .addCase(UpdateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
    })
    .addCase(updateTaskEmployee.pending, (state) => {
      state.isLoading = true;
  })
  .addCase(updateTaskEmployee.fulfilled, (state , action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.tasks = action.payload;
  })
  .addCase(updateTaskEmployee.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
  })
  },
});

export default tasksSlice.reducer;