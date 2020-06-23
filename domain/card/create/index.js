const validator = require('../../../service/validator');
const cardRepository = require('../../../repository/card');
const cardService = require('../../../service/card');

const { ValidationError } = require('../../../errors');

module.exports = {
    createRequest: request => {
        return {
            balance: request.body.balance,
            activationDate: request.body.activationDate,
            expireDate: request.body.expireDate,
            currency: request.body.currency,
        };
    },
    validate: request => {
        const isValid = validator.validate('createCard', request);

        if (isValid === false) {
            throw new ValidationError(validator.errorsText());
        }
    },
    call: async request => {
        await cardService.populate(request);
        const card = await cardRepository.create(request);

        return {
            currency: card.currency,
            balance: card.balance,
            activationDate: card.activationDate,
            expireDate: card.expireDate,
            reference: card.reference,
            cardNumber: card.cardNumber,
            cvc: card.cvc
        };
    }
};
