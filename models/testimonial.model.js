const mongoose = require('mongoose');

const testimonialSchema = mongoose.Schema({
  author: { type: String, required: true },
  text: { type: String},
});

module.exports = mongoose.model('Testimonial', testimonialSchema);