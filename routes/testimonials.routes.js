const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonial.controller');

router.get('/testimonials', TestimonialController.getAll);

router.get('/testimonials/:id', TestimonialController.getById);

router.post('/testimonials', TestimonialController.addNew);

router.put('/testimonials/:id', TestimonialController.updateOne);

router.delete('/testimonials/:id', TestimonialController.updateOne);

module.exports = router;