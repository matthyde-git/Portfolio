import app from "../server.js";
import request from "supertest";

describe("risks", () => {

    // NOTE: These tests are validated using data within my local database and so may produce different results for you

    /************************************************ Happy Path Tests ************************************************/

    // it("creates a POST request to create a valid risk, checks the resonse code is 200", async () => {
    //     const res = await request(app)
    //         .post("/api/risks/add")
    //         .send({
    //             projectid: 9,
    //             title: "Fail to implement features",
    //             category: "Requirements",
    //             impact: "Project failure",
    //             impactlevel: 5,
    //             likelihood: 3,
    //             control: "Create and follow UML models",
    //             response: "Research techniques for implmenting key features",
    //             priority: 3
    //         })

    //     expect(res.statusCode).toEqual(200);
    // });

    it("creates a valid POST request to update a risk, checks the resonse code is 200", async () => {
        const res = await request(app)
            .post("/api/risks/update")
            .send({
                riskid: 7,
                title: "Fail to implement features",
                category: "Requirements",
                impact: "Project failure",
                impactlevel: 5,
                likelihood: 1,
                control: "Create and follow UML models",
                response: "Research techniques for implementing key features",
                priority: 3
            })

        expect(res.statusCode).toEqual(200);
    });

    it("creates a valid GET request to fetch a projects risks, checks the response code is 200 and the body is correct", async () => {
        const res = await request(app)
            .get("/api/risks/9")

        expect(res.statusCode).toEqual(200);

        expect(res._body[2].title).toEqual("Fail to implement features");
        expect(res._body[2].category).toEqual("Requirements");
        expect(res._body[2].impact).toEqual("Project failure");
        expect(res._body[2].impactlevel).toEqual(5);
        expect(res._body[2].likelihood).toEqual(1);
        expect(res._body[2].control).toEqual("Create and follow UML models");
        expect(res._body[2].response).toEqual("Research techniques for implementing key features");
        expect(res._body[2].priority).toEqual(3);
    });

    it("creates a valid DELETE request to delete a project risk, checks the response code is 200", async () => {
        const res = await request(app)
            .delete("/api/risks/")
            .send({
                riskid: 3
            })

        expect(res.statusCode).toEqual(200);
    });

    /************************************************ Unhappy Path Tests ************************************************/

    it("creates a POST request with an invalid field name to create a risk, checks the resonse code is 500", async () => {
        const res = await request(app)
            .post("/api/risks/add")
            .send({
                projectid: 9,
                incorrectField: "Fail to implement features",
                category: "Requirements",
                impact: "Project failure",
                impactlevel: 5,
                likelihood: 3,
                control: "Create and follow UML models",
                response: "Research techniques for implmenting key features",
                priority: 3
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a POST request with an invalid data type to create a risk, checks the resonse code is 500", async () => {
        const res = await request(app)
            .post("/api/risks/add")
            .send({
                projectid: 9,
                title: null,
                category: "Requirements",
                impact: "Project failure",
                impactlevel: 5,
                likelihood: 3,
                control: "Create and follow UML models",
                response: "Research techniques for implmenting key features",
                priority: 3
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a POST request with an invalid field name to update a risk, checks the resonse code is 500", async () => {
        const res = await request(app)
            .post("/api/risks/update")
            .send({
                incorrectField: 7,
                title: "Fail to implement features",
                category: "Requirements",
                impact: "Project failure",
                impactlevel: 5,
                likelihood: 1,
                control: "Create and follow UML models",
                response: "Research techniques for implementing key features",
                priority: 3
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a POST request with an invalid data type to update a risk, checks the resonse code is 500", async () => {
        const res = await request(app)
            .post("/api/risks/update")
            .send({
                riskid: 7,
                title: null,
                category: "Requirements",
                impact: "Project failure",
                impactlevel: 5,
                likelihood: 1,
                control: "Create and follow UML models",
                response: "Research techniques for implementing key features",
                priority: 3
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a DELETE request with an invalid field name to delete a risk, checks the response code is 500", async () => {
        const res = await request(app)
            .delete("/api/risks/")
            .send({
                invalidField: 3
            })

        expect(res.statusCode).toEqual(500);
    });
})