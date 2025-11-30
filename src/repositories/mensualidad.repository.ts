import { getConnection } from 'typeorm';
import { Mensualidad } from '../models/entities/Mensualidad';

export class MensualidadRepository {
    async create(mensualidadData: Partial<Mensualidad>): Promise<Mensualidad> {
        const connection = getConnection();
        const mensualidad = connection.manager.create(Mensualidad, mensualidadData);
        return await connection.manager.save(mensualidad);
    }

    async findById(id: number): Promise<Mensualidad | undefined> {
        const connection = getConnection();
        return await connection.manager.findOne(Mensualidad, id);
    }

    async findAll(): Promise<Mensualidad[]> {
        const connection = getConnection();
        return await connection.manager.find(Mensualidad);
    }

    async update(id: number, mensualidadData: Partial<Mensualidad>): Promise<Mensualidad | undefined> {
        const connection = getConnection();
        await connection.manager.update(Mensualidad, id, mensualidadData);
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        const connection = getConnection();
        await connection.manager.delete(Mensualidad, id);
    }
}