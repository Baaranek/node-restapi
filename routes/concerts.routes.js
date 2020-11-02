const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concert.controller');

router.get('/concerts', ConcertController.getAll);

router.get('/concerts/:id', ConcertController.getById);

router.post('/concerts', ConcertController.addNew);

router.put('/concerts/:id', ConcertController.updateOne);

router.delete('/concerts/:id', ConcertController.updateOne);

module.exports = router;