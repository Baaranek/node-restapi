const {expect} = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const Concert = require('../../models/concert.model');

chai.use(chaiHttp);

const request = chai.request;

describe('GET /api/concerts', () => {

  before(async () => {
    const testDepOne = new Concert({ 
      performer: 'John Doe', 
      genre: 'Rock',
      price: 20, 
      day: 1, 
      image: 'assets/img/img.png'});
    await testDepOne.save();
  
    const testDepTwo = new Concert({  
      performer: 'Bob Bobson', 
      genre: 'Classical',
      price: 30, 
      day: 1, 
      image: 'assets/img/photo.png'});
    await testDepTwo.save();
  });

  it('should return all concerts for :performer', async () => {
    const res = await request(server).get('/api/concerts/performer/John+Doe');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);

  });

  it('should return all concerts for :genre', async () => {
    const res = await request(server).get('/api/concerts/genre/Rock');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);

  });

  it('should return all concerts between prices', async () => {
    const res = await request(server).get('/api/concerts/price/10/50');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('should return all concerts for day', async () => {
    const res = await request(server).get('/api/concerts/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  after(async () => {
    await Concert.deleteMany();
  });
});