const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {

  try {
    res.json( await Seat.find())
  } catch (error) {
    res.status(500).json({ message:error });
  }
};

exports.getById = async (req, res) => {

  try {
    const dep = Seat.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.addNew = async (req, res) => {
  const { day, seat, client, email } = req.body;

  try {
    const newSeat = new Seat({ 
      day: day, 
      seat: seat, 
      client: client, 
      email: email})
    await newSeat.save();
    res.json({message: 'OK'});
  } catch (error){
    res.status(500).json({ message: error });
  };
};

exports.updateOne = async (req, res) => {
  const { day, seat, client, email } = req.body;

  try {
    const dep = await Seat.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else {
      await Seat.updateOne({ _id: req.params.id }, { $set: {
        day: day, 
        seat: seat, 
        client: client, 
        email: email }});
      res.json({ message: 'OK' });
    }
  } catch (error) {
    
  }
};

exports.deleteOne = async (req, res) => {

  try {
    await Seat.deleteOne({ _id : req.params.id });
      res.json({ message: 'OK' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};