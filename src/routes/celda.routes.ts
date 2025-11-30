import { Router } from 'express';
import { celdaController } from '../controllers/celda.controller';
import authMiddleware from '../middleware/auth.middleware';
import { validateCrearCelda, validateActualizarEstado } from '../middleware/validation.middleware';

const router = Router();

/**
 * @openapi
 * /api/celda/available:
 *   get:
 *     tags:
 *       - Celda
 *     summary: Obtener celdas disponibles
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de celdas disponibles
 *       401:
 *         description: No autorizado
 */
router.get('/available', authMiddleware, (req, res) => celdaController.fetchAvailableCells(req, res));

/**
 * @openapi
 * /api/celda:
 *   get:
 *     tags:
 *       - Celda
 *     summary: Obtener todas las celdas con opción de filtros (Historia 5)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id_tipo_vehiculo
 *         schema:
 *           type: integer
 *         description: Filtrar por tipo de vehículo
 *       - in: query
 *         name: id_estado
 *         schema:
 *           type: integer
 *         description: Filtrar por estado de celda
 *     responses:
 *       200:
 *         description: Lista de celdas
 *       401:
 *         description: No autorizado
 */
router.get('/', authMiddleware, (req, res) => celdaController.obtenerCeldas(req, res));

/**
 * @openapi
 * /api/celda/disponibilidad:
 *   get:
 *     tags:
 *       - Celda
 *     summary: Consultar disponibilidad por tipo de vehículo (Historia 5)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id_tipo_vehiculo
 *         required: true
 *         schema:
 *           type: integer
 *         description: Tipo de vehículo a consultar
 *     responses:
 *       200:
 *         description: Cantidad de celdas disponibles
 *       400:
 *         description: Parámetro faltante
 *       401:
 *         description: No autorizado
 */
router.get('/disponibilidad', authMiddleware, (req, res) => celdaController.consultarDisponibilidad(req, res));

/**
 * @openapi
 * /api/celda/exportar:
 *   get:
 *     tags:
 *       - Celda
 *     summary: Exportar listado de celdas para auditoría (Historia 5)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listado exportado de celdas
 *       401:
 *         description: No autorizado
 */
router.get('/exportar', authMiddleware, (req, res) => celdaController.exportarCeldas(req, res));

/**
 * @openapi
 * /api/celda/{id}:
 *   get:
 *     tags:
 *       - Celda
 *     summary: Obtener celda por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Celda encontrada
 *       404:
 *         description: Celda no encontrada
 */
router.get('/:id', authMiddleware, (req, res) => celdaController.obtenerCeldaPorId(req, res));

/**
 * @openapi
 * /api/celda:
 *   post:
 *     tags:
 *       - Celda
 *     summary: Crear nueva celda (Historia 3)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_celda:
 *                 type: string
 *                 description: Nombre único de la celda
 *               id_tipo_vehiculo:
 *                 type: integer
 *                 description: Tipo de vehículo compatible
 *               id_estado:
 *                 type: integer
 *                 description: Estado inicial (Libre, Ocupada, Mantenimiento)
 *             required:
 *               - nombre_celda
 *               - id_tipo_vehiculo
 *               - id_estado
 *     responses:
 *       201:
 *         description: Celda creada exitosamente
 *       409:
 *         description: El nombre de celda ya existe
 *       401:
 *         description: No autorizado
 */
router.post('/', authMiddleware, validateCrearCelda, (req, res) => celdaController.crearCelda(req, res));

/**
 * @openapi
 * /api/celda/{id}:
 *   put:
 *     tags:
 *       - Celda
 *     summary: Actualizar celda
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_celda:
 *                 type: string
 *               id_tipo_vehiculo:
 *                 type: integer
 *               id_estado:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Celda actualizada
 *       404:
 *         description: Celda no encontrada
 *       409:
 *         description: El nombre de celda ya existe
 */
router.put('/:id', authMiddleware, (req, res) => celdaController.actualizarCelda(req, res));

/**
 * @openapi
 * /api/celda/{id}/estado:
 *   patch:
 *     tags:
 *       - Celda
 *     summary: Actualizar estado de celda (Historia 4)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_estado:
 *                 type: integer
 *                 description: Nuevo estado (1=Disponible, 2=Ocupada, 3=Mantenimiento)
 *             required:
 *               - id_estado
 *     responses:
 *       200:
 *         description: Estado actualizado exitosamente
 *       404:
 *         description: Celda no encontrada
 *       401:
 *         description: No autorizado
 */
router.patch('/:id/estado', authMiddleware, validateActualizarEstado, (req, res) => celdaController.actualizarEstadoCelda(req, res));

/**
 * @openapi
 * /api/celda/{id}:
 *   delete:
 *     tags:
 *       - Celda
 *     summary: Eliminar celda
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Celda eliminada
 *       404:
 *         description: Celda no encontrada
 */
router.delete('/:id', authMiddleware, (req, res) => celdaController.eliminarCelda(req, res));

export default router;