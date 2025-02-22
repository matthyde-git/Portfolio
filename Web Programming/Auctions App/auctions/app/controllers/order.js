import { getAllOrders, getOrder, addOrder, deleteOrder, updateOrder } from "../models/order.js";

async function getOs(req, res) {
    try {
        const results = await getAllOrders();
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

async function getO(req, res) {
    try {
        const data = req.params.id;
        const results = await getOrder(data);
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

async function addO(req, res) {
    try {
        const data = req.body;
        const results = await addOrder(data);
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

async function deleteO(req, res) {
    try {
        const data = req.body.id;
        const results = await deleteOrder(data);
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

async function updateO(req, res) {
    try {
        const item = req.body.item;
        const address = req.body.address;
        console.log("controller : " + item + ", " + address);
        const results = await updateOrder(item, address);
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export { getOs, getO, addO, deleteO, updateO };