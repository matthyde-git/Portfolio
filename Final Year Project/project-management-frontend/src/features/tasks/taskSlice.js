import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USER_TASKS_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_GET_USER_TASKS_URL
        : import.meta.env.VITE_PRODUCTION_GET_USER_TASKS_URL;  

const PROJECT_TASKS_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_GET_PROJECT_TASKS_URL
        : import.meta.env.VITE_PRODUCTION_GET_PROJECT_TASKS_URL;

const USER_PROJECT_TASKS_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_GET_USER_PROJECT_TASKS_URL
        : import.meta.env.VITE_PRODUCTION_GET_USER_PROJECT_TASKS_URL;

const RECENT_PROJECT_TASKS_URL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_GET_RECENT_PROJECT_TASKS_URL
        : import.meta.env.VITE_PRODUCTION_GET_RECENT_PROJECT_TASKS_URL;

const initialState = {
    name: "",
    userTasks: [],
    userProjectTasks: [],
    projectTasks: [],
    recentProjectTasks: [],
    isLoading: true,
}

export const fetchUserTasks = createAsyncThunk(
    // fetches all the tasks the user is asigned to
    "tasks/fetchUserTasks",
    async (name, thunkAPI) => {
        try {
            const response = await axios.get(USER_TASKS_URL + sessionStorage.getItem("username"));
            return response.data;
        } catch (error) {
            // console.log(error);
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

export const fetchProjectTasks = createAsyncThunk(
    // fetches all the tasks for a project
    "tasks/fetchProjectTasks",
    async (name, thunkAPI) => {
        try {
            const response = await axios.get(PROJECT_TASKS_URL + sessionStorage.getItem("projectid"));
            return response.data;
        } catch (error) {
            // console.log(error);
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

export const fetchRecentTasks = createAsyncThunk(
    // fetches the 3 most tasks with the nearest deadlines
    "tasks/fetchRecentTasks",
    async (name, thunkAPI) => {
        try {
            const response = await axios.get(RECENT_PROJECT_TASKS_URL + sessionStorage.getItem("projectid"));
            return response.data;
        } catch (error) {
            // console.log(error);
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

const taskSlice = createSlice({
    // stores the results of the fetch functions as arrays in the state values
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserTasks.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUserTasks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.name = sessionStorage.getItem("username");
            state.userTasks = action.payload;
        });
        builder.addCase(fetchUserTasks.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(fetchProjectTasks.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchProjectTasks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.projectTasks = action.payload;
        });
        builder.addCase(fetchProjectTasks.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(fetchRecentTasks.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchRecentTasks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.recentProjectTasks = action.payload;
        });
        builder.addCase(fetchRecentTasks.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export default taskSlice.reducer;