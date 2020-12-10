const validator = require('../../service/validator');
const cardRepository = require('../../repository/card');
const requestFactory = require('./request');
const responseFactory = require('./response');
const { ResourceNotFoundError, ResourceNotActivatedError, ValidationError } = require('../../errors');

module.exports = {
    createRequest: request => requestFactory(request),
    validate: request => {
        const isValid = validator.validate('findCard', request);

        if (isValid === false) {
            throw new ValidationError(validator.errorsText());
        }

        return request;
    },
    call: async request => {
        const card = await cardRepository.find({ reference: request.reference });

        if (!card) {
            throw new ResourceNotFoundError(`Card not found with reference: ${request.reference}`);
        }

        if (card.isActive() === false) {
            throw new ResourceNotActivatedError(`Card is not activated yet. Reference: ${request.reference}`);
        }

        return responseFactory(card);
    }
};
