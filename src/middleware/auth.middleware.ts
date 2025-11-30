import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { Usuario } from '../models/entities/Usuario';

declare global {
    namespace Express {
        interface Request {
            user?: Usuario;
        }
    }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
        return;
    }

    verify(token, process.env.JWT_SECRET || 'default_secret', async (err, decoded) => {
        if (err) {
            res.status(403).json({ message: 'Token no válido.' });
            return;
        }

        try {
            const usuarioRepository = getRepository(Usuario);
            const usuario = await usuarioRepository.findOne({ where: { id_usuario: (decoded as any).id } });
            if (!usuario) {
                res.status(404).json({ message: 'Usuario no encontrado.' });
                return;
            }

            req.user = usuario;
            next();
        } catch (error) {
            res.status(500).json({ message: 'Error al verificar el usuario.' });
        }
    });
};

export default authMiddleware;