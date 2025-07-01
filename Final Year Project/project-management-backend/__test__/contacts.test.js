import app from "../server.js";
import request from "supertest";

describe("contacts", () => {

    // it("creates a POST request to create a valid contact and checks the resonse code is 200", async () => {
    //     const res = await request(app)
    //         .post("/api/contacts/add")
    //         .send({
    //             email: "test@email.com"
    //         })

    //     expect(res.statusCode).toEqual(200);
    // });

    it("creates a POST request to with an invalid field and checks the resonse code is 500", async () => {
        const res = await request(app)
            .post("/api/contacts/add")
            .send({
                incorrectField: "test@email.com"
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a POST request to with an invalid data type and checks the resonse code is 500", async () => {
        const res = await request(app)
            .post("/api/contacts/add")
            .send({
                email: null
            })

        expect(res.statusCode).toEqual(500);
    });
})