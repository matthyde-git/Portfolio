const express = require("express");

const dataset = require("./dataset/Health_News.json")

const app = express();
const port = 5005;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile("index.html", (err) => {
        if (err) {
            console.log(err);
        }
    })
});

// gets the health news dataset
app.get("/data", (req, res) => {
    res.json(dataset);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});