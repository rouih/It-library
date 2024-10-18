import { Request } from 'express';

interface RequestWithUser extends Request {
    user: {
        id: string;
        role: string;
    },
    //    logIn?: (user: any, cb: (err?: any) => void) => void;

}

export { RequestWithUser };