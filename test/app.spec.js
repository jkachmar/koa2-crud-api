import app from '../src/app';
import { expect } from 'chai';
import supertest from 'supertest';

const server = supertest.agent(app.listen());

describe('GET sensors', () => {
  it('should return a list of sensors', (done) => {
    server
      .get('/sensors')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.length.of.at.least(1);
        let i = 1;
        res.body.forEach((obj) => {
          expect(obj).to.have.property('id');
          expect(obj.id).to.equal(i); i += 1;

          expect(obj).to.have.property('location');

          expect(obj).to.have.property('paper_state');
          expect(obj.paper_state).to.equal('good');

          expect(obj).to.have.property('battery_state');
          expect(obj.battery_state).to.equal('good');

          expect(obj).to.have.property('created_at');
          expect(obj).to.have.property('updated_at');
          expect(obj.created_at).to.equal(obj.updated_at);
        });
        expect(res.body[0].uuid).to.equal(1234);
        expect(res.body[0].location).to.equal('4th Floor Mens');

        expect(res.body[1].uuid).to.equal(1107);
        expect(res.body[1].location).to.equal('4th Floor Womens');

        done();
      });
  });
});
