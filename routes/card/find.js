const express = require('express');
const router = express.Router();
const domainService = require('../../domain/card/find');

const debug = require('debug')('card-api:find');

router.get('/:reference', function (request, response) {
    return new Promise(async (resolve) => {
        resolve(domainService.createRequest(request));
    }).then((findRequest) => {
        domainService.validate(findRequest);

        return findRequest;
    }).then((findRequest) => {
        return domainService.call(findRequest)
    }).then((serviceResponse) => {
        return response.status(200).json(serviceResponse);
    }).catch(err => {
        if (err.name === 'ValidationError') {
            return response.status(400).json({
                'message': 'Your request is not valid. Please check your request.'
            })
        }

        if (err.name === 'ResourceNotFoundError') {
            return response.status(404).json({
                'message': err.message
            })
        }

        if (err.name === 'ResourceNotActivated') {
            return response.status(200).json({
                'message': err.message
            })
        }

        debug(err);
        return response.status(503).json({
            'message': 'An error occurred. Please try again later.'
        })
    })
});

module.exports = router;
