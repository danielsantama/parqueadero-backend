import express from 'express';
import { json, urlencoded } from 'body-parser';
import { createConnection } from 'typeorm';
import routes from './routes';
import { dbConfig } from './config/db';

const app = express();

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Database connection
createConnection(dbConfig)
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });

export default app;