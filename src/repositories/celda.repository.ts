import { getRepository } from 'typeorm';
import { Celda } from '../models/entities/Celda';

export class CeldaRepository {
    private celdaRepository = getRepository(Celda);

    async findAll(): Promise<Celda[]> {
        return await this.celdaRepository.find();
    }

    async findById(id: number): Promise<Celda | undefined> {
        return await this.celdaRepository.findOne(id);
    }

    async create(celda: Celda): Promise<Celda> {
        return await this.celdaRepository.save(celda);
    }

    async update(id: number, celda: Partial<Celda>): Promise<Celda | undefined> {
        await this.celdaRepository.update(id, celda);
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.celdaRepository.delete(id);
    }
}