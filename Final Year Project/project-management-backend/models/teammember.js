import db from "../db/db.js";

const getTeamMembers = async () => {
    // gets all the rows from the teammembers table
    const results = await db
        .select("*")
        .from("teammembers")
    
    return results;
};

const getProjectTeamMembers = async (projectid) => {
    // getd the row with the matching id
    const results = await db
        .select("*")
        .from("teammembers")
        .where("projectid", projectid)
        .andWhere("acceptedinvite", true);
    
    return results;
};

const addTeamMember = async (data) => {

    // invites a user to a project
    const member = await db("teammembers")
        .insert(data)
        .then(() => {
            console.log("Team Member Added Successfully");
        });

    // notifies the user that they've been invited to the project
    const notification = await db("notifications")
        .insert({
            name: data.email,
            message: "You have been invited to a project",
            date: new Date()
        })
        .then(() => {
            console.log("Notification Added Successfully");
        });
};

const removeTeamMember = async (projectid, email) => {

    // removes a user from a project
    const member = await db("teammembers")
        .where("projectid", projectid)
        .andWhere("email", email)
        .del()
    
    // unassigns the user from all of their tasks
    const tasks = await db("tasks")
        .where("projectid", projectid)
        .andWhere("assignedto", email)
        .update({
            assignedto: "Unassigned"
        });

    console.log("Team Member Removed Successfully");
};

const acceptInvite = async (projectid, email) => {
    // accepts an invitiation to a project
    const member = await db("teammembers")
        .where("projectid", projectid)
        .andWhere("email", email)
        .update({
            acceptedinvite: true
        });
};

const rejectInvite = async (projectid, email) => {
    // rejects an invitation to a project
    const member = await db("teammembers")
        .where("projectid", projectid)
        .andWhere("email", email)
        .update({
            acceptedinvite: false
        });
};

const getInvites = async (email) => {
    // gets all the user's project invites
    const invites = await db
        .select("*")
        .from("teammembers")
        .join("projects", function () {
            this.on("projects.projectid", "=", "teammembers.projectid");
        })
        .where("email", email)
        .andWhere("acceptedinvite", null)

    return invites;
}

export { getTeamMembers, getProjectTeamMembers, addTeamMember, removeTeamMember, acceptInvite, rejectInvite, getInvites };