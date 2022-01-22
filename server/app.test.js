const request = require('supertest')
const app = require('./app')
// const User = require('models/User')

describe("Test the root path", () => {
    test("It should response the GET method", async () => {
      const response = await request(app).get("/");
      expect(response.statusCode).toBe(200);
    });
});
// describe('POST /users/signup', () => {
//     it('responds with json', function(done) {
        
//         return request(app).post('/api/users/signup').send({
//             name: 'qwertyssstdzxc',
//             email: 'qwertyssstddzxc@example.com',
//             password: 'password123',
//             passwordConfirm: 'password123',
//         })
//         .expect('Content-Type', /json/)
//         .expect(201)
//         .then(response => {
//             expect(response.body.name).toBe(user.name)
//             expect(response.body.email).toBe(user.email)
//             expect(response.body.password).toBe(user.password)
//         })
//     });
// })

