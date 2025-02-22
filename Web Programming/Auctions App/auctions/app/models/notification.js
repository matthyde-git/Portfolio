import db from "../db/db.js"

const getAllNotifications = async () => {
    const results = await db
        .select("*")
        .from("notifications")
        .orderBy([{ column: "created_at", order: "desc"}])
        return results;
};

const addNotification = async (data) => {
    const notification = await db("notifications")
    .insert(data)
    .then(() => {
        console.log("Notification created successfully");
    });
};

const clearUsersNotifications = async (email) => {
    const results = await db("notifications")
    .where("email", email)
    .del()
    console.log("Notifications successfully cleared");
}

const deleteNotifications = async () => {
    const results = await db("notifications")
    .del()
    console.log("Notifications successfully deleted");
};

export { getAllNotifications, addNotification, clearUsersNotifications, deleteNotifications };