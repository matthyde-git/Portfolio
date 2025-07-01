import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import projectsReducer from "./features/projects/projectSlice";
import notificationsReducer from "./features/notifications/notificationSlice";
import tasksReducer from "./features/tasks/taskSlice.js";
import teamMemberReducer from "./features/teammembers/teamMemberSlice.js";
import fileReducer from "./features/files/fileSlice.js";
import preferenceReducer from "./features/preferences/preferenceSlice.js";
import risksReducer from "./features/risks/riskSlice.js";
import messagesReducer from "./features/messages/messageSlice.js";

// contains the apps main component states, persists them so they are not lost on page refreshes

const reducers = combineReducers({
    projects: projectsReducer,
    notifications: notificationsReducer,
    tasks: tasksReducer,
    team: teamMemberReducer,
    files: fileReducer,
    preferences: preferenceReducer,
    risks: risksReducer,
    messages: messagesReducer
});

const persitConfig = {
    key: "root",
    storage
};

const persistedReducer = persistReducer(persitConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer
});