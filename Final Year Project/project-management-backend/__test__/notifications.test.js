import app from "../server.js";
import request from "supertest";

describe("notifications", () => {

    // NOTE: These tests are validated using data within my local database and so may produce different results for you

    /************************************************ Happy Path Tests ************************************************/

    it("creates a POST request to create a valid notification, checks the resonse code is 200", async () => {
        const res = await request(app)
            .post("/api/notifications/add/unique")
            .send({
                name: "test@email.com",
                message: "Test notification",
                date: new Date()
            })

        expect(res.statusCode).toEqual(200);
    });

    it("creates a valid GET request to fetch a notification, checks the response code is 200 and the body is correct", async () => {
        const res = await request(app)
            .get("/api/notifications/2")

        expect(res.statusCode).toEqual(200);

        expect(res._body[0].name).toEqual("test@email.com");
        expect(res._body[0].message).toEqual("Test notification");
    });

    it("creates a valid DELETE request to delete a notification, checks the response code is 200", async () => {
        const res = await request(app)
            .delete("/api/notifications/")
            .send({
                notificationid: 10
            })

        expect(res.statusCode).toEqual(200);
    });

    it("creates a valid DELETE request to delete all of a user's notification, checks the response code is 200", async () => {
        const res = await request(app)
            .delete("/api/notifications/user/delete/")
            .send({
                name: "matthyde@email.com"
            })

        expect(res.statusCode).toEqual(200);
    });

    /************************************************ Unhappy Path Tests ************************************************/

    it("creates a POST request with an invalid field name to create a notification, checks the response code is 500", async () => {
        const res = await request(app)
            .post("/api/notifications/add/unique")
            .send({
                invalidField: "test@email.com",
                message: "Test",
                date: new Date()
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a POST request with an invalid data type to create a task, checks the response code is 500", async () => {
        const res = await request(app)
            .post("/api/notifications/add/unique")
            .send({
                name: null,
                message: "Test",
                date: new Date()
            })

        expect(res.statusCode).toEqual(500);
    });
    
    it("creates a DELETE request with an invalid field name to delete a notification, checks the response code is 500", async () => {
        const res = await request(app)
            .delete("/api/notifications/")
            .send({
                invalidField: 10
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a DELETE request with an invalid field name to delete all of a user's notification, checks the response code is 500", async () => {
        const res = await request(app)
            .delete("/api/notifications/user/delete/")
            .send({
                invalidField: "matthyde@email.com"
            })

        expect(res.statusCode).toEqual(500);
    });
})