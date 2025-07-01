import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PROJECTS_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_GET_USER_PROJECTS_URL
        : import.meta.env.VITE_PRODUCTION_GET_USER_PROJECTS_URL;

const SINGLE_PROJECT_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_GET_SINGLE_PROJECT_URL
        : import.meta.env.VITE_PRODUCTION_GET_SINGLE_PROJECT_URL;

const initialState = {
    email: "",
    projects : [],
    singleProject: [],
    isLoading: true,
}

export const fetchUserProjects = createAsyncThunk(
    // fetches all the projects the user is a member of
    "projects/fetchUserProjects",
    async (name, thunkAPI) => {
        try {
            const response = await axios.get(PROJECTS_URL + sessionStorage.getItem("username"));
            return response.data;
        } catch (error) {
            // console.log(error);
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

export const fetchSingleProject = createAsyncThunk(
    // fetches the project info for a single project
    "projects/fetchSingleProject",
    async (name, thunkAPI) => {
        try {
            const projectid = sessionStorage.getItem("projectid");
            const response = await axios.get((SINGLE_PROJECT_URL + projectid));
            return response.data;
        } catch (error) {
            // console.log(error);
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

const projectSlice = createSlice({
    // stores the results of the fetch functions as arrays in the state values
    name: "projects",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserProjects.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUserProjects.fulfilled, (state, action) => {
            state.isLoading = false;
            state.email = sessionStorage.getItem("username");
            state.projects = action.payload;
        });
        builder.addCase(fetchUserProjects.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(fetchSingleProject.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchSingleProject.fulfilled, (state, action) => {
            state.isLoading = false;
            state.singleProject = action.payload;
        });
        builder.addCase(fetchSingleProject.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export default projectSlice.reducer;