import express from 'express';
import cors from "cors";

import ContactsRouter from "./routes/contact.js";
import PaymentsRouter from "./routes/payment.js";
import AuctionsRouter from "./routes/auction.js";
import BidsRouter from "./routes/bid.js";
import NotificationsRouter from "./routes/notification.js";
import OrdersRouter from "./routes/order.js";

const app = express();
const port = 5005;

// middleware
app.use(express.json());
app.use(cors());

// contact routes
app.use("/api/contact", ContactsRouter);
app.get("/api/contact/:id", ContactsRouter);
app.post("/api/contact/add", ContactsRouter);
app.delete("/api/contact/", ContactsRouter);

// payment routes
app.use("/api/payment", PaymentsRouter);
app.get("/api/payment/:id", PaymentsRouter);
app.post("/api/payment/add", PaymentsRouter);
app.delete("/api/payment/", PaymentsRouter);

// auction routes
app.use("/api/auction", AuctionsRouter);
app.get("/api/auction/:id", AuctionsRouter);
app.post("/api/auction/add", AuctionsRouter);
app.delete("/api/auction/", AuctionsRouter);
app.post("/api/auction/update", AuctionsRouter);
app.get("/api/auction/info", AuctionsRouter);
app.post("/api/auction/notified", AuctionsRouter);

// bid routes
app.use("/api/bid", BidsRouter);
app.post("/api/bid/add", BidsRouter);
app.delete("/api/bid/", BidsRouter);

// notification routes
app.use("/api/notification", NotificationsRouter);
app.post("/api/notification/add", NotificationsRouter);
app.post("/api/notification/clear", NotificationsRouter);
app.delete("/api/notification/", NotificationsRouter);

// orders routes
app.use("/api/order", OrdersRouter);
app.get("/api/order/:id", OrdersRouter);
app.post("/api/order/add", OrdersRouter);
app.delete("/api/order/", OrdersRouter);
app.post("/api/order/update", OrdersRouter);

app.use((req, res) => {
    res.status(400).send("Bad Request. Route not found");
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});