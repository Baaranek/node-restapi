const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {

  try {
    res.json( await Testimonial.find())
  } catch (error) {
    res.status(500).json({ message:error });
  }
};

exports.getById = async (req, res) => {

  try {
    const dep = Testimonial.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.addNew = async (req, res) => {
  const { author, text } = req.body;

  try {
    const newTestimonial = new Testimonial({ 
      author: author, 
      text: text})
    await newTestimonial.save();
    res.json({message: 'OK'});
  } catch (error){
    res.status(500).json({ message: error });
  };
};

exports.updateOne = async (req, res) => {
  const { author, text } = req.body;

  try {
    const dep = await Testimonial.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else {
      await Testimonial.updateOne({ _id: req.params.id }, { $set: {
        author: author, 
        text: text}});
      res.json({ message: 'OK' });
    }
  } catch (error) {
    
  }
};

exports.deleteOne = async (req, res) => {

  try {
    await Testimonial.deleteOne({ _id : req.params.id });
      res.json({ message: 'OK' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};