'use strict';

/**
 * @see: https://rclayton.silvrback.com/custom-errors-in-node-js
 */

class DomainError extends Error {
    constructor(message) {
        super(message);

        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}

class ResourceNotFoundError extends DomainError {
    constructor(resource, query) {
        super(`Resource ${resource} was not found.`);
        this.data = { resource, query };
    }
}

class ResourceNotActivatedError extends DomainError {
    constructor(resource, query) {
        super(`Resource ${resource} was not found.`);
        this.data = { resource, query };
    }
}

class ValidationError extends DomainError {
    constructor(resource, query) {
        super(`Resource ${resource} was not found.`);
        this.data = { resource, query };
    }
}

class InternalError extends DomainError {
    constructor(error) {
        super(error.message);
        this.data = { error };
    }
}

module.exports = {
    ResourceNotFoundError,
    ResourceNotActivatedError,
    ValidationError,
    InternalError,
};
