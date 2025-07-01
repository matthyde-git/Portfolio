import db from "../db/db.js";

const getAllTasks = async () => {
    // gets all the rows from the tasks table
    const results = await db
        .select("*")
        .from("tasks");

    return results;
};

const getTask = async (taskid) => {
    // gets a single row from the table with the matching id
    const result = await db
        .select("*")
        .from("tasks")
        .where("taskid", taskid);

    return result;
};

const getAllProjectTasks = async (projectid) => {
    // gets all the risks with the matching projectid
    const results = await db
        .select("*")
        .from("tasks")
        .where("projectid", projectid)
        .orderBy([{ column: "deadline", order: "asc" }]);

    return results;
};

const getRecentProjectTasks = async (projectid) => {
    // gets the 3 project tasks with the nearest deadlines
    const results = await db
        .select("*")
        .from("tasks")
        .where("projectid", projectid)
        .andWhereNot("status", "Done")
        .orderBy([{ column: "deadline", order: "asc" }])
        .limit(3);

    return results;
};

const getProjectTask = async (taskid, projectid) => {
    // gets the task with the matching ids
    const result = await db
        .select("*")
        .from("tasks")
        .where("projectid", projectid)
        .andWhere("taskid", taskid);

    return result;
};

const getUserTasks = async (user) => {
    // gets all the user's tasks
    const result = await db
        .select("*")
        .from("tasks")
        .where("assignedto", user)
        .andWhereNot("status", "Done");

    return result;
};

const getUserProjectTasks = async (projectid, user) => {
    // gets all the user's tasks with the matching project id
    const result = await db
        .select("*")
        .from("tasks")
        .where("projectid", projectid)
        .andWhere("assignedto", user);

    return result;
};

const addTask = async (data) => {
    // adds a new tasks to the table
    const task = await db("tasks")
        .insert({
            title: data.title,
            description: data.description,
            status: "To Do",
            assignedto: "Unassigned",
            deadline: data.deadline,
            projectid: data.projectid
        })
        .then(() => {
            console.log("Task created successfully");
        });
};

const deleteTask = async (taskid) => {
    // deletes the row with the matching id
    const task = await db("tasks")
        .where("taskid", taskid)
        .del()

    console.log("Task deleted successfully");
};

const updateTask = async (data) => {
    // updates the row with the matching id
    const task = await db("tasks")
        .where("taskid", data.taskid)
        .update({
            title: data.title,
            description: data.description,
            status: data.status,
            assignedto: data.assignedto,
            deadline: data.deadline
        });
};

const updateTaskAssignment = async (taskid, newAssignee) => {
    // updates the user assigned to the task with the matching id
    const task = await db("tasks")
        .where("taskid", taskid)
        .update({
            assignedto: newAssignee
        });
};

const updateTaskStatus = async (taskid, newStatus) => {
    // updates the status of the task with the matching id
    const task = await db("tasks")
        .where("taskid", taskid)
        .update({
            status: newStatus
        });
};

export { getAllTasks, getTask, getAllProjectTasks, getRecentProjectTasks, getProjectTask, getUserProjectTasks, getUserTasks, addTask, deleteTask, updateTask, updateTaskAssignment, updateTaskStatus };