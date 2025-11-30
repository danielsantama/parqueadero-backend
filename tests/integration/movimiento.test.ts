import request from 'supertest';
import app from '../../src/app';
import { createConnection, getConnection } from 'typeorm';
import { RegistroMovimiento } from '../../src/models/entities/RegistroMovimiento';
import { Celda } from '../../src/models/entities/Celda';
import { Vehiculo } from '../../src/models/entities/Vehiculo';
import { Usuario } from '../../src/models/entities/Usuario';

describe('Movimiento Integration Tests', () => {
    let connection;

    beforeAll(async () => {
        connection = await createConnection();
    });

    afterAll(async () => {
        await connection.close();
    });

    it('should register vehicle entry', async () => {
        const response = await request(app)
            .post('/api/movimiento/entrada')
            .send({
                placa: 'ABC-123',
                tipoVehiculo: 'Carro',
                idAdmin: 1
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Registro Exitoso');
    });

    it('should register vehicle exit', async () => {
        const response = await request(app)
            .post('/api/movimiento/salida')
            .send({
                placa: 'ABC-123',
                idAdmin: 1
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Salida registrada. Celda liberada.');
    });

    it('should return error for non-existent vehicle', async () => {
        const response = await request(app)
            .post('/api/movimiento/salida')
            .send({
                placa: 'XYZ-999',
                idAdmin: 1
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Vehículo no encontrado');
    });

    it('should return error for vehicle with expired monthly payment', async () => {
        const response = await request(app)
            .post('/api/movimiento/entrada')
            .send({
                placa: 'DEF-456',
                tipoVehiculo: 'Moto',
                idAdmin: 1
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Mensualidad vencida');
    });
});