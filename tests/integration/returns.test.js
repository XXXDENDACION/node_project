const { Rental } = require('../../models/rental');
const mongoose = require('mongoose');
const request = require('supertest');
const { User } = require('../../models/user');

describe('/api/returns', () => {
    let server;
    let customerId;
    let movieId;
    let rental;
    let token;

    const exec = () => {
        return request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({ customerId, movieId });
    };

   beforeEach(async () => {
       server = require('../../app');

       customerId = mongoose.Types.ObjectId();
       movieId = mongoose.Types.ObjectId();
       token = new User().generateAuthToken();
       rental = new Rental({
           customer: {
             _id: customerId,
             name: '12345',
             phone: '12345'
         },
           movie: {
               _id: movieId,
               title: 'movie title',
               dailyRentalRate: 2
           }
       });
       await rental.save();
   });
   afterEach(async () => {
      server.close();
      await Rental.remove({});
   });

   it('should work!', () => {
      const result = Rental.findById(rental._id);
      expect(result).not.toBeNull();
   })

    it('should return 400 if customerId is not provided', async () => {
        customerId = '';
        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 404 if no customerId is not provided', async () => {
        await Rental.remove({})

        const res = await exec();

        expect(res.status).toBe(404);
    });
    it('should set the returnDate if input is valid ', async () => {

        const res = await exec();

        const rentalInDb = await Rental.findById(rental._id);
        const diff = new Date() - rentalInDb.dateReturned;
        expect(diff).toBeLessThan(10 * 1000);
    });

});
