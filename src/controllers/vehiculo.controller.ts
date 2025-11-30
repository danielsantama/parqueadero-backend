import { Request, Response } from 'express';
import { VehiculoService } from '../services/vehiculo.service';
import { Vehiculo } from '../models/entities/Vehiculo';

class VehiculoController {
    private vehiculoService: VehiculoService;

    constructor() {
        this.vehiculoService = new VehiculoService();
    }

    public async crearVehiculo(req: Request, res: Response): Promise<Response> {
        try {
            const vehiculoData: Partial<Vehiculo> = req.body;

            if (!vehiculoData.placa) {
                return res.status(400).json({ message: 'Campo requerido: placa' });
            }

            const nuevoVehiculo = await this.vehiculoService.crearVehiculo(vehiculoData as Vehiculo);
            return res.status(201).json(nuevoVehiculo);
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            return res.status(500).json({ message: 'Error al crear el vehículo', error: msg });
        }
    }

    public async obtenerVehiculos(_req: Request, res: Response): Promise<Response> {
        try {
            const vehiculos = await this.vehiculoService.obtenerVehiculos();
            return res.status(200).json(vehiculos);
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            return res.status(500).json({ message: 'Error al obtener los vehículos', error: msg });
        }
    }

    public async obtenerVehiculoPorPlaca(req: Request, res: Response): Promise<Response> {
        try {
            const { placa } = req.params;
            if (!placa) {
                return res.status(400).json({ message: 'Parámetro placa es requerido' });
            }

            const vehiculo = await this.vehiculoService.obtenerVehiculoPorPlaca(placa);
            if (!vehiculo) {
                return res.status(404).json({ message: 'Vehículo no encontrado' });
            }
            return res.status(200).json(vehiculo);
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            return res.status(500).json({ message: 'Error al obtener el vehículo', error: msg });
        }
    }

    public async actualizarVehiculo(req: Request, res: Response): Promise<Response> {
        try {
            const { placa } = req.params;
            if (!placa) {
                return res.status(400).json({ message: 'Parámetro placa es requerido' });
            }

            const vehiculoData: Partial<Vehiculo> = req.body;
            const vehiculoActualizado = await this.vehiculoService.actualizarVehiculo(placa, vehiculoData as Vehiculo);
            if (!vehiculoActualizado) {
                return res.status(404).json({ message: 'Vehículo no encontrado' });
            }
            return res.status(200).json(vehiculoActualizado);
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            return res.status(500).json({ message: 'Error al actualizar el vehículo', error: msg });
        }
    }

    public async eliminarVehiculo(req: Request, res: Response): Promise<Response> {
        try {
            const { placa } = req.params;
            if (!placa) {
                return res.status(400).json({ message: 'Parámetro placa es requerido' });
            }

            const resultado = await this.vehiculoService.eliminarVehiculo(placa);
            if (!resultado) {
                return res.status(404).json({ message: 'Vehículo no encontrado' });
            }
            return res.status(204).send();
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            return res.status(500).json({ message: 'Error al eliminar el vehículo', error: msg });
        }
    }

    public async obtenerMovimientosPendientes(req: Request, res: Response): Promise<Response> {
        try {
            const vehiculoService = new VehiculoService();
            const movimientos = await vehiculoService.obtenerMovimientosPendientes();
            return res.status(200).json(movimientos);
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            return res.status(500).json({ message: 'Error al obtener movimientos pendientes', error: msg });
        }
    }
}

export const vehiculoController = new VehiculoController();