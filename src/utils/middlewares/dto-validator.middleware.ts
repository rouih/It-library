import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export const validateDto = (dtoClass: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const dtoInstance = plainToInstance(dtoClass, req.body);

        // Use a promise chain to handle async behavior
        validate(dtoInstance).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                return res.status(400).json({
                    message: 'Validation failed',
                    errors: errors.map(error => ({
                        property: error.property,
                        constraints: error.constraints,
                    })),
                });
            }

            // If validation succeeds, proceed to the next middleware/controller
            next();
        }).catch((err) => {
            // Handle any unexpected errors
            return res.status(500).json({ message: 'Internal Server Error' });
        });
    };
};
