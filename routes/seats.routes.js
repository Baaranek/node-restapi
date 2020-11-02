const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seat.controller');

router.get('/seats', SeatController.getAll);

router.get('/seats/:id', SeatController.getById);

router.post('/seats', SeatController.addNew);

router.put('/seats/:id', SeatController.updateOne);

router.delete('/seats/:id', SeatController.updateOne);

module.exports = router;