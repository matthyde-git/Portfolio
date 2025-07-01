import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TEAM_URL = 
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_GET_PROJECT_TEAM_URL
        : import.meta.env.VITE_PRODUCTION_GET_PROJECT_TEAM_URL;

const INVITES_URL = 
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_GET_TEAM_INVITES_URL
        : import.meta.env.VITE_PRODUCTION_GET_TEAM_INVITES_URL;

const initialState = {
    team: [],
    invites: [],
    isLoading: true,
}

export const fetchTeamMembers = createAsyncThunk(
    // fetches all the team members for a project
    "teammembers/fetchTeamMembers",
    async (name, thunkAPI) => {
        try {
            const response = await axios.get(TEAM_URL + sessionStorage.getItem("projectid"));
            return response.data;
        } catch (error) {
            // console.log(error);
            return thunkAPI.rejectWithValue(error.response);
        } 
    }
);

export const fetchInvites = createAsyncThunk(
    // fetches all the invitations a user has received for a project
    "teammembers/fetchInvites",
    async (name, thunkAPI) => {
        try {
            const response = await axios.get(INVITES_URL + sessionStorage.getItem("username"));
            return response.data;
        } catch (error) {
            // console.log(error);
            return thunkAPI.rejectWithValue(error.response);
        } 
    }
);

const teamMemberSlice = createSlice({
    // stores the results of the fetch functions as arrays in the state values
    name: "team",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTeamMembers.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchTeamMembers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.team = action.payload;
        });
        builder.addCase(fetchTeamMembers.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(fetchInvites.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchInvites.fulfilled, (state, action) => {
            state.isLoading = false;
            state.invites = action.payload;
        });
        builder.addCase(fetchInvites.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export default teamMemberSlice.reducer;