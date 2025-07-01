import app from "../server.js";
import request from "supertest";

describe("preferences", () => {

    // NOTE: These tests are validated using data within my local database and so may produce different results for you

    /************************************************ Happy Path Tests ************************************************/

    // it("creates a POST request to create a valid preference, checks the resonse code is 200", async () => {
    //     const res = await request(app)
    //         .post("/api/preferences/add/")
    //         .send({
    //             user: "test@email.com",
    //             theme: "dark",
    //             fontsize: "medium"
    //         })

    //     expect(res.statusCode).toEqual(200);
    // });

    it("creates a valid POST request to update the preference theme, checks the resonse code is 200", async () => {
        const res = await request(app)
            .post("/api/preferences/update/theme")
            .send({
                user: "test@email.com",
                newTheme: "light"
            })

        expect(res.statusCode).toEqual(200);
    });

    it("creates a valid POST request to update the preference font, checks the resonse code is 200", async () => {
        const res = await request(app)
            .post("/api/preferences/update/font")
            .send({
                user: "test@email.com",
                newFontSize: "larger"
            })

        expect(res.statusCode).toEqual(200);
    });

    it("creates a valid GET request to fetch a user's preferences, checks the response code is 200 and the body is correct", async () => {
        const res = await request(app)
            .get("/api/preferences/user/test@email.com")

        expect(res.statusCode).toEqual(200);

        expect(res._body[0].user).toEqual("test@email.com");
        expect(res._body[0].theme).toEqual("light");
        expect(res._body[0].fontsize).toEqual("larger");
    });

    /************************************************ Unhappy Path Tests ************************************************/

    it("creates a POST request with an invalid field name to create a preference, checks the resonse code is 500", async () => {
        const res = await request(app)
            .post("/api/preferences/add/")
            .send({
                invalidField: "test@email.com",
                theme: "dark",
                fontsize: "medium"
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a POST request with an invalid data type to create a preference, checks the resonse code is 500", async () => {
        const res = await request(app)
            .post("/api/preferences/add/")
            .send({
                user: null,
                theme: "dark",
                fontsize: "medium"
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a POST request with an invalid field name to update the preference font, checks the resonse code is 500", async () => {
        const res = await request(app)
            .post("/api/preferences/update/font")
            .send({
                invalidField: "test@email.com",
                newFontSize: "large"
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a POST request with an invalid data type to update the preference font, checks the resonse code is 500", async () => {
        const res = await request(app)
            .post("/api/preferences/update/font")
            .send({
                user: "test@email.com",
                newFontSize: null
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a POST request with an invalid field name to update the preference theme, checks the resonse code is 500", async () => {
        const res = await request(app)
            .post("/api/preferences/update/theme")
            .send({
                invalidField: "test@email.com",
                newTheme: "light"
            })

        expect(res.statusCode).toEqual(500);
    });

    it("creates a POST request with an invalid data type to update the preference theme, checks the resonse code is 500", async () => {
        const res = await request(app)
            .post("/api/preferences/update/theme")
            .send({
                user: "test@email.com",
                newTheme: null
            })

        expect(res.statusCode).toEqual(500);
    });
})