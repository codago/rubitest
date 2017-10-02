'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');
const Phonebook = require("../models/phonebook");

const should = chai.should();
chai.use(chaiHTTP);

describe('phonebooks', function(){
  Phonebook.collection.drop();

  beforeEach(function(done){
    let phonebook = new Phonebook({
      name: 'Rubi',
      phone: '08112237786'
    });
    phonebook.save(function(err){
      done();
    })
  })

  afterEach(function(done){
    Phonebook.collection.drop();
    done()
  })

  it('Should list ALL phonebooks on /phonebooks GET', function(done){
    chai.request(server)
    .get('/phonebooks')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('_id');
      res.body[0].should.have.property('name');
      res.body[0].should.have.property('phone');
      res.body[0].name.should.equal('Rubi');
      res.body[0].phone.should.equal('08112237786');
      done();
    })
  })

  it('should list a single phonebook on /phonebooks/<id> GET', function(done){
    let phonebook = new Phonebook({
      name: 'Reky',
      phone: '08112237788'
    });
    phonebook.save(function(err, data){
      chai.request(server)
      .get(`/phonebooks/${data.id}`)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('phone');
        res.body.name.should.equal('Reky');
        res.body.phone.should.equal('08112237788');
        res.body._id.should.equal(data.id);
        done();
      })
    })
  })

  it('should add a SINGLE phonebook on /phonebooks POST', function(done){
    chai.request(server)
    .post('/phonebooks')
    .send({'name': 'Superman', 'phone': '007'})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('SUCCESS');
      res.body.SUCCESS.should.be.a('object');
      res.body.SUCCESS.should.have.property('name');
      res.body.SUCCESS.should.have.property('phone');
      res.body.SUCCESS.should.have.property('_id');
      res.body.SUCCESS.name.should.equal('Superman');
      res.body.SUCCESS.phone.should.equal('007');
      done();
    })
  })

  it('should update a SINGLE phonebook on /phonebooks/<id> PUT', function(done){
    chai.request(server)
    .get('/phonebooks')
    .end(function(err, res){
      chai.request(server)
      .put(`/phonebooks/${res.body[0]._id}`)
      .send({'name': 'Batman'})
      .end(function(err, response){
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('UPDATED');
        response.body.UPDATED.should.be.a('object');
        response.body.UPDATED.should.have.property('name');
        response.body.UPDATED.should.have.property('_id');
        response.body.UPDATED.name.should.equal('Batman');
        done();
      })
    })
  })

  it('should delete a SINGLE phonebook on /phonebooks/<id> DELETE', function(done){
    chai.request(server)
    .get('/phonebooks')
    .end(function(err, res){
      chai.request(server)
      .delete(`/phonebooks/${res.body[0]._id}`)
      .end(function(err, response){
        response.should.have.status(200)
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('REMOVED');
        response.body.REMOVED.should.be.a('object');
        response.body.REMOVED.should.have.property('name');
        response.body.REMOVED.should.have.property('_id');
        response.body.REMOVED.name.should.equal('Rubi');
        done();
      })
    })
  })

})
