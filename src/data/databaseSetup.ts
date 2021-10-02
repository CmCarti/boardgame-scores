import { Pool, QueryResult } from 'pg';

export interface DbCallback {
  (err: Error, result: QueryResult<any>): void;
}

const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 0;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: port,
});

const db = {
  query: async <T>(text: string) => await pool.query<T>(text),
};

export default db;
