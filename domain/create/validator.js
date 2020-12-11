const validator = require('../../service/validator');

const schema = {
    properties: {
        balance: { type: 'integer' },
        // TODO: Add validation to activation date. It must greater then now
        activationDate: { type: 'string', format: 'date' },
        // TODO: Add validation to expire date. It must greater then activation date
        expireDate: { type: 'string', format: 'date' },
        currency: { type: 'string', pattern: 'TRY|EUR|USD' }
    },
    required: [ 'balance', 'activationDate', 'expireDate', 'currency' ]
};

validator.addSchema(schema, 'createCard');

module.exports = validator;