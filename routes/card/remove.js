const express = require('express');
const router = express.Router();
const domainService = require('../../domain/card/remove');

const debug = require('debug')('card-api:remove');

router.delete('/:reference', function (request, response) {
    return new Promise(async (resolve) => {
        resolve(domainService.createRequest(request));
    }).then((findRequest) => {
        domainService.validate(findRequest);

        return findRequest;
    }).then((findRequest) => {
        return domainService.call(findRequest)
    }).then((serviceResponse) => {
        return response.status(204).json(serviceResponse);
    }).catch(err => {
        debug(err);

        if (err.name === 'ValidationError') {
            return response.status(400).json({
                'message': err.message
            })
        }

        return response.status(503).json({
            'message': 'An error occurred. Please try again later.'
        })
    })
});

module.exports = router;
