const validator = require('../../service/validator');

const schema = {
    properties: {
        reference: { type: 'string', pattern: '^\\w{15}$' }
    },
    required: [ 'reference' ]
};

validator.addSchema(schema, 'findCard');

module.exports = validator;