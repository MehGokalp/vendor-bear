const validator = require('./validator');
const cardRepository = require('../../repository/card');
const requestFactory = require('./request');
const {
    ResourceNotFoundError,
    ResourceNotActivatedError,
    ValidationError,
    InternalError
} = require('../../errors');

module.exports = {
    createRequest: request => requestFactory(request),
    validate: request => {
        const isValid = validator.validate('deleteCard', request);

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

        if (card.isExpired() === true) {
            throw new InternalError(`Expired cards can not remove. Reference: ${request.reference}`);
        }

        await cardRepository.delete({ reference: card.reference });
    }
};
