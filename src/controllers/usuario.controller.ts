import { Request, Response } from 'express';
import { UsuarioService } from '../services/usuario.service';

export class UsuarioController {
    public async fetchUserProfile(req: Request, res: Response): Promise<Response> {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Usuario no autenticado' });
            }

            const usuarioService = new UsuarioService();
            const profile = await usuarioService.getUserProfile(req.user.id_usuario);

            if (!profile) {
                return res.status(404).json({ message: 'Perfil de usuario no encontrado' });
            }

            return res.status(200).json(profile);
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            return res.status(500).json({ message: 'Error al obtener el perfil', error: msg });
        }
    }

    public async obtenerUsuarios(req: Request, res: Response): Promise<Response> {
        try {
            const usuarioService = new UsuarioService();
            const usuarios = await usuarioService.getAllUsers();
            return res.status(200).json(usuarios);
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            return res.status(500).json({ message: 'Error al obtener usuarios', error: msg });
        }
    }

    public async crearUsuario(req: Request, res: Response): Promise<Response> {
        try {
            const { nombre, email, password, rol } = req.body;
            const usuarioService = new UsuarioService();
            const nuevoUsuario = await usuarioService.createUser(nombre, email, password, rol);
            
            return res.status(201).json({
                message: 'Usuario creado exitosamente',
                usuario: {
                    id: nuevoUsuario.id_usuario,
                    nombre: nuevoUsuario.nombre,
                    email: nuevoUsuario.email,
                    id_rol: nuevoUsuario.id_rol
                }
            });
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            
            if (msg.includes('ya está registrado')) {
                return res.status(409).json({ message: msg });
            }
            
            return res.status(500).json({ message: 'Error al crear usuario', error: msg });
        }
    }

    public async obtenerUsuarioPorId(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const usuarioService = new UsuarioService();
            const usuario = await usuarioService.getUserById(Number(id));

            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            return res.status(200).json(usuario);
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            return res.status(500).json({ message: 'Error al obtener usuario', error: msg });
        }
    }

    public async actualizarUsuario(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { nombre, email, rol } = req.body;
            
            const usuarioData: any = {};
            if (nombre) usuarioData.nombre = nombre;
            if (email) usuarioData.email = email;
            if (rol) usuarioData.id_rol = rol;
            
            const usuarioService = new UsuarioService();
            const usuarioActualizado = await usuarioService.updateUser(Number(id), usuarioData);

            if (!usuarioActualizado) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            return res.status(200).json(usuarioActualizado);
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            return res.status(500).json({ message: 'Error al actualizar usuario', error: msg });
        }
    }

    public async eliminarUsuario(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const usuarioService = new UsuarioService();
            const resultado = await usuarioService.deleteUser(Number(id));

            if (!resultado) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            return res.status(204).send();
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            return res.status(500).json({ message: 'Error al eliminar usuario', error: msg });
        }
    }
}

export const usuarioController = new UsuarioController();