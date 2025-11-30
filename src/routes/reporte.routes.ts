import { Router } from 'express';
import { reporteController } from '../controllers/reporte.controller';
import authMiddleware from '../middleware/auth.middleware';

const router = Router();

/**
 * @openapi
 * /api/reporte/export:
 *   post:
 *     tags:
 *       - Reporte
 *     summary: Exportar reporte en PDF o CSV
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: format
 *         required: true
 *         schema:
 *           type: string
 *           enum: [pdf, csv]
 *         example: "pdf"
 *         description: Formato de exportación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-01-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-01-31"
 *             required:
 *               - startDate
 *               - endDate
 *     responses:
 *       200:
 *         description: Archivo descargado exitosamente
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Parámetros inválidos o formato no soportado
 *       401:
 *         description: No autorizado
 */
router.post('/export', authMiddleware, (req, res) => reporteController.exportReport(req, res));

/**
 * @openapi
 * /api/reporte:
 *   get:
 *     tags:
 *       - Reporte
 *     summary: Generar reporte de movimientos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: fechaInicio
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-01-01"
 *         description: Fecha de inicio del reporte
 *       - in: query
 *         name: fechaFin
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-01-31"
 *         description: Fecha de fin del reporte
 *     responses:
 *       200:
 *         description: Reporte generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rango:
 *                   type: object
 *                   properties:
 *                     fechaInicio:
 *                       type: string
 *                     fechaFin:
 *                       type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Parámetros inválidos
 *       401:
 *         description: No autorizado
 */
router.get('/', authMiddleware, (req, res) => reporteController.generarReporte(req, res));

export default router;