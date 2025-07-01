import { getAllRisks, getProjectRisks, addProjectRisk, deleteProjectRisk, updateProjectRisk, getTopRisks } from "../models/risks.js";

// controller for sending user requests to the risks model

async function getRisks(req, res) {
    try {
        const results = await getAllRisks();
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function getProjectRs(req, res) {
    try {
        const projectid = req.params.projectid;
        const results = await getProjectRisks(projectid);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
}

async function addRisk(req, res) {
    try {
        const data = req.body;
        const results = await addProjectRisk(data);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function deleteRisk(req, res) {
    try {
        const data = req.body.riskid;
        const results = await deleteProjectRisk(data);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function updateRisk(req, res) {
    try {
        const data = req.body;
        const results = await updateProjectRisk(data);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function getTopRs(req, res) {
    try {
        const projectid = req.params.projectid;
        const results = await getTopRisks(projectid);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export { getRisks, getProjectRs, addRisk, deleteRisk, updateRisk, getTopRs };