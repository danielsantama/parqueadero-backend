import { getConnection } from 'typeorm';
import { EstadoCelda } from '../models/entities/EstadoCelda';

export class EstadoCeldaRepository {
    async findAll(): Promise<EstadoCelda[]> {
        const connection = getConnection();
        return await connection.getRepository(EstadoCelda).find();
    }

    async findById(id: number): Promise<EstadoCelda | undefined> {
        const connection = getConnection();
        return await connection.getRepository(EstadoCelda).findOne(id);
    }

    async create(estadoCelda: EstadoCelda): Promise<EstadoCelda> {
        const connection = getConnection();
        return await connection.getRepository(EstadoCelda).save(estadoCelda);
    }

    async update(id: number, estadoCelda: Partial<EstadoCelda>): Promise<EstadoCelda | undefined> {
        const connection = getConnection();
        await connection.getRepository(EstadoCelda).update(id, estadoCelda);
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        const connection = getConnection();
        await connection.getRepository(EstadoCelda).delete(id);
    }
}