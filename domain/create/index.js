const validator = require('../../service/validator');
const cardRepository = require('../../repository/card');
const cardService = require('../../service/card');
const requestFactory = require('./request');
const responseFactory = require('./response');
const { ValidationError } = require('../../errors');

module.exports = {
    createRequest: request => requestFactory(request),
    validate: request => {
        const isValid = validator.validate('createCard', request);

        if (isValid === false) {
            throw new ValidationError(validator.errorsText());
        }

        return request;
    },
    call: async request => {
        await cardService.populate(request);
        const card = await cardRepository.create(request);

        return responseFactory(card);
    }
};
