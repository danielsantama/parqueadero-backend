import { getRepository } from 'typeorm';
import { RegistroMovimiento } from '../models/entities/RegistroMovimiento';
import { Vehiculo } from '../models/entities/Vehiculo';
import { Celda } from '../models/entities/Celda';
import { Usuario } from '../models/entities/Usuario';
import { EstadoCelda } from '../models/entities/EstadoCelda';
import { EstadoCeldaEnum } from '../enums/estado-celda.enum';

export class MovimientoService {
    async registrarEntrada(vehiculoData: { placa: string; idCelda: number; idAdmin: number }): Promise<RegistroMovimiento> {
        const vehiculoRepository = getRepository(Vehiculo);
        const celdaRepository = getRepository(Celda);
        const registroRepository = getRepository(RegistroMovimiento);
        const usuarioRepository = getRepository(Usuario);

        const vehiculo = await vehiculoRepository.findOne({ where: { placa: vehiculoData.placa } });
        if (!vehiculo) {
            throw new Error('Vehículo no encontrado');
        }

        // Verificar si ya hay un registro activo para el vehículo
        const registroActivo = await registroRepository
            .createQueryBuilder('registro')
            .where('registro.id_vehiculo = :vehiculoId', { vehiculoId: vehiculo.id_vehiculo })
            .andWhere('registro.hora_salida IS NULL')
            .getOne();

        if (registroActivo) {
            throw new Error('Vehículo ya activo');
        }

        const celda = await celdaRepository
            .createQueryBuilder('celda')
            .where('celda.id_celda = :id', { id: vehiculoData.idCelda })
            .getOne();

        if (!celda) {
            throw new Error('Celda no encontrada');
        }

        // Verificar estado de la celda
        const estadoId = celda.id_estado;
        if (estadoId !== EstadoCeldaEnum.Disponible) {
            throw new Error('La celda no está disponible');
        }

        const admin = await usuarioRepository.findOne({ where: { id_usuario: vehiculoData.idAdmin } });
        if (!admin) {
            throw new Error('Administrador no encontrado');
        }

        // Crear registro con las entidades relacionadas
        const nuevoRegistro = registroRepository.create({
            hora_entrada: new Date(),
            id_vehiculo: vehiculo.id_vehiculo,
            id_celda: celda.id_celda,
            id_admin: admin.id_usuario
        } as any);

        const saved = await registroRepository.save(nuevoRegistro);

        // Marcar celda como ocupada
        const estadoOcupado = await getRepository(EstadoCelda).findOne({ where: { id: EstadoCeldaEnum.Ocupada } });
        if (estadoOcupado) {
            celda.id_estado = estadoOcupado.id;
            await celdaRepository.save(celda);
        }

        return saved[0];
    }

    async registrarSalida(placa: string): Promise<RegistroMovimiento> {
        const registroRepository = getRepository(RegistroMovimiento);
        const vehiculoRepository = getRepository(Vehiculo);
        const celdaRepository = getRepository(Celda);

        const vehiculo = await vehiculoRepository.findOne({ where: { placa } });
        if (!vehiculo) {
            throw new Error('Vehículo no encontrado');
        }

        const registro = await registroRepository
            .createQueryBuilder('registro')
            .where('registro.id_vehiculo = :vehiculoId', { vehiculoId: vehiculo.id_vehiculo })
            .andWhere('registro.hora_salida IS NULL')
            .getOne();

        if (!registro) {
            throw new Error('No hay registro de entrada para este vehículo');
        }

        registro.hora_salida = new Date();
        const updatedRegistro = await registroRepository.save(registro);

        // Liberar la celda asociada
        if (registro.id_celda) {
            const celda = await celdaRepository.findOne({ 
                where: { id_celda: registro.id_celda } 
            });

            if (celda) {
                const estadoDisponible = await getRepository(EstadoCelda).findOne({ 
                    where: { id: EstadoCeldaEnum.Disponible } 
                });
                
                if (estadoDisponible) {
                    celda.id_estado = estadoDisponible.id;
                    await celdaRepository.save(celda);
                }
            }
        }

        return updatedRegistro;
    }
}