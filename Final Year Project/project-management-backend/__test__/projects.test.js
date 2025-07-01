import app from "../server.js";
import request from "supertest";

describe("projects", () => {

    // NOTE: These tests are validated using data within my local database and so may produce different results for you

    /************************************************ Happy Path Tests ************************************************/

    // it("creates a POST request to create a valid project and checks the resonse code is 200", async () => {
    //     const res = await request(app)
    //         .post("/api/projects/add")
    //         .send({
    //             title: "Unit tests",
    //             teamleader: "test@email.com",
    //             description: "Unit testing.",
    //             status: "In progress",
    //             deadline: "2025-06-24 15:00:00+01"
    //         })

    //     expect(res.statusCode).toEqual(200);
    // });

    it("creates a valid POST request to update a project and checks the resonse code is 200", async () => {
        const res = await request(app)
            .post("/api/projects/update")
            .send({
                projectid: 12,
                title: "Unit tests update",
                description: "Unit testing update.",
                status: "In progress",
                deadline: "2025-06-24 15:00:00+01"
            })

        expect(res.statusCode).toEqual(200);
    });

    it("creates a valid POST request to update a projects status and checks the resonse code is 200", async () => {
        const res = await request(app)
            .post("/api/projects/update/status")
            .send({
                projectid: 12,
                newStatus: "Done"
            })

        expect(res.statusCode).toEqual(200);
    });

    it("creates a GET request to fetch a project and checks that the body is correct", async () => {
        const res = await request(app)
            .get("/api/projects/12")

        expect(res.statusCode).toEqual(200);

        expect(res._body[0].title).toEqual("Unit tests update");
        expect(res._body[0].teamleader).toEqual("test@email.com");
        expect(res._body[0].description).toEqual("Unit testing update.");
        expect(res._body[0].status).toEqual("Done");
    });

    it("creates a GET request to fetch a project that doesn't exist and checks that the body is empty and the response code is 200", async () => {
        const res = await request(app)
            .get("/api/projects/100")

        expect(res.statusCode).toEqual(200);

        expect(res._body.length).toEqual(0);
    });

    it("creates a DELETE request to delete a project, checks that the response code is 200 and that it is no longer in the database", async () => {
        const res = await request(app)
            .delete("/api/projects/")
            .send({
                projectid: 5
            })

        expect(res.statusCode).toEqual(200);

        const res2 = await request(app)
            .get("/api/projects/5")

        expect(res2._body.length).toEqual(0);
    });

    /************************************************ Unhappy Path Tests ************************************************/

    it("creates a POST request to create a valid project with an invalid field and checks the resonse code is 500", async () => {
        const res = await request(app)
            .post("/api/projects/add")
            .send({
                incorrectField: "Final year project",
                teamleader: "test@email.com",
                description: "We will be designing, building, testing and deploying a project management system.",
                status: "In progress",
                deadline: "2025-06-24 15:00:00+01"
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a POST request to create a project with an invalid datatype and checks the resonse code is 500", async () => {
        const res = await request(app)
            .post("/api/projects/add")
            .send({
                title: null,
                teamleader: "test@email.com",
                description: "We will be designing, building, testing and deploying a project management system.",
                status: "In progress",
                deadline: "2025-06-24 15:00:00+01"
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a POST request to update project with an invalid field and checks the resonse code is 500", async () => {
        const res = await request(app)
            .post("/api/projects/update")
            .send({
                incorrectField: 12,
                title: "Final year project",
                teamleader: "test@email.com",
                description: "We will be designing, building, testing and deploying a project management system.",
                status: "In progress",
                deadline: "2025-06-24 15:00:00+01"
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a POST request to update project with an invalid data type and checks the resonse code is 500", async () => {
        const res = await request(app)
            .post("/api/projects/update")
            .send({
                projectid: 12,
                title: null,
                teamleader: "test@email.com",
                description: "We will be designing, building, testing and deploying a project management system.",
                status: "In progress",
                deadline: "2025-06-24 15:00:00+01"
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a POST request to update project status with an invalid field and checks the resonse code is 500", async () => {
        const res = await request(app)
            .post("/api/projects/update")
            .send({
                projectid: 12,
                incorrectField: "Done"
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a POST request to update project status with an invalid field and checks the resonse code is 500", async () => {
        const res = await request(app)
            .post("/api/projects/update")
            .send({
                projectid: 12,
                newStatus: null
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a DELETE request with an incorrect field to delete a project, checks that the response code is 500", async () => {
        const res = await request(app)
            .delete("/api/projects/")
            .send({
                incorrectField: 5
            })

        expect(res.statusCode).toEqual(500);
    })
})