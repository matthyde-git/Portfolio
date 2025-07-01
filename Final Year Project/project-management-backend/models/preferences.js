import db from "../db/db.js";

const getAllPreferences = async () => {
    // gets all the rows from the preferences table
    const results = await db
        .select("*")
        .from("preferences")
        return results;
};

const getPreferences = async (preferenceid) => {
    // gets a preference from the table with the matching id
    const results = await db
        .select("*")
        .from("preferences")
        .where("preferenceid", preferenceid)
        return results;
};

const addPreferences = async (data) => {
    // adds a preference to the table
    const preference = await db("preferences")
        .insert(data)
        .then(() => {
            console.log("Preference created successfully");
        });
};

const deletePreferences = async (preferenceid) => {
    // deletes a preference with the matching id from the table
    const results = await db("preferences")
        .where("preferenceid", preferenceid)
        .del()
        console.log("Preference successfully deleted");
};

const updateThemePreference = async (user, newTheme) => {
    // updates a user's theme preference
    const preference = await db("preferences")
    .where("user", user)
    .update({
        theme: newTheme
    });
};

const updateFontSizePreference = async (user, newFontSize) => {
    // updates a user's font preferences
    const preference = await db("preferences")
    .where("user", user)
    .update({
        fontsize: newFontSize
    });
};

const getUserPreferences = async (user) => {
    // gets a user's preferences
    const preference = await db
        .select("*")
        .from("preferences")
        .where("user", user)
    
    return preference;    
}

export { getAllPreferences, getPreferences, addPreferences, deletePreferences, updateThemePreference, updateFontSizePreference, getUserPreferences };