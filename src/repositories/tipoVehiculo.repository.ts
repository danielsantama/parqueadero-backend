import { getConnection } from 'typeorm';
import { TipoVehiculo } from '../models/entities/TipoVehiculo';

export class TipoVehiculoRepository {
    async findAll(): Promise<TipoVehiculo[]> {
        const connection = getConnection();
        return await connection.getRepository(TipoVehiculo).find();
    }

    async findById(id: number): Promise<TipoVehiculo | undefined> {
        const connection = getConnection();
        return await connection.getRepository(TipoVehiculo).findOne(id);
    }

    async create(tipoVehiculo: TipoVehiculo): Promise<TipoVehiculo> {
        const connection = getConnection();
        return await connection.getRepository(TipoVehiculo).save(tipoVehiculo);
    }

    async update(id: number, tipoVehiculo: Partial<TipoVehiculo>): Promise<TipoVehiculo | undefined> {
        const connection = getConnection();
        await connection.getRepository(TipoVehiculo).update(id, tipoVehiculo);
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        const connection = getConnection();
        await connection.getRepository(TipoVehiculo).delete(id);
    }
}