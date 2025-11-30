import { getRepository } from 'typeorm';
import { Vehiculo } from '../models/entities/Vehiculo';
import { TipoVehiculo } from '../models/entities/TipoVehiculo';
import { Cliente } from '../models/entities/Cliente';
import { Mensualidad } from '../models/entities/Mensualidad';
import { RegistroMovimiento } from '../models/entities/RegistroMovimiento';

export class VehiculoService {
    async crearVehiculo(vehiculoData: Partial<Vehiculo>): Promise<Vehiculo> {
        const repo = getRepository(Vehiculo);

        if (!vehiculoData.placa) {
            throw new Error('Campo requerido: placa');
        }

        const existente = await repo.findOne({ where: { placa: vehiculoData.placa } });
        if (existente) {
            throw new Error('Ya existe un vehículo con esa placa');
        }

        // Resolve relaciones si vienen como ids
        if (vehiculoData.id_tipo && typeof vehiculoData.id_tipo === 'number') {
            const tipoRepo = getRepository(TipoVehiculo);
            const tipo = await tipoRepo.findOne(vehiculoData.id_tipo);
            if (!tipo) throw new Error('Tipo de vehículo no encontrado');
            vehiculoData.id_tipo = tipo as any;
        }

        if (vehiculoData.id_cliente && typeof vehiculoData.id_cliente === 'number') {
            const clienteRepo = getRepository(Cliente);
            const cliente = await clienteRepo.findOne(vehiculoData.id_cliente);
            if (!cliente) throw new Error('Cliente no encontrado');
            vehiculoData.id_cliente = cliente as any;
        }

        const nuevo = repo.create(vehiculoData as Vehiculo);
        return await repo.save(nuevo);
    }

    async obtenerVehiculos(): Promise<Vehiculo[]> {
        const repo = getRepository(Vehiculo);
        return await repo.find();
    }

    async obtenerVehiculoPorPlaca(placa: string): Promise<any> {
        const repo = getRepository(Vehiculo);
        const vehiculo = await repo
            .createQueryBuilder('vehiculo')
            .where('vehiculo.placa = :placa', { placa })
            .getOne();

        if (!vehiculo) return null;

        // Verificar si el vehículo tiene un registro activo (está dentro del parqueadero)
        const registroRepo = getRepository(RegistroMovimiento);
        const registroActivo = await registroRepo.findOne({
            where: { vehiculo: vehiculo.id_vehiculo, hora_salida: null },
        });

        const disponible = !registroActivo;
        let availableCellId = null;
        let assignedCell = null;

        // Si está disponible, buscar una celda disponible para su tipo
        if (disponible && vehiculo.id_tipo) {
            const celdaDisponible = await getRepository('Celda')
                .createQueryBuilder('celda')
                .where('celda.id_tipo_vehiculo = :tipoId', { tipoId: vehiculo.id_tipo })
                .andWhere('celda.id_estado = :estadoDisponible', { estadoDisponible: 1 }) // EstadoCeldaEnum.Disponible
                .getOne();

            availableCellId = celdaDisponible ? (celdaDisponible as any).id_celda : null;
            assignedCell = celdaDisponible ? (celdaDisponible as any).nombre_celda : null;
        }

        // Verificar mensualidad vigente
        let estadoMensualidad = 'Sin mensualidad';
        if (vehiculo.id_cliente) {
            const mensualidadRepo = getRepository(Mensualidad);
            const fechaActual = new Date();

            const mensualidadVigente = await mensualidadRepo
                .createQueryBuilder('mensualidad')
                .where('mensualidad.cliente = :clienteId', { clienteId: vehiculo.id_cliente })
                .andWhere('mensualidad.fecha_inicio <= :fechaActual', { fechaActual })
                .andWhere('mensualidad.fecha_fin >= :fechaActual', { fechaActual })
                .getOne();

            if (mensualidadVigente) {
                estadoMensualidad = 'Vigente';
            } else {
                const mensualidadExpirada = await mensualidadRepo
                    .createQueryBuilder('mensualidad')
                    .where('mensualidad.cliente = :clienteId', { clienteId: vehiculo.id_cliente })
                    .andWhere('mensualidad.fecha_fin < :fechaActual', { fechaActual })
                    .getOne();

                estadoMensualidad = mensualidadExpirada ? 'Expirada' : 'Sin mensualidad';
            }
        }

        return {
            ...vehiculo,
            disponible,
            availableCellId,
            assignedCell,
            estadoMensualidad,
        };
    }

