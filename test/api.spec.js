import 'babel-polyfill';
import supertest from 'supertest';
import 'should';
import 'should-http';

const server = supertest.agent("http://localhost:3000");

describe('API Integration Tests', function() {
    this.timeout(8000);

    it('should respond "Hello World" json message', done => {
        server.get("/")
            .expect("Content-type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.should.be.json();
                res.body.message.should.be.equal('Hello World');
                done();
            });
    });
    it('should respond "ResourceNotFound" json message', done => {
        server.get("/random")
            .expect("Content-type", /json/)
            .expect(404)
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(404);
                res.should.be.json();
                res.body.code.should.be.equal('ResourceNotFound');
                done();
            });
    });
    it('should respond default binary png image', done => {
        server.get("/webshot")
            .expect("Content-type", /png/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.should.have.header('content-type', 'image/png');
                Buffer.isBuffer(res.body).should.be.true();
                done();
            });
    });
    it('should respond parametrized binary png image', done => {
        server.get("/webshot?uri=https://www.w3.org&sizeX=1280&sizeY=720")
            .expect("Content-type", /png/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.should.have.header('content-type', 'image/png');
                Buffer.isBuffer(res.body).should.be.true();
                done();
            });
    });
    it('should respond "InternalServerError" json message', done => {
        server.get("/webshot?uri=http://zdxsdfcv")
            .expect("Content-type", /json/)
            .expect(500)
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(500);
                res.should.be.json();
                res.body.code.should.be.equal('InternalServerError');
                done();
            });
    });
    it('should respond "BadGatewayError" json message', done => {
        server.get("/webshot?uri=http://test.webshotify.endofline.ws")
            .expect("Content-type", /json/)
            .expect(502)
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(502);
                res.should.be.json();
                res.body.code.should.be.equal('BadGatewayError');
                done();
            });
    });
});
