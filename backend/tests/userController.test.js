const { ObjectID } = require("bson");
const request = require("supertest");
const { app } = require("../testServer");

describe("API Tests", () => {
    it('should login on the test user', async () => {
        const data = {
            email: "nap@gmail.com",
            password: "123"
        };
        const res = await request(app).post('/api/user/login').send(data);
        expect(res.status).toBe(200); 
    });

    // replace the email every time you want to test as it sends it to the collection
    test('register user', async () => {
        const data = {
            firstName:"Ada",
            lastName:"adA",
            email: "654896@gmail.com",
            phoneNumber: "1234567890",
            password: "123"
        };
        const res = await request(app).post('/api/user/register').send(data);
        expect(res.status).toBe(200); 
    });

    test('register with empty fields', async () => {
        const data = {
            firstName:"Ada",
            lastName:"",
            email: "654896@gmail.com",
            phoneNumber: "1234567890",
            password: ""
        };
        const res = await request(app).post('/api/user/register').send(data);
        expect(res.status).toBe(400); 
    });

    test('register with existing user', async () => {
        const data = {
            firstName:"Ada",
            lastName:"adA",
            email: "654896@gmail.com",
            phoneNumber: "1234567890",
            password: "123"
        };
        const res = await request(app).post('/api/user/register').send(data);
        expect(res.status).toBe(400); 
    });

    test('addVault', async () => {
        const data = {
            name: 'asdfth',
            masterPassword: "dskafhj",
            userId: ObjectID('63596b74e50f22fe96391b94')
        };
        const res = await request(app).post('/api/vault').send(data);
        expect(res.status).toBe(201); 
    });

    test('addVault with empty fields', async () => {
        const data = {
            name: '',
            masterPassword: "",
            userId: ObjectID('63596b74e50f22fe96391b94')
        };
        const res = await request(app).post('/api/vault').send(data);
        expect(res.status).toBe(400); 
    });
});