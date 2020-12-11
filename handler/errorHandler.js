const debug = require('debug')('card-api');

module.exports = (err, response) => {
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
        return response.status(422).json({
            'message': err.message
        })
    }

    debug(err);
    return response.status(503).json({
        'message': 'An error occurred. Please try again later.'
    })
};
