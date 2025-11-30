import { getRepository } from 'typeorm';
import { Usuario } from '../models/entities/Usuario';
import { hash } from 'bcryptjs';

export class UsuarioService {
    async getUserProfile(userId: number): Promise<Usuario | null> {
        const repo = getRepository(Usuario);
        const usuario = await repo.findOne({
            where: { id_usuario: userId },
            relations: ['rol'],
        });
        return usuario ?? null;
    }

    async getAllUsers(): Promise<Usuario[]> {
        const repo = getRepository(Usuario);
        return await repo.find({ relations: ['rol'] });
    }

    async createUser(nombre: string, email: string, password: string, rol: number): Promise<Usuario> {
        const repo = getRepository(Usuario);
        
        // Validar que el email no esté previamente registrado
        const existingUser = await repo.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('El email ya está registrado');
        }
        
        // Hash de la contraseña
        const hashedPassword = await hash(password, 10);
        
        const newUser = repo.create({
            nombre,
            email,
            contrasena: hashedPassword,
            id_rol: rol
        });
        
        return await repo.save(newUser);
    }

    async getUserById(id: number): Promise<Usuario | null> {
        const repo = getRepository(Usuario);
        const usuario = await repo.findOne({
            where: { id_usuario: id },
            relations: ['rol'],
        });
        return usuario ?? null;
    }

    async updateUser(id: number, userData: Partial<Usuario>): Promise<Usuario | null> {
        const repo = getRepository(Usuario);
        const usuario = await repo.findOne({ where: { id_usuario: id } });

        if (!usuario) return null;

        repo.merge(usuario, userData);
        return await repo.save(usuario);
    }

    async deleteUser(id: number): Promise<boolean> {
        const repo = getRepository(Usuario);
        const usuario = await repo.findOne({ where: { id_usuario: id } });

        if (!usuario) return false;

        await repo.remove(usuario);
        return true;
    }
}