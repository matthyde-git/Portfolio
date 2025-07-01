import { getTeamMembers, getProjectTeamMembers, addTeamMember, removeTeamMember, acceptInvite, rejectInvite, getInvites } from "../models/teammember.js";

// controller for sending user requests to the teammembers model

async function getAllTeamMembers(req, res) {
    try {
        const results = await getTeamMembers();
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function getProjectMembers(req, res) {
    try {
        const projectid = req.params.projectid;
        const results = await getProjectTeamMembers(projectid);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function addMember(req, res) {
    try {
        const data = req.body;
        const result = await addTeamMember(data);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function removeMember(req, res) {
    try {
        const projectid = req.body.projectid;
        const email = req.body.email;
        const result = await removeTeamMember(projectid, email);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function accept(req, res) {
    try {
        const projectid = req.body.projectid;
        const email = req.body.email;
        const result = await acceptInvite(projectid, email);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function reject(req, res) {
    try {
        const projectid = req.body.projectid;
        const email = req.body.email;
        const result = await rejectInvite(projectid, email);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function getIs(req, res) {
    try {
        const email = req.params.email;
        const result = await getInvites(email);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export { getAllTeamMembers, getProjectMembers, addMember, removeMember, accept, reject, getIs };