const express = require('express');
const router = express.Router();
const domainService = require('../domain/find');
const errorHandler = require('../handler/errorHandler');

router.get('/:reference', function (request, response) {
    return Promise.resolve(domainService.createRequest(request))
        .then(findRequest => domainService.validate(findRequest))
        .then(findRequest => domainService.call(findRequest))
        .then((serviceResponse) => response.status(200).json(serviceResponse))
        .catch(err => errorHandler(err, response))
});

module.exports = router;
