import db from "../db/db.js";

const getAllNotifications = async () => {
    // gets all the rows from the notifications table
    const results = await db
        .select("*")
        .from("notifications");

    return results;
};

const getNotification = async (notificationid) => {
    // gets the row from the notifications table with the matching id
    const result = await db
        .select("*")
        .from("notifications")
        .where("notificationid", notificationid)

    return result;
};

const getUserNotifications = async (name) => {
    // gets all the rows from the notifications table for a user
    const results = await db
        .select("*")
        .from("notifications")
        .where("name", name)
        .orderBy([{ column: "date", order: "desc" }]);

    return results;
};

const addNotification = async (data) => {
    // adds a notification to the table
    const notification = await db("notifications")
        .insert(data)
        .then(() => {
            console.log("Notification created successfully");
        });
};

const deleteNotification = async (notificationid) => {
    // deletes a notification from the table with the matching id
    const notification = await db("notifications")
        .where("notificationid", notificationid)
        .del()

    console.log("Notification deleted successfully");
};

const deleteUserNotifications = async (name) => {
    // deletes all the notifications for a user
    const notifications = await db("notifications")
        .where("name", name)
        .del()

    console.log("Notifications deleted successfully");
}

const addUniqueNotification = async (data) => {

    // checks that the notification does not exist in the table before creating the new notification

    const notification = await db
        .select("*")
        .from("notifications")
        .where("message", data.message)
        .andWhere("name", data.name)

    if (notification.length === 0)
    {
        const newNotification = await db("notifications")
            .insert(data)
            .then(() => {
                console.log("Notification created successfully");
            });
    }
}

export { getAllNotifications, getNotification, getUserNotifications, addNotification, deleteNotification, deleteUserNotifications, addUniqueNotification };