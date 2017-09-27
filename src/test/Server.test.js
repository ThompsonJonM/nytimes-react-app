import { expect } from 'chai';
import request from 'supertest';
import server from './../../server';

it('Responds to /api/saved', (done) => {
    request(server)
        .delete('/api/saved')
        .expect(200, done);
});

it('Responds to /api/saved', (done) => {
    request(server)
        .post('/api/saved')
        .expect(200, done);
});

it('Responds to /api/saved', (done) => {
    request(server)
        .get('/api/saved')
        .expect(200, done);
});

it('Responds to /', (done) => {
    request(server)
        .get('/')
        .expect('./public/index.html', done);
});

it('Should provide 404 for all else', (done) => {
    request(server)
        .get('/breh')
        .expect(404, done);
});