var app = require('express')();
var xrest = require('../../');
var request = require('supertest');


xrest(app);


request(app)
  .get('/')
  .end(function(err, res){
    if (err || res.text !== 'hello world') throw Error();
  });

request(app)
  .get('/about')
  .end(function(err, res){
    if (err || res.text !== 'we are a team of 6 billion') throw Error();
  });

request(app)
  .get('/10/info/')
  .end(function(err, res){
    if (err || res.text !== '10') throw Error();
  });


request(app)
  .post('/group/50')
  .end(function(err, res){
    if (err || res.text !== 'you have posted to group 50') throw Error();
  });


request(app)
  .put('/school/class/eco100')
  .end(function(err, res){
    if (err || res.text !== "new class eco100 posted") throw Error();
  });

  