import { Router } from 'express';
import { usuarioController } from '../controllers/usuario.controller';
import authMiddleware from '../middleware/auth.middleware';
import { validateRegister } from '../middleware/validation.middleware';

const router = Router();

/**
 * @openapi
 * /api/usuario/profile:
 *   get:
 *     tags:
 *       - Usuario
 *     summary: Obtener perfil del usuario actual
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario
 *       401:
 *         description: No autorizado
 */
router.get('/profile', authMiddleware, (req, res) => usuarioController.fetchUserProfile(req, res));

/**
 * @openapi
 * /api/usuario:
 *   get:
 *     tags:
 *       - Usuario
 *     summary: Obtener todos los usuarios
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       401:
 *         description: No autorizado
 */
router.get('/', authMiddleware, (req, res) => usuarioController.obtenerUsuarios(req, res));

/**
 * @openapi
 * /api/usuario:
 *   post:
 *     tags:
 *       - Usuario
 *     summary: Crear nuevo usuario
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               id_rol:
 *                 type: integer
 *             required:
 *               - nombre
 *               - email
 *               - password
 *               - id_rol
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       409:
 *         description: El email ya está registrado
 *       400:
 *         description: Datos inválidos
 */
router.post('/', authMiddleware, validateRegister, (req, res) => usuarioController.crearUsuario(req, res));

/**
 * @openapi
 * /api/usuario/{id}:
 *   get:
 *     tags:
 *       - Usuario
 *     summary: Obtener usuario por ID
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
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', authMiddleware, (req, res) => usuarioController.obtenerUsuarioPorId(req, res));

/**
 * @openapi
 * /api/usuario/{id}:
 *   put:
 *     tags:
 *       - Usuario
 *     summary: Actualizar usuario
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
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/:id', authMiddleware, (req, res) => usuarioController.actualizarUsuario(req, res));

/**
 * @openapi
 * /api/usuario/{id}:
 *   delete:
 *     tags:
 *       - Usuario
 *     summary: Eliminar usuario
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
 *         description: Usuario eliminado
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:id', authMiddleware, (req, res) => usuarioController.eliminarUsuario(req, res));

export default router;