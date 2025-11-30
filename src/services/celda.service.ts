import { getRepository } from 'typeorm';
import { Celda } from '../models/entities/Celda';
import { EstadoCeldaEnum } from '../enums/estado-celda.enum';

export class CeldaService {
    async getAvailableCells(): Promise<Celda[]> {
        const repo = getRepository(Celda);
        
        // Buscar celdas donde el estado sea Disponible
        const celdas = await repo
            .createQueryBuilder('celda')
            .where('celda.id_estado = :estadoId', { estadoId: EstadoCeldaEnum.Disponible })
            .getMany();
        
        return celdas;
    }

    async getAllCells(): Promise<Celda[]> {
        const repo = getRepository(Celda);
        return await repo
            .createQueryBuilder('celda')
            .leftJoinAndSelect('celda.registros', 'registros')
            .getMany();
    }

    // Historia 5: Filtrar celdas por tipo de vehículo y estado
    async getCellsByFilters(idTipoVehiculo?: number, idEstado?: number): Promise<Celda[]> {
        const repo = getRepository(Celda);
        const query = repo.createQueryBuilder('celda');

        if (idTipoVehiculo) {
            query.andWhere('celda.id_tipo_vehiculo = :idTipoVehiculo', { idTipoVehiculo });
        }

        if (idEstado) {
            query.andWhere('celda.id_estado = :idEstado', { idEstado });
        }

        return await query.getMany();
    }

    async getCellById(id: number): Promise<Celda | null> {
        const repo = getRepository(Celda);
        const celda = await repo
            .createQueryBuilder('celda')
            .where('celda.id_celda = :id', { id })
            .getOne();
        
        return celda ?? null;
    }

    // Historia 3: Crear celda con validación de nombre único
    async createCell(celdaData: Partial<Celda>): Promise<Celda> {
        const repo = getRepository(Celda);
        
        // Validar que el nombre de celda sea único (Historia 3)
        if (celdaData.nombre_celda) {
            const existingCell = await repo.findOne({
                where: { nombre_celda: celdaData.nombre_celda }
            });
            
            if (existingCell) {
                throw new Error('El nombre de celda ya existe');
            }
        }
        
        const nuevaCelda = repo.create(celdaData as Celda);
        return await repo.save(nuevaCelda);
    }

    async updateCell(id: number, celdaData: Partial<Celda>): Promise<Celda | null> {
        const repo = getRepository(Celda);
        const celda = await repo.findOne({ where: { id_celda: id } });

        if (!celda) return null;

        // Validar nombre único si se está actualizando (Historia 3)
        if (celdaData.nombre_celda && celdaData.nombre_celda !== celda.nombre_celda) {
            const existingCell = await repo.findOne({
                where: { nombre_celda: celdaData.nombre_celda }
            });
            
            if (existingCell) {
                throw new Error('El nombre de celda ya existe');
            }
        }

        repo.merge(celda, celdaData);
        return await repo.save(celda);
    }

    // Historia 4: Actualizar estado de celda con validaciones
    async updateCellStatus(id: number, nuevoEstado: number): Promise<Celda | null> {
        const repo = getRepository(Celda);
        const celda = await repo.findOne({ where: { id_celda: id } });

        if (!celda) {
            throw new Error('Celda no encontrada');
        }

        // Historia 4: Validación de estado
        if (nuevoEstado === EstadoCeldaEnum.Mantenimiento || 
            celda.id_estado === EstadoCeldaEnum.Mantenimiento) {
            // Registrar el cambio en el historial (se puede implementar con eventos)
            console.log(`Cambio de estado de celda ${id}: ${celda.id_estado} -> ${nuevoEstado}`);
        }

        celda.id_estado = nuevoEstado;
        return await repo.save(celda);
    }

    // Historia 5: Verificar disponibilidad por tipo
    async checkAvailabilityByType(idTipoVehiculo: number): Promise<number> {
        const repo = getRepository(Celda);
        const count = await repo
            .createQueryBuilder('celda')
            .where('celda.id_tipo_vehiculo = :idTipoVehiculo', { idTipoVehiculo })
            .andWhere('celda.id_estado = :estadoId', { estadoId: EstadoCeldaEnum.Disponible })
            .getCount();
        
        return count;
    }

    async deleteCell(id: number): Promise<boolean> {
        const repo = getRepository(Celda);
        const celda = await repo.findOne({ where: { id_celda: id } });

        if (!celda) return false;

        await repo.remove(celda);
        return true;
    }
}