import { getConnection } from 'typeorm';
import { Cliente } from '../models/entities/Cliente';

export class ClienteRepository {
    async findAll(): Promise<Cliente[]> {
        const connection = getConnection();
        return await connection.getRepository(Cliente).find();
    }

    async findById(id: number): Promise<Cliente | undefined> {
        const connection = getConnection();
        return await connection.getRepository(Cliente).findOne(id);
    }

    async create(cliente: Cliente): Promise<Cliente> {
        const connection = getConnection();
        return await connection.getRepository(Cliente).save(cliente);
    }

    async update(id: number, cliente: Partial<Cliente>): Promise<Cliente | undefined> {
        const connection = getConnection();
        await connection.getRepository(Cliente).update(id, cliente);
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        const connection = getConnection();
        await connection.getRepository(Cliente).delete(id);
    }
}