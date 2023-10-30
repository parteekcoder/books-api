import chai from 'chai';
import chaiHTTP from 'chai-http';
import server from '../server.js';

process.env.NODE_ENV = 'test'
chai.use(chaiHTTP);
chai.should();

let fakeBook = {
    title: 'title1',
    author: 'author1',
    summary: 'This is the book summary'

}

describe('POST /book', () => {
    it('should not create book if author and title not provided', (done) => {
        chai.request(server).post('/book')
            .end((err, res) => {
                res.status.should.be.equal(400);
                res.body.success.should.be.equal(false);
                done();
            });
    });
    
    it('should create book if both provided without summary', (done) => {
        chai.request(server).post('/book')
            .send({
                title: fakeBook.title,
                author: fakeBook.author
            })
            .end((err, res) => {
                res.status.should.be.equal(201);
                res.body.success.should.be.equal(true);
                res.body.data.should.not.be.eql(undefined);
                res.body.data.should.have.property('_id').not.eql(undefined);
                res.body.data.should.have.property('title').eql(fakeBook.title);
                res.body.data.should.have.property('author').eql(fakeBook.author);
                fakeBook = res.body.data;
                done();
            });
    });
});

describe('GET /book', () => {
    it('should not return book if invalid id provided', (done) => {
        chai.request(server).get('/book/653f9b648231485f26e93954')
            .end((err, res) => {
                res.status.should.be.equal(404);
                res.body.success.should.be.equal(false);
                done();
            });
    });
    
    it('should return book if valid id provided', (done) => {
        chai.request(server).get('/book/'+fakeBook._id)
            .end((err, res) => {
                res.status.should.be.equal(200);
                res.body.success.should.be.equal(true);
                res.body.data.should.not.be.eql(undefined);
                res.body.data.should.have.property('title').eql(fakeBook.title);
                res.body.data.should.have.property('author').eql(fakeBook.author);
                fakeBook = res.body.data;
                done();
            });
    });
});

describe('DELETE /book', () => {
    it('should not delete book if id not provided', (done) => {
        chai.request(server).delete('/book')
        .end((err, res) => {
                res.status.should.be.equal(400);
                res.body.success.should.be.equal(false);
                done();
            });
    });
    it('should not delete book if invalid id provided', (done) => {
        chai.request(server).delete('/book/653f9b648231485f25e93954')
        .end((err, res) => {
                res.status.should.be.equal(404);
                res.body.success.should.be.equal(false);
                done();
            });
    });
    
    it('should delete book if valid id provided', (done) => {
        chai.request(server).delete('/book/'+fakeBook._id)
            .end((err, res) => {
                res.status.should.be.equal(200);
                res.body.success.should.be.equal(true);
                res.body.data.should.not.be.eql(undefined);
                done();
            });
    });
});