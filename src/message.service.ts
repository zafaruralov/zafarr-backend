import { Injectable, OnModuleInit } from '@nestjs/common';
import pg from "pg"

@Injectable()
export class MessageService implements OnModuleInit {
    private pool = new pg.Pool({
    host: process.env.DB_HOST ?? 'localhost',
    user: process.env.DB_USER ?? 'zafarr',
    database: process.env.DB_NAME ?? 'zafarr',
    password: process.env.DB_PASSWORD,
  });

  async onModuleInit() {
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        name TEXT, email TEXT, message TEXT,
        created_at TIMESTAMPTZ DEFAULT now()
    )`);
  }
  async save(name: string, email: string, message: string) {
    await this.pool.query(
      'INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)',
      [name, email, message],
    );
  }
}