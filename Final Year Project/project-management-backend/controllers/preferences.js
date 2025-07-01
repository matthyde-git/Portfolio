import { getAllPreferences, getPreferences, addPreferences, deletePreferences, updateThemePreference, updateFontSizePreference, getUserPreferences } from "../models/preferences.js";

// controller for sending user requests to the preferences model

async function getPs(req, res) {
    try {
        const results = await getAllPreferences();
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

async function getP(req, res) {
    try {
        const data = req.params.preferenceid;
        const results = await getPreferences(data);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function addP(req, res) {
    try {
        const data = req.body;
        const results = await addPreferences(data);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function deleteP(req, res) {
    try {
        const data = req.body.preferenceid;
        const results = await deletePreferences(data);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function updateTheme(req, res) {
    try {
        const user = req.body.user;
        const newTheme = req.body.newTheme;
        const results = await updateThemePreference(user, newTheme);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function updateFont(req, res) {
    try {
        const user = req.body.user;
        const newFontSize = req.body.newFontSize;
        const results = await updateFontSizePreference(user, newFontSize);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function getUserPrefs(req, res) {
    try {
        const user = req.params.username;
        const results = await getUserPreferences(user);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export { getPs, getP, addP, deleteP, updateTheme, updateFont, getUserPrefs };