const request = require('supertest');
const {Genre} = require('../../models/genre')
const {User} = require('../../models/user')
const mongoose = require('mongoose');
let server;

describe('/api/genres', () => {
    let token;
    let name;

    const exec = async () => {
        return await request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({ name: name});
    }

    beforeEach(() => {
        token = new User().generateAuthToken();
        name = 'genre1';
       server = require('../../app');
    });
    afterEach(async() => {
       server.close();
    });
    describe('GET /' , () => {
    it('should return all genres', async () => {

    });
    describe('GET /:id', () => {
       it('should return a genre if valid id is passed', async () => {
       });
    });

    describe('POST /', () => {
       it('should return 401 if client is not logged in', async () => {
          token = '';
          const res = await exec();
          expect(res.status).toBe(401);
       });

        it('should return 401 if genre is less than 5 character', async () => {
            name = '1234';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if genre is more than 50 character', async () => {
            const token = new User().generateAuthToken();
            name = new Array(52).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 404 if no genre with the given id exists', async() => {
           const id = mongoose.Types.ObjectId()
           const res = await request(server).get('/api/genres/' + id);

           expect(res.status).toBe(404);
        });
    });
});
});
