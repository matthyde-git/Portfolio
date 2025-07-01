import { getAllprojects, getProject, getUserProjects, addProject, deleteProject, updateProject, updateProjectStatus } from "../models/projects.js";

// controller for sending user requests to the projects model

async function getProjects(req, res) {
    try {
        const results = await getAllprojects();
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function getP(req, res) {
    try {
        const data = req.params.projectid;
        const results = await getProject(data);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function getUserPs(req, res) {
    try {
        const data = req.params.username;
        const results = await getUserProjects(data);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function addP(req, res) {
    try {
        const data = req.body;
        const results = await addProject(data);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function deleteP(req, res) {
    try {
        const data = req.body.projectid;
        const results = await deleteProject(data);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function updateP(req, res) {
    try {
        const data = req.body;
        const results = await updateProject(data);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function updateStatus(req, res) {
    try {
        const projectid = req.body.projectid;
        const newStatus = req.body.newStatus;
        const results = await updateProjectStatus(projectid, newStatus);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export { getProjects, getP, getUserPs, addP, deleteP, updateP, updateStatus };