import app from '../src/app';
import supertest from 'supertest';

const server = supertest.agent(app.listen());

describe('GET sensors', () => {
  it('should return valid JSON', (done) => {
    server
      .get('/sensors')
      .expect('Content-Type', /json/)
      .expect(200);
    done();
  });
});
