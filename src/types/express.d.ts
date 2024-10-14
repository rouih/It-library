import { Request } from 'express';

// declare global {
//     namespace Express {
//         interface Request {
//             user?: {
//                 id: string;
//                 role: string;
//             };
//         }
//     }
// }

interface RequestWithUser extends Request {
    user: {
        id: string;
        role: string;
    };
}

export { RequestWithUser };