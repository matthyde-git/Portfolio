import express from "express";
import cors from "cors";
import sanitize from "perfect-express-sanitizer";
import { rateLimit } from "express-rate-limit";
import fileUpload from "express-fileupload";
import * as fs from 'fs';

import ContactsRouter from "./routes/contacts.js";
import ProjectsRouter from "./routes/projects.js";
import PreferencesRouter from "./routes/preferences.js";
import TasksRouter from "./routes/tasks.js";
import TeamMembersRouter from "./routes/teammembers.js";
import NotificationsRouter from "./routes/notifications.js";
import RisksRouter from "./routes/risks.js";
import MessagesRouter from "./routes/messages.js";

const app = express();

// to be ignored by the sanitize method
const whitelist = ["/upload", "/download/:projectid/:filename"];

// limits the number of requests per minute to mitigate dos attacks
const limiter = rateLimit({
    windowMs: 1000,
    limit: 30,
    standardHeaders: "draft-8",
    legacyHeaders: false,
})

// middleware
app.use(express.json());
app.use(cors());
app.use(limiter);
app.use(
    sanitize.clean({
        xss: true,
        noSql: true,
        sql: true
    },
        whitelist
    )
);
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

// contact routes
app.use("/api/contacts", ContactsRouter);
app.get("/api/contacts/:id", ContactsRouter);
app.post("/api/contacts/add", ContactsRouter);
app.delete("/api/contacts/", ContactsRouter);

// projects routes
app.use("/api/projects", ProjectsRouter);
app.get("/api/projects/:projectid", ProjectsRouter);
app.get("/api/projects/user/:username", ProjectsRouter);
app.post("/api/projects/add", ProjectsRouter);
app.delete("/api/projects/", ProjectsRouter);
app.post("/api/projects/update", ProjectsRouter);
app.post("/api/projects/update/status", ProjectsRouter);

// preferences routes
app.use("/api/preferences", PreferencesRouter);
app.get("/api/preferences/:preferenceid", PreferencesRouter);
app.post("/api/preferences/add", PreferencesRouter);
app.delete("/api/preferences/", PreferencesRouter);
app.post("/api/preferences/update/theme", PreferencesRouter);
app.post("/api/preferences/update/font", PreferencesRouter);
app.get("/api/preferences/user/:username", PreferencesRouter);

// tasks routes
app.use("/api/tasks", TasksRouter);
app.get("/api/tasks/:taskid", TasksRouter);
app.get("/api/tasks/project/:projectid", TasksRouter);
app.get("/api/tasks/project/recent/:projectid", TasksRouter);
app.get("/api/tasks/project/:projectid/:taskid", TasksRouter);
app.post("/api/tasks/project/usertasks", TasksRouter);
app.get("/api/tasks/user/:username", TasksRouter);
app.post("/api/tasks/add", TasksRouter);
app.delete("/api/tasks/", TasksRouter);
app.post("/api/tasks/update", TasksRouter);
app.post("/api/tasks/update/assignment", TasksRouter);
app.post("/api/tasks/update/status", TasksRouter);

// team members routes
app.use("/api/teammembers", TeamMembersRouter);
app.get("/api/teammembers/project/:projectid", TeamMembersRouter);
app.post("/api/teammembers/add", TeamMembersRouter);
app.delete("/api/teammembers/", TeamMembersRouter);
app.post("/api/teammembers/accept", TeamMembersRouter);
app.post("/api/teammembers/reject", TeamMembersRouter);
app.get("/api/teammembers/:email", TeamMembersRouter);

// notifications routes
app.use("/api/notifications", NotificationsRouter);
app.get("/api/notifications/:notificationid", NotificationsRouter);
app.get("/api/notifications/user/:username", NotificationsRouter);
app.post("/api/notifications/add", NotificationsRouter);
app.delete("/api/notifications/", NotificationsRouter);
app.delete("/api/notifications/user/delete/", NotificationsRouter);
app.post("/api/notifications/add/unique", NotificationsRouter);

// risks routes
app.use("/api/risks", RisksRouter);
app.get("/api/risks/:projectid", RisksRouter);
app.post("/api/risks/add", RisksRouter);
app.delete("/api/risks/", RisksRouter);
app.post("/api/risks/update", RisksRouter);
app.get("/api/risks/top/:projectid", RisksRouter);

// messages routes
app.use("/api/messages", MessagesRouter);
app.get("/api/messages/project/:projectid", MessagesRouter);
app.post("/api/messages/add", MessagesRouter);
app.delete("/api/messages/", MessagesRouter);
app.post("/api/messages/update", MessagesRouter);
app.get("/api/messages/recent/:projectid", MessagesRouter);
app.get("/api/messages/:messageid", MessagesRouter);

// files routes
app.post("/upload", (req, res) => {

    /* 
        Checks if a project has a directory in the file system, creates one if it does not. Rejects the upload request if no file is sent,
        if a file has been sent, it is stored in the projects file directory 
    */

    const projectid = req.body.projectid;

    if (projectid === null)
    {
        return res.status(500).send(error);
    }
    
    const folder = "./uploads/" + projectid;

    try {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }
    } catch (error) {
        return res.status(500).send(error);
    }

    if (!req.files || Object.keys(req.files).length === 0)
    {
        return res.status(400).send("No file was uploaded");
    }

    const file = req.files.file;
    const path = folder + "/" + file.name;

    file.mv(path, function(error) {
        if (error)
        {
            return res.status(500).send(error);
        }

        res.send("File uploaded successfully");
    })
})

app.get("/files/get/:projectid", (req, res) => {

    /*
        gets a list of the filenames in a projects file directory if the directory exists
    */

    const folder = "./uploads/" + req.params.projectid;

    try {
        if (fs.existsSync(folder)) {
            var files = fs.readdirSync(folder)
            return res.status(200).send(files);
        }
    } catch (error) {
        return res.status(500).send(error);
    }
});

app.delete("/files/delete/", (req, res) => {

    /*
        checks if the file exists and deletes it if it does
    */

    const file = "./uploads/" + req.body.projectid + "/" + req.body.filename;

    try {
        if (fs.existsSync(file)) {

            var files = fs.unlinkSync(file);

            return res.status(200).send("File deleted successfully");
        }
    } catch (error) {
        return res.status(500).send(error);
    }
});

app.get("/download/:projectid/:filename", (req, res) => {

    /*
        downloads a file from the project directory onto the client's machine 
    */

    const projectid = req.params.projectid;
    const filename = req.params.filename;
    
    const relPath = "./uploads/" + projectid + "/" + filename;

    res.download(relPath, filename, (error) => {
        if (error) {
            return res.status(500).send(error);
        }
        else{
            return res.status(200);
        }
    })
});

app.use((req, res) => {
    res.status(400).send("Bad Request. Route not found");
});

export default app;