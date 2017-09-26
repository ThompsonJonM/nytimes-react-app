import { expect } from 'chai';
import request from 'supertest';

describe('Listen', function() {
    var server;

    beforeEach(function() {
        server = require('./../../server');
    });

    afterEach(function() {
        server.close();
    });

    it('Responds to /', function testSlash(done) {
        request(server)
            .get('/')
            .expect(200, done);
    });

    it('Should provide 404 for all else', function testPath(done) {
        request(server)
            .get('/breh')
            .expect(404, done);
    });
});