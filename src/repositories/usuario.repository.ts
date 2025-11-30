import { getRepository, Repository } from 'typeorm';
import { Usuario } from '../models/entities/Usuario';

export class UsuarioRepository {
    private getRepo(): Repository<Usuario> {
        return getRepository(Usuario); // Obtener repo cuando se necesita, no en constructor
    }

    async findByEmail(email: string): Promise<Usuario | undefined> {
        return await this.getRepo().findOne({ where: { email } });
    }

    async create(userData: Partial<Usuario>): Promise<Usuario> {
        const repo = this.getRepo();
        const user = repo.create(userData);
        return await repo.save(user);
    }

    async findById(id: number): Promise<Usuario | undefined> {
        return await this.getRepo().findOne(id);
    }
}