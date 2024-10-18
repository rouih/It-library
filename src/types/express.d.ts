import { Request } from 'express';

interface RequestWithUser extends Request {
    user: {
        id: string;
        role: string;
    };
}

export { RequestWithUser };