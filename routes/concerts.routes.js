const express = require('express');
const router = express.Router();
const db = require('../db');
const { v1: uuidv1 } = require('uuid');

router.route('/concerts').get((req, res) => {
  res.send(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  res.send(db.concerts.filter( elem => elem.id == req.params.id));
});

router.route('/concerts').post((req, res) => {
  req.body.id = uuidv1();
  db.concerts.push(req.body);
});

router.route('/concerts/:id').put((req, res) => {
  db.concerts.find( item => item.id == req.params.id).performer = req.body.performer;
  db.concerts.find( item => item.id == req.params.id).genre = req.body.genre;
  db.concerts.find( item => item.id == req.params.id).price = req.body.price;
  db.concerts.find( item => item.id == req.params.id).day = req.body.day;
  db.concerts.find( item => item.id == req.params.id).image = req.body.image;
});

router.route('/concerts/:id').delete((req, res) => {
  const deletedElem = db.concerts.find( item => item.id == req.params.id );
  const indexOfDeletedElem = db.concerts.indexOf(deletedElem);
  db.concerts.splice(1, indexOfDeletedElem);
});

module.exports = router;