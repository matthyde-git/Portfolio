import db from "../db/db.js";

const getAllRisks = async () => {
    // gets all the rows from the risks table
    const risks = await db
        .select("*")
        .from("risks")

    return risks;
}

const getProjectRisks = async (projectid) => {
    // gets the project risk from the table with the matching id
    const risks = await db
        .select("*")
        .from("risks")
        .where("projectid", projectid)
        .orderBy([{ column: "priority", order: "desc" }])

    return risks;
};

const addProjectRisk = async (data) => {
    // adds a risk to the table
    const risk = await db("risks")
        .insert(data)
        .then(() => {
            console.log("Risk added successfully");
    });
};

const deleteProjectRisk = async (riskid) => {
    // deletes a row from the table with the matching id
    const risk = await db("risks")
        .where("riskid", riskid)
        .del();
        console.log("Risk deleted successfully");
};

const getTopRisks = async (projectid) => {
    // gets 3 risks with the highest priorities
    const risks = await db
        .select("*")
        .from("risks")
        .where("projectid", projectid)
        .orderBy([{ column: "priority", order: "desc" }])
        .limit(3);

    return risks;
}

const updateProjectRisk = async (data) => {
    // updates the risk with the matching id
    const risk = await db("risks")
        .where("riskid", data.riskid)
        .update({
            title: data.title,
            category: data.category,
            impact: data.impact,
            impactlevel: data.impactlevel,
            likelihood: data.likelihood,
            control: data.control,
            response: data.response,
            priority: data.priority
        })
};

export { getAllRisks, getProjectRisks, addProjectRisk, deleteProjectRisk, updateProjectRisk, getTopRisks };