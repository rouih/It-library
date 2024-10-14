import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { RequestWithUser } from "../../types/express";

export const authMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        req.user = user;
        next();
    })(req, res, next);
};
