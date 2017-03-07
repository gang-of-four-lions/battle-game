"use strict";
const expect = require('chai').expect;
const app = require('../server/server.js');
const request = require('supertest');

describe('server', function() {
  it('GET "/" should return the landing page', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .end(done);
  });
});
