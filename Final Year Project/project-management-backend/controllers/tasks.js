import { getAllTasks, getTask, getAllProjectTasks, getRecentProjectTasks, getProjectTask, getUserProjectTasks, getUserTasks, addTask, deleteTask, updateTask, updateTaskAssignment, updateTaskStatus } from "../models/tasks.js";

// controller for sending user requests to the tasks model

async function getTs(req, res) {
    try {
        const results = await getAllTasks();
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function getT(req, res) {
    try {
        const data = req.params.taskid;
        const result = await getTask(data);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function getProjectTs(req, res) {
    try {
        const projectid = req.params.projectid;
        const results = await getAllProjectTasks(projectid);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function getRecentProjectTs(req, res) {
    try {
        const projectid = req.params.projectid;
        const results = await getRecentProjectTasks(projectid);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function getProjectT(req, res) {
    try {
        const taskid = req.params.taskid;
        const projectid = req.params.projectid;
        const result = await getProjectTask(taskid, projectid);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function getUserProjectT(req, res) {
    try {
        const projectid = req.body.projectid;
        const user = req.body.user;
        const result = await getUserProjectTasks(projectid, user);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function getUserT(req, res) {
    try {
        const user = req.params.username;
        const result = await getUserTasks(user);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function addT(req, res) {
    try {
        const data = req.body;
        const result = await addTask(data);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function deleteT(req, res) {
    try {
        const data = req.body.taskid;
        const result = await deleteTask(data);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function updateT(req, res) {
    try {
        const data = req.body;
        const result = await updateTask(data);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function updateAssignment(req, res) {
    try {
        const taskid = req.body.taskid;
        const newAssignee = req.body.newAssignee;
        const results = await updateTaskAssignment(taskid, newAssignee);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function updateStatus(req, res) {
    try {
        const taskid = req.body.taskid;
        const newStatus = req.body.newStatus;
        const results = await updateTaskStatus(taskid, newStatus);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export { getTs, getT, getProjectTs, getProjectT, getRecentProjectTs, getUserProjectT, getUserT, addT, deleteT, updateT, updateStatus, updateAssignment };