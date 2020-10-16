const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const validateObjectId = require('../middleware/validateObjectId');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const router = express.Router();
const { Genre } = require('../models/genre')
const mongoose = require('mongoose');

router.get('/', async (req,res) => {
        const genres = await Genre.find().sort('name');
        res.send(genres);
});

router.post('/', auth, async (req,res) => {
    const { error } = validateGenres(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { name } = req.body;
    let genre = new Genre({ name: name });
    genre = await genre.save();
    res.send(genre);
});

router.get('/:id', validateObjectId, async (req, res) => {

    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given Id not found');

    res.send(genre);
});

router.delete('/:id', [auth, admin], async (req,res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID not found');

    res.send(genre);
});

router.put('/:id', async (req, res) => {
    const { name } = req.body;

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: name}, {
       new: true
    });

   if (!genre) return res.status(404).send('The genre with the given ID not found');

   res.send(genre);
});

function validateGenres (genre) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(genre);
}

module.exports = router;
