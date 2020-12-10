const validator = require('../../../service/validator');
const cardRepository = require('../../../repository/card');

const { ResourceNotFoundError, ResourceNotActivatedError, ValidationError } = require('../../../errors');

module.exports = {
    createRequest: request => {
        return {
            reference: request.params.reference
        };
    },
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

        return {
            currency: card.currency,
            balance: card.balance,
            activationDate: card.activationDate,
            expireDate: card.expireDate,
            reference: card.reference,
            cardNumber: card.cardNumber,
            cvc: card.cvc,
            isExpired: card.isExpired()
        };
    }
};
