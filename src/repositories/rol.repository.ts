import { getRepository } from 'typeorm';
import { Rol } from '../models/entities/Rol';

export class RolRepository {
    private rolRepository = getRepository(Rol);

    async findAll(): Promise<Rol[]> {
        return await this.rolRepository.find();
    }

    async findById(id: number): Promise<Rol | undefined> {
        return await this.rolRepository.findOne(id);
    }

    async create(rol: Rol): Promise<Rol> {
        return await this.rolRepository.save(rol);
    }

    async update(id: number, rol: Partial<Rol>): Promise<Rol | undefined> {
        await this.rolRepository.update(id, rol);
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.rolRepository.delete(id);
    }
}