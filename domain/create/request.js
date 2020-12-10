module.exports = (request) => {
    return {
        balance: request.body.balance,
        activationDate: request.body.activationDate,
        expireDate: request.body.expireDate,
        currency: request.body.currency,
    }
};