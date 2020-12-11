const app = require('../app');
const request = require("supertest");
const connect = require('../database');
const luhn = require('luhn');
const moment = require('moment');

describe('Card CRUD', function() {
    let mongoose;
    let cardReference;

    const activationDate = moment().add(6, 'month').format('YYYY-MM-DD');
    const expireDate = moment().add(9, 'month').format('YYYY-MM-DD');
    const validateCardData = (response) => {
        expect(response.body).toHaveProperty('currency');
        expect(response.body.currency).toEqual('TRY');

        expect(response.body).toHaveProperty('balance');
        expect(response.body.balance).toEqual(100000);

        expect(response.body).toHaveProperty('activationDate');
        expect(moment(response.body.activationDate).format('YYYY-MM-DD')).toEqual(activationDate);

        expect(response.body).toHaveProperty('expireDate');
        expect(moment(response.body.expireDate).format('YYYY-MM-DD')).toEqual(expireDate);

        expect(response.body).toHaveProperty('reference');
        expect(response.body.reference).toMatch(/^\w{15}$/);

        expect(response.body).toHaveProperty('cardNumber');
        expect(luhn.validate(response.body.cardNumber)).not.toBeFalsy();

        expect(response.body).toHaveProperty('cvc');
        expect(response.body.cvc).toMatch(/^\d{3}$/);
    };

    beforeAll(async () => {
        mongoose = await connect();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('Create Card Successfully', async done => {
        const response = await request(app)
            .post('/')
            .send({
                "currency": "TRY",
                "balance": 100000,
                "activationDate": activationDate,
                "expireDate": expireDate
            })
            .set('Accept', 'application/json')
        ;

        expect(response.statusCode).toEqual(201);
        validateCardData(response);
        cardReference = response.body.reference;

        done();
    });

    // TODO create card with invalid data

    test('Create Card Validation Error', async done => {
        const response = await request(app)
            .post('/')
            .send({
                "currency": "EU",
                "activationDate": "NOT A VALID DATE",
                "expireDate": "expireDate"
            })
            .set('Accept', 'application/json')
        ;

        expect(response.statusCode).toEqual(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual('Your request is not valid. Please check your request.');

        done();
    });

    test('Find Card Successfully', async done => {
        const response = await request(app)
            .get(`/${cardReference}`)
            .set('Accept', 'application/json')
        ;

        expect(response.statusCode).toEqual(200);
        validateCardData(response);

        expect(response.body).toHaveProperty('isExpired');
        expect(response.body.isExpired).toBeFalsy();

        done();
    });

    test('Card Not Found', async done => {
        const response = await request(app)
            .get(`/a1b3c4g5fj54j4j`)
            .set('Accept', 'application/json')
        ;

        expect(response.statusCode).toEqual(404);

        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual('Resource Card not found with reference: a1b3c4g5fj54j4j was not found.');

        done();
    });

    test('Delete Card Successfully', async done => {
        const response = await request(app)
            .delete(`/${cardReference}`)
            .set('Accept', 'application/json')
        ;

        expect(response.statusCode).toEqual(204);

        done();
    });

    test('Delete Card Not Found', async done => {
        const response = await request(app)
            .delete(`/a1b3c4g5fj54j4j`)
            .set('Accept', 'application/json')
        ;

        expect(response.statusCode).toEqual(404);

        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual('Resource Card not found with reference: a1b3c4g5fj54j4j was not found.');

        done();
    });
});
