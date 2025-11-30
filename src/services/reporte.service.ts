import { getRepository } from 'typeorm';
import { RegistroMovimiento } from '../models/entities/RegistroMovimiento';
import PDFDocument from 'pdfkit';
import { parse } from 'json2csv';

export class ReporteService {
    async generarReporteMovimientos(fechaInicio: Date, fechaFin: Date) {
        const registroMovimientoRepository = getRepository(RegistroMovimiento);
        
        const movimientos = await registroMovimientoRepository
            .createQueryBuilder('registro')
            .leftJoinAndSelect('registro.vehiculo', 'vehiculo')
            .leftJoinAndSelect('vehiculo.tipoVehiculo', 'tipoVehiculo')
            .leftJoinAndSelect('registro.celda', 'celda')
            .where('registro.hora_entrada BETWEEN :fechaInicio AND :fechaFin', { fechaInicio, fechaFin })
            .getMany();

        return movimientos.map(movimiento => ({
            placa: movimiento.vehiculo.placa,
            tipo: movimiento.vehiculo.id_vehiculo,
            celda: movimiento.celda.nombre_celda,
            horaEntrada: movimiento.hora_entrada,
            horaSalida: movimiento.hora_salida,
            permanencia: this.calcularPermanencia(movimiento.hora_entrada, movimiento.hora_salida),
        }));
    }

    private calcularPermanencia(horaEntrada: Date, horaSalida?: Date) {
        if (!horaSalida) {
            return null; // El vehículo aún está activo
        }
        const diferencia = new Date(horaSalida).getTime() - new Date(horaEntrada).getTime();
        const horas = Math.floor(diferencia / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        return `${horas} Horas y ${minutos} Minutos`;
    }

    async exportarReporte(fechaInicio: Date, fechaFin: Date, format: 'pdf' | 'csv'): Promise<Buffer> {
        const reporte = await this.generarReporteMovimientos(fechaInicio, fechaFin);

        if (format === 'csv') {
            return this.exportarCSV(reporte);
        } else {
            return this.exportarPDF(reporte, fechaInicio, fechaFin);
        }
    }

    private exportarCSV(reporte: any): Buffer {
        const fields = [
            'Placa',
            'Tipo',
            'Celda',
            'Hora Entrada',
            'Hora Salida',
            'Permanencia'
        ];

        const csv = parse(reporte, { fields });
        return Buffer.from(csv, 'utf-8');
    }

    private exportarPDF(reporte: any, fechaInicio: Date, fechaFin: Date): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            try {
                const doc = new PDFDocument({ margin: 50 });
                const buffers: Buffer[] = [];

                doc.on('data', buffers.push.bind(buffers));
                doc.on('end', () => {
                    const pdfBuffer = Buffer.concat(buffers);
                    resolve(pdfBuffer);
                });

                // Título
                doc.fontSize(20).text('Reporte de Movimientos', { align: 'center' });
                doc.moveDown();
                doc.fontSize(12).text(`Período: ${fechaInicio.toLocaleDateString()} a ${fechaFin.toLocaleDateString()}`, { align: 'center' });
                doc.moveDown(2);

                // Tabla de datos
                doc.fontSize(10);
                reporte.forEach((item: any, index: number) => {
                    if (index > 0 && index % 15 === 0) {
                        doc.addPage();
                    }

                    doc.text(`Placa: ${item.placa}`); 
                    doc.text(`Celda: ${item.celda}`);
                    doc.text(`Entrada: ${new Date(item.horaEntrada).toLocaleString()}`);
                    doc.text(`Salida: ${new Date(item.horaSalida).toLocaleString()}`);
                    doc.text(`Permanencia: ${item.permanencia}`);
                    doc.moveDown(0.5);
                });

                doc.end();
            } catch (error) {
                reject(error);
            }
        });
    }
}