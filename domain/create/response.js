module.exports = (card) => {
    return {
        currency: card.currency,
        balance: card.balance,
        activationDate: card.activationDate,
        expireDate: card.expireDate,
        reference: card.reference,
        cardNumber: card.cardNumber,
        cvc: card.cvc
    }
};