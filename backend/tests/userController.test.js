const { ObjectID } = require("bson");
const request = require("supertest");
const { app } = require("../testServer");

describe("User Tests", () => {
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
            email: "vdfdsvasedfds@gmail.com",
            phoneNumber: "1234567890",
            password: "123"
        };
        const res = await request(app).post('/api/user/register').send(data);
        expect(res.status).toBe(201); 
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
            email: "4fqdfawe@gmail.com",
            phoneNumber: "1234567890",
            password: "123"
        };
        const res = await request(app).post('/api/user/register').send(data);
        expect(res.status).toBe(400); 
    });
});

describe("Vault Tests", () =>{
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


    test('getVault', async () => {
        const res = await request(app).get('/api/vault/637c8e7b78c5a98c57ff10bc');
        expect(res.status).toBe(200); 
    });

    test('Create Account', async () => {
        const data = {
            name: 'Google',
            url:'https://accounts.google.com/v3/signin/identifier?dsh=S1795694823%3A1670386954905318&authuser=0&continue=https%3A%2F%2Fwww.google.com%2F&ec=GAlAmgQ&hl=en&flowName=GlifWebSignIn&flowEntry=AddSession',
            username:'ni6ghcvadh',
            password: "dflainsbdfui",
            tags:[{name:"Work", color:"#3a45b2"}]
        };
        const res = await request(app).post('/api/vault/637c8e7b78c5a98c57ff10bc/site/account').send(data);
        expect(res.status).toBe(201); 
    });
    test('Update Account', async () => {
        const data = {
            username:'HellO',
            password: "Worrld",
        };
        const res = await request(app).put('/api/vault/637c8e7b78c5a98c57ff10bc/site/account/639015c45424c50b9ba6eed9').send(data);
        expect(res.status).toBe(200); 
    });

    test('getTags', async () => {
        const res = await request(app).get('/api/vault/637c8e7b78c5a98c57ff10bc/tags');
        expect(res.status).toBe(200); 
    });

})
    