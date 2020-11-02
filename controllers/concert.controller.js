const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {

  try {
    res.json( await Concert.find())
  } catch (error) {
    res.status(500).json({ message:error });
  }
};

exports.getById = async (req, res) => {

  try {
    const dep = Concert.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.addNew = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  try {
    const newConcert = new Concert({ 
      performer: performer, 
      genre: genre, 
      price: price, 
      day: day, 
      image: image})
    await newConcert.save();
    res.json({message: 'OK'});
  } catch (error){
    res.status(500).json({ message: error });
  };
};

exports.updateOne = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  try {
    const dep = await Concert.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else {
      await Concert.updateOne({ _id: req.params.id }, { $set: {
        performer: performer, 
        genre: genre, 
        price: price, 
        day: day, 
        image: image }});
      res.json({ message: 'OK' });
    }
  } catch (error) {
    
  }
};

exports.deleteOne = async (req, res) => {

  try {
    await Product.deleteOne({ _id : req.params.id });
      res.json({ message: 'OK' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};