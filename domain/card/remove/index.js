const validator = require('../../../service/validator');
const cardRepository = require('../../../repository/card');

const { ResourceNotFoundError, ResourceNotActivatedError, ValidationError, InternalError } = require('../../../errors');

module.exports = {
    createRequest: request => {
        return {
            reference: request.params.reference
        };
    },
    validate: request => {
        const isValid = validator.validate('removeCard', request);

        if (isValid === false) {
            throw new ValidationError(validator.errorsText());
        }
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

        await cardRepository.remove({ reference: card.reference });
    }
};
