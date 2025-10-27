export class InvalidParameterError extends Error {
    constructor(message = 'Invalid parameters.') {
        super(message);
        this.name = 'InvalidParameterError';
    }
}

export class DatabaseConnectionError extends Error {
    constructor(message = 'Database connection error.') {
        super(message);
        this.name = 'DatabaseConnectionError';
    }
}

export class EntityNotFound extends Error {
    constructor(message = 'Entity not found') {
        super(message);
        this.name = 'EntityNotFound';
    }
}
