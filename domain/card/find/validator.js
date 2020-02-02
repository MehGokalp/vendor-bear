const validator = require('../../../service/validator');

const schema = {
    properties: {
        reference: { type: 'string', pattern: '^\\w{16}$' }
    },
    required: [ 'reference' ]
};

validator.addSchema(schema, 'findCard');
