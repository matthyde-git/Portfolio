import app from "../server.js";
import request from "supertest";

describe("messages", () => {

    // NOTE: These tests are validated using data within my local database and so may produce different results for you

    /************************************************ Happy Path Tests ************************************************/

    // it("creates a POST request to create a valid message, checks the resonse code is 200", async () => {
    //     const res = await request(app)
    //         .post("/api/messages/add")
    //         .send({
    //             projectid: 9,
    //             message: "Test",
    //             user: "test@email.com"
    //         })

    //     expect(res.statusCode).toEqual(200);
    // });

    it("creates a valid POST request to update a message, checks the resonse code is 200", async () => {
        const res = await request(app)
            .post("/api/messages/update")
            .send({
                messageid: 10,
                message: "Update",
                user: "test@email.com"
            })

        expect(res.statusCode).toEqual(200);
    });

    it("creates a POST request to create a valid message in reply to the above message, checks the resonse code is 200", async () => {
        const res = await request(app)
            .post("/api/messages/add")
            .send({
                projectid: 9,
                message: "Reply",
                user: "test@email.com",
                replyingto: 10
            })

        expect(res.statusCode).toEqual(200);
    });

    it("creates a valid GET request to fetch a message, checks the response code is 200 and the body is correct", async () => {
        const res = await request(app)
            .get("/api/messages/11")

        expect(res.statusCode).toEqual(200);

        expect(res._body[0].message).toEqual("Reply");
        expect(res._body[0].user).toEqual("test@email.com");
    });

    it("creates a valid DELETE request to delete a project risk, checks the response code is 200 and the replyingto value has been updated", async () => {
        const res = await request(app)
            .delete("/api/messages/")
            .send({
                messageid: 10
            })

        expect(res.statusCode).toEqual(200);

        const res2 = await request(app)
            .get("/api/messages/11")

        expect(res2.statusCode).toEqual(200);

        expect(res2._body[0].message).toEqual("Reply");
        expect(res2._body[0].user).toEqual("test@email.com");
        expect(res2._body[0].replyingto).toEqual(null);
    });

    /************************************************ Unhappy Path Tests ************************************************/

    it("creates a POST request with an invalid field name to create a message, checks the resonse code is 500", async () => {
        const res = await request(app)
            .post("/api/messages/add")
            .send({
                projectid: 9,
                incorrectField: "Test",
                user: "test@email.com"
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a POST request with an invalid data type to create a message, checks the resonse code is 500", async () => {
        const res = await request(app)
            .post("/api/messages/add")
            .send({
                projectid: 9,
                message: null,
                user: "test@email.com"
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a POST request with an invalid field name to update a message, checks the resonse code is 500", async () => {
        const res = await request(app)
            .post("/api/messages/update")
            .send({
                incorrectField: 11,
                message: "Update",
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a POST request with an invalid data type to update a message, checks the resonse code is 500", async () => {
        const res = await request(app)
            .post("/api/messages/update")
            .send({
                messageid: 11,
                message: null,
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a DELETE request with an invalid field name to delete a message, checks the response code is 500", async () => {
        const res = await request(app)
            .delete("/api/messages/")
            .send({
                invalidField: 11
            })

        expect(res.statusCode).toEqual(500);
    });
})