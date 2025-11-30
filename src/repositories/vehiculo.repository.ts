import { getRepository } from 'typeorm';
import { Vehiculo } from '../models/entities/Vehiculo';

export class VehiculoRepository {
    private repository = getRepository(Vehiculo);

    async findAll(): Promise<Vehiculo[]> {
        return await this.repository.find();
    }

    async findById(id: number): Promise<Vehiculo | undefined> {
        return await this.repository.findOne(id);
    }

    async create(vehiculo: Vehiculo): Promise<Vehiculo> {
        return await this.repository.save(vehiculo);
    }

    async update(id: number, vehiculo: Partial<Vehiculo>): Promise<Vehiculo | undefined> {
        await this.repository.update(id, vehiculo);
        return this.findById(id);
    }

    async remove(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    async findByPlaca(placa: string): Promise<Vehiculo | undefined> {
        return await this.repository.findOne({ where: { placa } });
    }
}