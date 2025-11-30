import { getConnection } from 'typeorm';
import { RegistroMovimiento } from '../models/entities/RegistroMovimiento';

export class RegistroMovimientoRepository {
    async createRegistroMovimiento(registroMovimientoData: Partial<RegistroMovimiento>): Promise<RegistroMovimiento> {
        const connection = getConnection();
        const registroMovimiento = connection.getRepository(RegistroMovimiento).create(registroMovimientoData);
        return await connection.getRepository(RegistroMovimiento).save(registroMovimiento);
    }

    async findAll(): Promise<RegistroMovimiento[]> {
        const connection = getConnection();
        return await connection.getRepository(RegistroMovimiento).find();
    }

    async findById(id: number): Promise<RegistroMovimiento | undefined> {
        const connection = getConnection();
        return await connection.getRepository(RegistroMovimiento).findOne(id);
    }

    async updateRegistroMovimiento(id: number, updateData: Partial<RegistroMovimiento>): Promise<RegistroMovimiento | undefined> {
        const connection = getConnection();
        await connection.getRepository(RegistroMovimiento).update(id, updateData);
        return this.findById(id);
    }

    async deleteRegistroMovimiento(id: number): Promise<void> {
        const connection = getConnection();
        await connection.getRepository(RegistroMovimiento).delete(id);
    }
}