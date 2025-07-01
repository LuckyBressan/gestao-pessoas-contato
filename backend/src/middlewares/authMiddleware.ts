import { Request, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken: RequestHandler = (req: AuthRequest, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Token não fornecido.' })
    }

    jwt.verify(
        token as string,
        process.env.JWT_SECRET as string,
        (err, user) => {
            if (err) return res.status(403).json({ message: 'Token inválido.' });
            req.user = user;
            next();
        }
    );
}
