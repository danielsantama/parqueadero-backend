import { Request, Response } from 'express';
import { ReporteService } from '../services/reporte.service';

class ReporteController {
    private reporteService: ReporteService;

    constructor() {
        this.reporteService = new ReporteService();
    }

    public async generarReporte(req: Request, res: Response): Promise<Response> {
        const fechaInicio = (req.query.fechaInicio as string) || req.body?.fechaInicio;
        const fechaFin = (req.query.fechaFin as string) || req.body?.fechaFin;

        if (!fechaInicio || !fechaFin) {
            return res.status(400).json({ message: 'Parámetros fechaInicio y fechaFin son requeridos' });
        }

        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
            return res.status(400).json({ message: 'Formato de fecha inválido' });
        }

        if (inicio > fin) {
            return res.status(400).json({ message: 'fechaInicio no puede ser mayor que fechaFin' });
        }

        try {
            const reporte = await this.reporteService.generarReporteMovimientos(fechaInicio, fechaFin);
            return res.status(200).json({
                rango: { fechaInicio: inicio.toISOString(), fechaFin: fin.toISOString() },
                data: reporte,
            });
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            return res.status(500).json({ message: 'Error al generar el reporte', error: msg });
        }
    }

    public async exportReport(req: Request, res: Response): Promise<void> {
        try {
            const { format } = req.query;
            const { startDate, endDate } = req.body;

            if (!startDate || !endDate) {
                res.status(400).json({ message: 'Parámetros startDate y endDate son requeridos' });
                return;
            }

            if (!format || !['pdf', 'csv'].includes(format as string)) {
                res.status(400).json({ message: 'Formato debe ser pdf o csv' });
                return;
            }

            const reporteService = new ReporteService();
            const fileBuffer = await reporteService.exportarReporte(
                new Date(startDate),
                new Date(endDate),
                format as 'pdf' | 'csv'
            );

            const contentType = format === 'pdf' ? 'application/pdf' : 'text/csv';
            const fileName = `reporte-movimientos.${format}`;

            res.setHeader('Content-Type', contentType);
            res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
            res.send(fileBuffer);
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error interno';
            res.status(500).json({ message: 'Error al exportar reporte', error: msg });
        }
    }
}

export const reporteController = new ReporteController();