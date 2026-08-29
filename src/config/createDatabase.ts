import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export async function ensureDatabaseExists(): Promise<void> {
  const dbName = process.env.DB_NAME || 'reservas_db';

  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: 'postgres' // base por defecto que siempre existe en Postgres
  });

  await client.connect();

  const resultado = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName]);

  if (resultado.rowCount === 0) {
    await client.query(`CREATE DATABASE "${dbName}"`);
    console.log(`Base de datos "${dbName}" creada automaticamente`);
  } else {
    console.log(`Base de datos "${dbName}" ya existe`);
  }

  await client.end();
}