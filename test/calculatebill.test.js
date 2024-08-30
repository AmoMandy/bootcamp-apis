







describe('Bootcamp API Tests', () => {
    // Test the Word Game API
    describe('GET /api/word_game', () => {
        it('should analyze a sentence correctly', (done) => {
            chai.request(app)
                .get('/api/word_game?sentence=the quick brown fox')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('longestWord');
                    expect(res.body).to.have.property('shortestWord');
                    expect(res.body).to.have.property('sum');
                    expect(res.body.longestWord).to.equal(5); // Assuming 'quick' is the longest word
                    expect(res.body.shortestWord).to.equal('the');
                    expect(res.body.sum).to.equal(19);
                    done();
                });
        });
    });

    // Test the Total Phone Bill API
    describe('POST /api/phonebill/total', () => {
        it('should calculate total phone bill', (done) => {
            chai.request(app)
                .post('/api/phonebill/total')
                .send({ bill: 'call,sms,call' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('total');
                    expect(res.body.total).to.equal('R6.15'); // 2.75 + 0.65 + 2.75
                    done();
                });
        });
    });

    // Test the Phone Bill Prices API
    describe('GET /api/phonebill/prices', () => {
        it('should return call and SMS prices', (done) => {
            chai.request(app)
                .get('/api/phonebill/prices')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.call).to.equal(2.75);
                    expect(res.body.sms).to.equal(0.65);
                    done();
                });
        });
    });

    // Test the Set Phone Bill Price API
    describe('POST /api/phonebill/price', () => {
        it('should set the price of call', (done) => {
            chai.request(app)
                .post('/api/phonebill/price')
                .send({ type: 'call', price: 3.00 })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.status).to.equal('success');
                    expect(res.body.message).to.include('The call was set to 3.00');
                    done();
                });
        });
    });

    // Test the Enough Airtime API
    describe('POST /api/enough', () => {
        it('should check if there is enough airtime', (done) => {
            chai.request(app)
                .post('/api/enough')
                .send({ usage: 'call,sms,call', available: 10 })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('result');
                    expect(res.body.result).to.equal(3.60); // Adjust calculation if necessary
                    done();
                });
        });
    });
});