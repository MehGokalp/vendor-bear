const express = require('express');
const router = express.Router();
const domainService = require('../domain/create');
const errorHandler = require('../handler/errorHandler');

router.post('/', function (request, response) {
    return Promise.resolve(domainService.createRequest(request))
        .then(createRequest => domainService.validate(createRequest))
        .then(createRequest => domainService.call(createRequest))
        .then(serviceResponse => response.status(201).json(serviceResponse))
        .catch(err => errorHandler(err, response))
});

module.exports = router;
