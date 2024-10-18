
import { Request, Response, NextFunction } from "express";
import { RequestWithUser } from "../../types/express";


export const authorizeRole = (...roles: string[]) => {
    return (req: RequestWithUser, res: Response, next: NextFunction): void => {
        const userRole = req.user ? req.user.role : 'anonymous';

        if (!userRole || !roles.includes(userRole)) {
            res.status(403).json({ message: "Forbidden: You do not have permission to perform this action." });
        }

        next(); // Continue to the next middleware or route handler
    };
};
