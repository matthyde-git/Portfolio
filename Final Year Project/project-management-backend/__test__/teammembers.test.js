import app from "../server.js";
import request from "supertest";

describe("team members", () => {

    // NOTE: These tests are validated using data within my local database and so may produce different results for you

    /************************************************ Happy Path Tests ************************************************/

    it("creates a POST request to create a valid team member, checks the resonse code is 200", async () => {
        const res = await request(app)
            .post("/api/teammembers/add")
            .send({
                email: "matthyde@email.com",
                projectid: 9
            })

        expect(res.statusCode).toEqual(200);
    });

    it("creates a GET request to fetch the user's active invites, checks the resonse code is 200", async () => {
        const res = await request(app)
            .get("/api/teammembers/matthyde@email.com")

        expect(res.statusCode).toEqual(200);

        expect(res._body[0].email).toEqual("matthyde@email.com");
        expect(res._body[0].projectid).toEqual(9);
        expect(res._body[0].acceptedinvite).toEqual(null);
    });

    it("creates a valid POST request to reject an invite to a project, checks the resonse code is 200", async () => {
        const res = await request(app)
            .post("/api/teammembers/reject")
            .send({
                email: "matthyde@email.com",
                projectid: 9
            })

        expect(res.statusCode).toEqual(200);
    });

    it("creates a valid POST request to accept an invite to a project, checks the resonse code is 200", async () => {
        const res = await request(app)
            .post("/api/teammembers/accept")
            .send({
                email: "matthyde@email.com",
                projectid: 9
            })

        expect(res.statusCode).toEqual(200);
    });

    it("creates a valid GET request to fetch all the team members of a project, checks the resonse code is 200 and the body is correct", async () => {
        const res = await request(app)
            .get("/api/teammembers/project/9")

        expect(res.statusCode).toEqual(200);

        expect(res._body[0].email).toEqual("test@email.com");
    });

    it("creates a DELETE request to remove a team member, checks that the response code is 200", async () => {
        const res = await request(app)
            .delete("/api/teammembers/")
            .send({
                projectid: 9,
                email: "matthyde@email.com"
            })

        expect(res.statusCode).toEqual(200);
    });

    /************************************************ Unhappy Path Tests ************************************************/

    it("creates a POST request with an invalid field to create an team member, checks the resonse code is 500", async () => {
        const res = await request(app)
            .post("/api/teammembers/add")
            .send({
                incorrectField: "matthyde@email.com",
                projectid: 9
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a POST request with an invalid field to reject an invite to a project, checks the resonse code is 500", async () => {
        const res = await request(app)
            .post("/api/teammembers/reject")
            .send({
                incorrectField: "matthyde@email.com",
                projectid: 9,
                acceptedinvite: false
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a POST request with an invalid field to accept an invite to a project, checks the resonse code is 500", async () => {
        const res = await request(app)
            .post("/api/teammembers/reject")
            .send({
                incorrectField: "matthyde@email.com",
                projectid: 9,
                acceptedinvite: true
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a DELETE request with an invalid field to remove a team member, checks that the response code is 500", async () => {
        const res = await request(app)
            .delete("/api/teammembers/")
            .send({
                incorrectField: 9,
                email: "matthyde@email.com"
            })

        expect(res.statusCode).toEqual(500);
    });
})