import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthDto } from '../dto/auth.dto';

export class AuthController {
    async login(req: Request, res: Response): Promise<Response> {
        const authDto: AuthDto = req.body;

        try {
            const authService = new AuthService(); // Instanciar aquí, no en el constructor
            const result = await authService.login(authDto.email, authDto.password);
            if (!result) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }

            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: 'Error en el servidor' });
        }
    }

    async register(req: Request, res: Response): Promise<Response> {
        const authDto: AuthDto = req.body;

        try {
            const authService = new AuthService(); // Instanciar aquí
            const newUser = await authService.register(authDto.nombre, authDto.email, authDto.password, authDto.id_rol);
            
            // Confirmación visual del registro exitoso (Historia 1)
            return res.status(201).json({
                message: 'Usuario registrado exitosamente',
                usuario: {
                    id: newUser.id_usuario,
                    nombre: newUser.nombre,
                    email: newUser.email,
                    rol: newUser.id_rol
                }
            });
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error al registrar el usuario';
            
            // Manejar error de email duplicado (Historia 1)
            if (msg.includes('ya está registrado')) {
                return res.status(409).json({ message: msg });
            }
            
            return res.status(500).json({ message: msg });
        }
    }
}

export const authController = new AuthController();