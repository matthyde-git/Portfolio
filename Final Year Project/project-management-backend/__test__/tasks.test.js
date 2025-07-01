import app from "../server.js";
import request from "supertest";

describe("tasks", () => {

    // NOTE: These tests are validated using data within my local database and so may produce different results for you

    /************************************************ Happy Path Tests ************************************************/

    // it("creates a POST request to create a valid task, checks the resonse code is 200", async () => {
    //     const res = await request(app)
    //         .post("/api/tasks/add")
    //         .send({
    //             title: "Test",
    //             description: "Test description",
    //             deadline: "2025-06-24 15:00:00+01",
    //             projectid: 11
    //         })

    //     expect(res.statusCode).toEqual(200);
    // });

    it("creates a valid POST request to updated a task, checks the response code is 200", async () => {
        const res = await request(app)
            .post("/api/tasks/update")
            .send({
                taskid: 14,
                title: "Test",
                description: "Updated description",
                status: "To do",
                assignedTo: "matthyde@email.com",
                deadline: "2025-05-24 15:00:00+01",
            })

        expect(res.statusCode).toEqual(200);
    });

    it("creates a valid POST request to updated the assignment of a task, checks the response code is 200", async () => {
        const res = await request(app)
            .post("/api/tasks/update/assignment")
            .send({
                taskid: 14,
                newAssignee: "test@email.com"
            })

        expect(res.statusCode).toEqual(200);
    });

    it("creates a valid POST request to updated the status of a task, checks the response code is 200", async () => {
        const res = await request(app)
            .post("/api/tasks/update/status")
            .send({
                taskid: 14,
                newStatus: "Doing"
            })

        expect(res.statusCode).toEqual(200);
    });

    it("creates a valid GET request to fetch a projects task, checks the response code is 200 and the body is correct", async () => {
        const res = await request(app)
            .get("/api/tasks/project/11")

        expect(res.statusCode).toEqual(200);

        expect(res._body[0].title).toEqual("Test");
        expect(res._body[0].description).toEqual("Updated description");
        expect(res._body[0].status).toEqual("Doing");
        expect(res._body[0].assignedto).toEqual("test@email.com");
    });

    it("creates a valid GET request to fetch a user's tasks, checks the response code is 200 and the body is correct", async () => {
        const res = await request(app)
            .get("/api/tasks/user/test@email.com")

        expect(res.statusCode).toEqual(200);
        expect(res._body[1].status).toEqual("Doing");
        expect(res._body[1].assignedto).toEqual("test@email.com");
    });
    
    it("creates a valid DELETE request to delete a task, checks the response code is 200", async () => {
        const res = await request(app)
            .delete("/api/tasks/")
            .send({
                taskid: 4
            })

        expect(res.statusCode).toEqual(200);
    });

    /************************************************ Unhappy Path Tests ************************************************/

    it("creates a POST request with an invalid field name to create a task, checks the response code is 500", async () => {
        const res = await request(app)
            .post("/api/tasks/add")
            .send({
                invalidField: "Test",
                description: "Test description",
                deadline: "2025-05-24 15:00:00+01",
                projectid: 11
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a POST request with an invalid data type to create a task, checks the response code is 500", async () => {
        const res = await request(app)
            .post("/api/tasks/add")
            .send({
                title: null,
                description: "Test description",
                deadline: "2025-05-24 15:00:00+01",
                projectid: 11
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a POST request with an invalid field name to updated a task, checks the response code is 500", async () => {
        const res = await request(app)
            .post("/api/tasks/update")
            .send({
                invalidField: 14,
                title: "Test",
                description: "Updated description",
                status: "To do",
                assignedTo: "matthyde@email.com",
                deadline: "2025-05-24 15:00:00+01",
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a POST request with an invalid data type to updated a task, checks the response code is 500", async () => {
        const res = await request(app)
            .post("/api/tasks/update")
            .send({
                taskid: 14,
                title: "Test",
                description: null,
                status: "To do",
                assignedTo: "matthyde@email.com",
                deadline: "2025-05-24 15:00:00+01",
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a POST request with an invalid field name to updated the assignment of a task, checks the response code is 500", async () => {
        const res = await request(app)
            .post("/api/tasks/update/assignment")
            .send({
                invalidField: 14,
                newAssignee: "test@email.com"
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a POST request with an invalid data type to updated the assignment of a task, checks the response code is 500", async () => {
        const res = await request(app)
            .post("/api/tasks/update/assignment")
            .send({
                taskid: 14,
                newAssignee: null
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a POST request with an invalid field name to updated the status of a task, checks the response code is 200", async () => {
        const res = await request(app)
            .post("/api/tasks/update/status")
            .send({
                invalidField: 14,
                newStatus: "Doing"
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a POST request with an invalid data type to updated the status of a task, checks the response code is 200", async () => {
        const res = await request(app)
            .post("/api/tasks/update/status")
            .send({
                taskid: 14,
                newStatus: null
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a DELETE request with an invalid field to remove a task, checks that the response code is 500", async () => {
        const res = await request(app)
            .delete("/api/tasks/")
            .send({
                incorrectField: 4
            })

        expect(res.statusCode).toEqual(500);
    });
})