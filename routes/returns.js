const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const {Rental} = require('../models/rental');

router.post('/', auth, async (req, res) => {
   if (!req.body.customerId) return res.status(400).send('customerId nor provided');

   const rental = await Rental.findOne({
     'customer._id': req.body.customerId,
     'movie._id': req.body.movieId
   });
   if(!rental) return res.status(404).send('Rental not found.')

   rental.dateReturned = new Date();
   await rental.save()
   res.status(401).send('Unauthorized');
});

module.exports = router;
