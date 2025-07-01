import app from "../server.js";
import request from "supertest";

describe("files", () => {

    // NOTE: These tests are validated using data within my local file system and so may produce different results for you

    /************************************************ Happy Path Tests ************************************************/

    it("creates a valid GET request to fetch the projects files, checks the response code is 200 and the body is correct", async () => {
        const res = await request(app)
            .get("/files/get/9")

        expect(res.statusCode).toEqual(200);

        expect(res._body[0]).toEqual("test.txt");
    });

    /************************************************ Unhappy Path Tests ************************************************/

    it("creates a POST request with an invalid data type to upload a file, checks the response code is 500", async () => {
        const res = await request(app)
            .post("/upload")
            .send({
                projectid: null
            })

        expect(res.statusCode).toEqual(500);
    });
    
})