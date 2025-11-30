import { Request, Response } from 'express';
import { CeldaService } from '../services/celda.service';

export class CeldaController {
    public async fetchAvailableCells(req: Request, res: Response): Promise<Response> {
        try {
            const celdaService = new CeldaService();
            const celdasDisponibles = await celdaService.getAvailableCells();
            return res.status(200).json(celdasDisponibles);
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            return res.status(500).json({ message: 'Error al obtener celdas disponibles', error: msg });
        }
    }

    // Historia 5: Obtener todas las celdas con opción de filtros
    public async obtenerCeldas(req: Request, res: Response): Promise<Response> {
        try {
            const { id_tipo_vehiculo, id_estado } = req.query;
            const celdaService = new CeldaService();
            
            let celdas;
            if (id_tipo_vehiculo || id_estado) {
                // Filtrar por tipo de vehículo y/o estado (Historia 5)
                celdas = await celdaService.getCellsByFilters(
                    id_tipo_vehiculo ? Number(id_tipo_vehiculo) : undefined,
                    id_estado ? Number(id_estado) : undefined
                );
            } else {
                celdas = await celdaService.getAllCells();
            }
            
            return res.status(200).json(celdas);
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            return res.status(500).json({ message: 'Error al obtener celdas', error: msg });
        }
    }

    public async obtenerCeldaPorId(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const celdaService = new CeldaService();
            const celda = await celdaService.getCellById(Number(id));

            if (!celda) {
                return res.status(404).json({ message: 'Celda no encontrada' });
            }

            return res.status(200).json(celda);
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            return res.status(500).json({ message: 'Error al obtener celda', error: msg });
        }
    }

    // Historia 3: Crear celda con validación
    public async crearCelda(req: Request, res: Response): Promise<Response> {
        try {
            const celdaData = req.body;
            const celdaService = new CeldaService();
            const nuevaCelda = await celdaService.createCell(celdaData);
            
            // Confirmación visual del registro exitoso (Historia 3)
            return res.status(201).json({
                message: 'Celda registrada exitosamente',
                celda: nuevaCelda
            });
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            
            // Manejar error de nombre duplicado (Historia 3)
            if (msg.includes('ya existe')) {
                return res.status(409).json({ message: msg });
            }
            
            return res.status(500).json({ message: 'Error al crear celda', error: msg });
        }
    }

    public async actualizarCelda(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const celdaData = req.body;
            const celdaService = new CeldaService();
            const celdaActualizada = await celdaService.updateCell(Number(id), celdaData);

            if (!celdaActualizada) {
                return res.status(404).json({ message: 'Celda no encontrada' });
            }

            return res.status(200).json(celdaActualizada);
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            
            if (msg.includes('ya existe')) {
                return res.status(409).json({ message: msg });
            }
            
            return res.status(500).json({ message: 'Error al actualizar celda', error: msg });
        }
    }

    // Historia 4: Actualizar estado de celda
    public async actualizarEstadoCelda(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { id_estado } = req.body;
            
            if (!id_estado) {
                return res.status(400).json({ message: 'El id_estado es requerido' });
            }
            
            const celdaService = new CeldaService();
            const celdaActualizada = await celdaService.updateCellStatus(Number(id), id_estado);

            if (!celdaActualizada) {
                return res.status(404).json({ message: 'Celda no encontrada' });
            }

            // Historia 4: Confirmación del cambio de estado
            return res.status(200).json({
                message: 'Estado de celda actualizado exitosamente',
                celda: celdaActualizada
            });
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            return res.status(500).json({ message: 'Error al actualizar estado de celda', error: msg });
        }
    }

    // Historia 5: Consultar disponibilidad por tipo de vehículo
    public async consultarDisponibilidad(req: Request, res: Response): Promise<Response> {
        try {
            const { id_tipo_vehiculo } = req.query;
            
            if (!id_tipo_vehiculo) {
                return res.status(400).json({ message: 'El id_tipo_vehiculo es requerido' });
            }
            
            const celdaService = new CeldaService();
            const disponibles = await celdaService.checkAvailabilityByType(Number(id_tipo_vehiculo));
            
            return res.status(200).json({
                id_tipo_vehiculo: Number(id_tipo_vehiculo),
                celdas_disponibles: disponibles
            });
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            return res.status(500).json({ message: 'Error al consultar disponibilidad', error: msg });
        }
    }

    // Historia 5: Exportar listado de celdas
    public async exportarCeldas(req: Request, res: Response): Promise<Response> {
        try {
            const celdaService = new CeldaService();
            const celdas = await celdaService.getAllCells();
            
            // Preparar datos para exportación
            const datosExportacion = celdas.map(celda => ({
                id: celda.id_celda,
                nombre: celda.nombre_celda,
                tipo_vehiculo: celda.id_tipo_vehiculo,
                estado: celda.id_estado
            }));
            
            return res.status(200).json({
                fecha_exportacion: new Date().toISOString(),
                total_celdas: celdas.length,
                celdas: datosExportacion
            });
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            return res.status(500).json({ message: 'Error al exportar celdas', error: msg });
        }
    }

    public async eliminarCelda(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const celdaService = new CeldaService();
            const resultado = await celdaService.deleteCell(Number(id));

            if (!resultado) {
                return res.status(404).json({ message: 'Celda no encontrada' });
            }

            return res.status(204).send();
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            return res.status(500).json({ message: 'Error al eliminar celda', error: msg });
        }
    }
}

export const celdaController = new CeldaController();