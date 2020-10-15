const express = require('express');
const router = express.Router();
const db = require('../db');
const { v1: uuidv1 } = require('uuid');

router.route('/testimonials').get((req, res) => {
  res.send(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
  res.send(db.testimonials.filter( elem => elem.id == req.params.id));
});

router.route('/testimonials/random').get((req, res) => {
  res.send(db.testimonials.filter( elem => elem.id == uuidv1()));
});

router.route('/testimonials').post((req, res) => {
  req.body.id = uuidv1();
  db.testimonials.push(req.body);
});

router.route('/testimonials/:id').put((req, res) => {
  db.testimonials.find( x => x.id == req.params.id).author = req.body.author;
  db.testimonials.find( x => x.id == req.params.id).text = req.body.text;
});

router.route('/testimonials/:id').delete((req, res) => {
  const deletedElem = db.testimonials.find( x => x.id == req.params.id);
  const indexOfDeletedElem = db.testimonials.indexOf(deletedElem);
  db.testimonials.splice(indexOfDeletedElem, 1);
});

module.exports = router;