const express = require('express');
const { v1: uuidv1 } = require('uuid');

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/testimonials', (req, res) => {
  res.send(db);
});

app.get('/testimonials/:id', (req, res) => {
  res.send(db.filter( elem => elem.id == req.params.id));
});

app.get('/testimonials/random', () => {
  res.send(db.filter( elem => elem.id == uuidv1()));
});

app.post('/testimonials', ( req, res) => {
  req.body.id = uuidv1();
  db.push(req.body);
});

app.put('/testimonials/:id', (req ,res) => {
  db.find( x => x.id == req.params.id).author = req.body.author;
  db.find( x => x.id == req.params.id).text = req.body.text;
});

app.delete('/testimonials/:id', (req, res) => {
  const deletedElem = db.find( x => x.id == req.params.id);
  const indexOfDeletedElem = db.indexOf(deletedElem);
  db.splice(indexOfDeletedElem, 1);
});


app.listen(8000);