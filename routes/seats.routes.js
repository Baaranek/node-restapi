const express = require('express');
const router = express.Router();
const db = require('../db');
const { v1: uuidv1 } = require('uuid');

router.route('/seats').get((req, res) => {
  res.send(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.send(db.seats.filter( elem => elem.id == req.params.id));
});

router.route('/seats').post((req, res) => {
  req.body.id = uuidv1();
  db.seats.push(req.body);
});

router.route('/seats/:id').put((req, res) => {
  db.seats.find( item => item.id == req.params.id).day = req.body.day;
  db.seats.find( item => item.id == req.params.id).seat = req.body.seat;
  db.seats.find( item => item.id == req.params.id).client = req.body.client;
  db.seats.find( item => item.id == req.params.id).email = req.body.email;
});

router.route('/seats/:id').delete((req, res) => {
  const deletedElem = db.seats.find( item => item.id == req.params.id );
  const indexOfDeletedElem = db.seats.indexOf(deletedElem);
  db.seats.splice(1, indexOfDeletedElem);
});

module.exports = router;