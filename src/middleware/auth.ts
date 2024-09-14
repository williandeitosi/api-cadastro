import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
// TODO: read and understand that happens here
export interface IGetUserAuthInfoRequest extends Request {
    user: any 
  }

export const authenticateJWT = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        const user = verifyToken(token);

        if (user) {
            req.user = user;
            next();
        } else {
            res.sendStatus(403); // Forbidden
        }
    } else {
        res.sendStatus(401); // Unauthorized
    }
};
