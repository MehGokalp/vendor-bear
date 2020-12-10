const express = require('express');
const router = express.Router();
const domainService = require('../domain/remove');
const errorHandler = require('../handler/errorHandler');

router.delete('/:reference', function (request, response) {
    return Promise.resolve(domainService.createRequest(request))
        .then(findRequest => domainService.validate(findRequest))
        .then(findRequest => domainService.call(findRequest))
        .then(serviceResponse => response.status(204).json(serviceResponse))
        .catch(err => errorHandler(err, response))
});

module.exports = router;
