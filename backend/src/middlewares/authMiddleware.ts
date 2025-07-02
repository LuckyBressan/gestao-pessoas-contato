import { ErrorMessage } from '@/@types/Error';
import { Request, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken: RequestHandler = (req: AuthRequest, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({
            error: {
                title: 'Token não fornecido.'
            }
        } as ErrorMessage)
        return
    }

    jwt.verify(
        token as string,
        process.env.JWT_SECRET as string,
        (err, user) => {
            if (err) {
                res.status(403).json({
                    error: {
                        title: 'Token inválido'
                    }
                } as ErrorMessage)
                return
            }
            req.user = user;
            next();
        }
    );
}
