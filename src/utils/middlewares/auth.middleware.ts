import { passport } from "../../utils/middlewares/passport.config";
import { Request, Response, NextFunction } from "express";
import { RequestWithUser } from "../../types/express";
import logger from "../winston-logger";

export const authMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err || !user) {
            logger.error(err ? err.message : "Unauthorized: Invalid token");
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        req.user = user;
        req.logIn = user.logIn;
        next();
    })(req, res, next);
};