    async actualizarVehiculo(placa: string, datos: Partial<Vehiculo>): Promise<Vehiculo | null> {
        const repo = getRepository(Vehiculo);
        const vehiculo = await repo.findOne({ where: { placa } });
        if (!vehiculo) return null;

        if (datos.placa && datos.placa !== placa) {
            const otro = await repo.findOne({ where: { placa: datos.placa } });
            if (otro) throw new Error('Otra entidad con la placa proporcionada ya existe');
        }

        // Resolver relaciones por id si es necesario
        if (datos.id_tipo && typeof datos.id_tipo === 'number') {
            const tipo = await getRepository(TipoVehiculo).findOne(datos.id_tipo);
            if (!tipo) throw new Error('Tipo de vehículo no encontrado');
            datos.id_tipo = tipo as any;
        }

        if (datos.id_cliente && typeof datos.id_cliente === 'number') {
            const cliente = await getRepository(Cliente).findOne(datos.id_cliente);
            if (!cliente) throw new Error('Cliente no encontrado');
            datos.id_cliente = cliente as any;
        }

        repo.merge(vehiculo, datos);
        return await repo.save(vehiculo);
    }

    async eliminarVehiculo(placa: string): Promise<boolean> {
        const repo = getRepository(Vehiculo);
        const vehiculo = await repo.findOne({ where: { placa } });
        if (!vehiculo) return false;
        await repo.remove(vehiculo);
        return true;
    }

    async obtenerMovimientosPendientes(): Promise<any[]> {
        const registroRepo = getRepository(RegistroMovimiento);
        
        const movimientos = await registroRepo
            .createQueryBuilder('registro')
            .leftJoinAndSelect('registro.vehiculo', 'vehiculo')
            .leftJoinAndSelect('vehiculo.tipoVehiculo', 'tipoVehiculo')
            .leftJoinAndSelect('vehiculo.cliente', 'cliente')
            .leftJoinAndSelect('cliente.mensualidades', 'mensualidad')
            .leftJoinAndSelect('registro.celda', 'celda')
            .where('registro.hora_salida IS NULL')
            .getMany();

        const fechaActual = new Date();

        return movimientos.map(mov => {
            const horaEntrada = new Date(mov.hora_entrada);
            const ahora = new Date();
            const diffMs = ahora.getTime() - horaEntrada.getTime();
            
            const horas = Math.floor(diffMs / (1000 * 60 * 60));
            const minutos = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
            
            const tiempoTranscurrido = `${horas} horas ${minutos} minutos`;
            // Buscar mensualidad vigente del cliente
            let costoMensualidad = null;
            if (mov.vehiculo.cliente?.mensualidades) {
                const mensualidadVigente = mov.vehiculo.cliente.mensualidades.find(m => 
                    new Date(m.fecha_inicio) <= fechaActual && 
                    new Date(m.fecha_fin) >= fechaActual
                );
                costoMensualidad = mensualidadVigente?.costo || null;
            }
            return {
                id_registro: mov.id_registro,
                placa: mov.vehiculo.placa,
                tipo: mov.vehiculo.id_tipo,
                celda: mov.celda.nombre_celda,
                horaEntrada: mov.hora_entrada,
                costo: costoMensualidad,
                tiempoTranscurrido: tiempoTranscurrido,
            };
        });
    }
}