import db from "../db/db.js";

const getAllOrders = async () => {
    const results = await db
        .select("*")
        .from("orders")
        return results;
};

const getOrder = async (id) => {
    const results = await db
        .select("*")
        .from("orders")
        .where("id", id)
        return results;
};

const addOrder = async (data) => {
    const order = await db("orders")
        .insert(data)
        .then(() => {
            console.log("Order created successfully");
        });
};

const deleteOrder = async (id) => {
    const results = await db("orders")
        .where("id", id)
        .del()
        console.log("Order successfully deleted");
};

const updateOrder = async (item, newAddress) => {
    const order = await db("orders")
    .where("item", item)
    .update({
        address: newAddress
    });
};

export { getAllOrders, getOrder, addOrder, deleteOrder, updateOrder };