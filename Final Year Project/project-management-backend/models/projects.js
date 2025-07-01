import db from "../db/db.js";

const getAllprojects = async () => {
    // gets all the rows from the projects table
    const results = await db
        .select("*")
        .from("projects")
    
    return results;
};

const getProject = async (projectid) => {
    // gets a row from the projects table with the matching id
    const result = await db
        .select("*")
        .from("projects")
        .where("projectid", projectid)
    
    return result;
};

const getUserProjects = async(email) => {

    // gets the ids for the projects the user has accepted invites to
    const data = await db
        .select("projectid")
        .from("teammembers")
        .where("email", email)
        .andWhere("acceptedinvite", true);

    // array for storing all the projectids in the data object
    var objectArray = [];

    for (let i = 0; i< data.length; i++)
    {
        objectArray.push(data[i].projectid);
    }

    // gets all of the projects the user is in
    const results = await db
        .select("*")
        .from("projects")
        .where((builder) =>
            builder.whereIn("projectid", objectArray))
        .orderBy([{ column: "deadline", order: "asc" }])
    
    return results;
};

const addProject = async (data) => {

    // creates a project and stores it in the table
    const project = await db("projects")
        .insert(data)
        .then(() => {
            console.log("Project created successfully");
        });

    // gets the id of the new project
    const projectid = await db
        .select("*")
        .from("projects")
        .orderBy([{ column: "projectid", order: "desc" }])
        .limit(1);

    // stores the project team leaders information in the teammembers table
    const teammember = await db("teammembers")
        .insert({
            email: data.teamleader,
            projectid: projectid[0].projectid,
            acceptedinvite: true
        });
};

// delete needs to be updated to delete all associated teammembers, tasks and files

const deleteProject = async (projectid) => {
    // deletes a project and its associated tasks, teammembers, risks and messages from the database

    const project = await db("projects")
        .where("projectid", projectid)
        .del()

    const tasks = await db("tasks")
        .where("projectid", projectid)
        .del()

    const team = await db("teammembers")
        .where("projectid", projectid)
        .del()

    const risks = await db("risks")
        .where("projectid", projectid)
        .del()

    const messages = await db("messages")
        .where("projectid", projectid)
        .del()

    console.log("Project deleted successfully");
};

const updateProject = async (data) => {
    // updates a row in the projects table with the matching id
    const project = await db("projects")
        .where("projectid", data.projectid)
        .update({
            title: data.title,
            description: data.description,
            status: data.status,
            deadline: data.deadline
        });
};

const updateProjectStatus = async (projectid, newStatus) => {
    // updates the status of the project with the matching id
    const project = await db("projects")
        .where("projectid", projectid)
        .update({
            status: newStatus
        });
};

export { getAllprojects, getProject, getUserProjects, addProject, deleteProject, updateProject, updateProjectStatus };