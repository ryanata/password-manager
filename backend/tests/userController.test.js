const request = require("supertest");
const { app } = require("../testServer");

describe("API Tests", () => {
    test('login on the test user', async () => {
        const data = {
            email: "nap@gmail.com",
            password: "123"
        };
        const res = await request(app).post('/api/user/login').send(data).expect(200);
        expect(res.status).toBe(200); 
    });

    test('login on the test user', async () => {
        const data = {
            email: "nap@gmail.com",
            password: "123"
        };
        const res = await request(app).post('/api/user/login').send(data).expect(200);
        expect(res.status).toBe(200); 
    });
});