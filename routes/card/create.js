const express = require('express');
const router = express.Router();
const domainService = require('../../domain/card/create');

const debug = require('debug')('card-api:create');

router.post('/create', function (request, response) {
    return new Promise(async (resolve) => {
        resolve(domainService.createRequest(request));
    }).then((createRequest) => {
        domainService.validate(createRequest);

        return createRequest;
    }).then((createRequest) => {
        return domainService.call(createRequest)
    }).then((serviceResponse) => {
        return response.status(201).json(serviceResponse);
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
