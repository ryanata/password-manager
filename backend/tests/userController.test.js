const { supertest } = require('supertest');
const { userRoute } = require('../routes/userRoutes')
jest.mock('axios')
const axios = require('axios')
const {
    registerUser,
    loginUser,
    getMe,
    addVault
} = require('../controllers/userController');



describe("Login", ()=>{
    const username = "test@gmail.com"
    const password = "123"

    test("should respond with a 200 status code", async () => {
        const { username, password } = req.body
        await loginUser(req, res).post('/api/user/login')
        expect(res.status).toBe(200)
    })
})