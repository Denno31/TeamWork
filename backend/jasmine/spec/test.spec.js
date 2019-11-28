/* eslint linebreak-style: ["error", "windows"] */
const request = require('request');
const server = require('../../app');
describe('server', () => {
  beforeAll(() => {
     
  });
  afterAll(()=> {
    
  });
  describe('POST /', () => {
    const data = {};
    beforeAll((done) => {
        request.get('http://localhost:4000/api/v1/user/signup', (err, res, body) => {
            data.status = res.statusCode;
            data.body = body;
            done();
        });
    });
    it('status 201', () => {
        expect(data.status).toBe(400);
    })
  });
});