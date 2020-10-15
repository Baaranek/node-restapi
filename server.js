const express = require('express');
const { v1: uuidv1 } = require('uuid');
const db = require('./db');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/testimonials', (req, res) => {
  res.send(db.testimonials);
});

app.get('/testimonials/:id', (req, res) => {
  res.send(db.testimonials.filter( elem => elem.id == req.params.id));
});

app.get('/testimonials/random', () => {
  res.send(db.testimonials.filter( elem => elem.id == uuidv1()));
});

app.post('/testimonials', ( req, res) => {
  req.body.id = uuidv1();
  db.testimonials.push(req.body);
});

app.put('/testimonials/:id', (req ,res) => {
  db.testimonials.find( x => x.id == req.params.id).author = req.body.author;
  db.testimonials.find( x => x.id == req.params.id).text = req.body.text;
});

app.delete('/testimonials/:id', (req, res) => {
  const deletedElem = db.testimonials.find( x => x.id == req.params.id);
  const indexOfDeletedElem = db.testimonials.indexOf(deletedElem);
  db.testimonials.splice(indexOfDeletedElem, 1);
});

app.get('/concerts', (req, res) => {
  res.send(db.concerts);
});

app.get('/concerts/:id', (req, res) => {
  res.send(db.concerts.filter( item => item.id == req.params.id ));
});

app.post('/concerts',(req, res) => {
  req.body.id = uuidv1();
  db.concerts.push(req.body);
});

app.delete('/concerts/:id', (req, res) => {
  const deletedElem = db.concerts.find( item => item.id == req.params.id );
  const indexOfDeletedElem = db.concerts.indexOf(deletedElem);
  db.concerts.splice(1, indexOfDeletedElem);
});

app.put('/concerts/:id', (req, res) => {
  db.concerts.find( item => item.id == req.params.id).performer = req.body.performer;
  db.concerts.find( item => item.id == req.params.id).genre = req.body.genre;
  db.concerts.find( item => item.id == req.params.id).price = req.body.price;
  db.concerts.find( item => item.id == req.params.id).day = req.body.day;
  db.concerts.find( item => item.id == req.params.id).image = req.body.image;
});

app.get('/seats', (req, res) => {
  res.send(db.seats);
});

app.get('/seats/:id', (req, res) => {
  res.send(db.seats.filter( item => item.id == req.params.id ));
});

app.post('/seats',(req, res) => {
  req.body.id = uuidv1();
  db.seats.push(req.body);
});

app.delete('/seats/:id', (req, res) => {
  const deletedElem = db.seats.find( item => item.id == req.params.id );
  const indexOfDeletedElem = db.seats.indexOf(deletedElem);
  db.seats.splice(1, indexOfDeletedElem);
});

app.put('/concerts/:id', (req, res) => {
  db.concerts.find( item => item.id == req.params.id).day = req.body.day;
  db.concerts.find( item => item.id == req.params.id).seat = req.body.seat;
  db.concerts.find( item => item.id == req.params.id).client = req.body.client;
  db.concerts.find( item => item.id == req.params.id).email = req.body.email;
});

app.listen(8000);