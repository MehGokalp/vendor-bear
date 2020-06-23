const idGenerator = require('uniqid');
const utils = require('../service/utils');


/**
 * @param card Mongo scheme
 */

const populate = (card) => {
    if (!card.reference) {
        card.reference = idGenerator().slice(0, 16);
    }

    if (!card.cardNumber) {
        card.cardNumber = utils.generateCreditCardNumber();
    }

    if (!card.cvc) {
        card.cvc = utils.generateCVC();
    }
};

module.exports = {
    populate: populate
};
