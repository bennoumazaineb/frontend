import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import projectService from "./projectService";

export const getProjects = createAsyncThunk(
  "projects/get-projects",
  async (_, thunkAPI) => {
    try {
      return await projectService.getAllProjects();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addProject = createAsyncThunk(
  "project/add-project",
  async (add_Project, thunkAPI) => {
    try {
      const response = await projectService.addProject(add_Project);
      return response;
    } catch (error) {
      // Gérer l'erreur ici et retourner une valeur sérialisable
      const errorMessage = error.message || "Une erreur s'est produite";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
export const createProjectTask = createAsyncThunk(
  "project/createProjectTask",
  async (add_Project, thunkAPI) => {
    try {
      const response = await projectService.createProjectTask(add_Project);
      return response; // Si la création de tâche réussit, renvoie la réponse
    } catch (error) {
      throw error; // Lancer l'erreur pour être capturée par le thunk
    }
  }
);

export const updateProject = createAsyncThunk(
  "project/update-project",
  async (add_Project, thunkAPI) => {
    try {
      const response = await projectService.updateProject(add_Project);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "project/delete-project",
  async (id, thunkAPI) => {
    try {
      const response = await projectService.deleteProject(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProjectById = createAsyncThunk(
  "project/get-project-by-id",
  async (id, thunkAPI) => {
    try {
      const response = await projectService.getProjectById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProjectCountByMonth = createAsyncThunk(
  "projects/getProjectCountByMonth",
  async (_, thunkAPI) => {
    try {
      return await projectService.getProjectCountByMonth();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const resetState = createAction("Reset_all");

const initialState = {
  projects: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  projectCountsByMonth: [],
};

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder     
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.projects = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.projects = action.payload;
      })
      .addCase(addProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createProjectTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProjectTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
    
      })
      .addCase(createProjectTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message || "Une erreur s'est produite";
      })
      .addCase(updateProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.projects = action.payload;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.projects = action.payload;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getProjectById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjectById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.projects = action.payload;
      })
      .addCase(getProjectById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })  .addCase(getProjectCountByMonth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjectCountByMonth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projectCountsByMonth = action.payload; // Mettez à jour les données du nombre de projets par mois dans l'état
      })
      .addCase(getProjectCountByMonth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      });
      
  },
});

export default projectSlice.reducer;
