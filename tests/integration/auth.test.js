const request = require('supertest');
const {User} = require('../../models/user');
const {Genre} = require('../../models/genre')

describe('auth middleware', () => {
    let server;
   beforeEach(() => {
       server = require('../../app');
   });
   afterEach(async() => {
       await Genre.remove({});
       server.close();
   })

    let token;

    const exec = () => {
        return  request(server).post('/api/genres').set('x-auth-token', token).send({ name: 'genre1'});
    };

    beforeEach(() => {
       token = new User().generateAuthToken();
    });

    it('should return 401 uif no token is provided', async () => {
        token = '';

        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('should return 200 if token is valid', async () => {
        const res = await exec();

        expect(res.status).toBe(200);
    });
});
