import app from "./server.js";

const port = 5005;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});