import { Usuario } from '../models/entities/Usuario';
import { Rol } from '../models/entities/Rol';
import { UsuarioRepository } from '../repositories/usuario.repository';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export class AuthService {
    async login(email: string, password: string): Promise<{ token: string; user: Usuario } | null> {
        const usuarioRepository = new UsuarioRepository(); // Instanciar en el método
        const user = await usuarioRepository.findByEmail(email);
        if (!user) {
            return null;
        }

        const isPasswordValid = await compare(password, user.contrasena);
        if (!isPasswordValid) {
            return null;
        }

        const token = this.generateToken(user);
        return { token, user };
    }

    private generateToken(user: Usuario): string {
        const payload = { id: user.id_usuario, rol: user.id_rol };
        return sign(payload, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
    }

    async register(nombre: string, email: string, password: string, id_rol: number): Promise<Usuario> {
        const usuarioRepository = new UsuarioRepository(); // Instanciar en el método
        
        // Validar que el email no esté previamente registrado (Historia 1)
        const existingUser = await usuarioRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('El email ya está registrado');
        }
        
        const hashedPassword = await this.hashPassword(password);
        const rolEntity = new Rol();
        rolEntity.id_rol = id_rol;
        const newUser = await usuarioRepository.create({ nombre, email, contrasena: hashedPassword, id_rol });
        return newUser;
    }

    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return await hash(password, saltRounds);
    }
}