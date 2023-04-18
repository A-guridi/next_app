import { NextApiRequest, NextApiResponse } from 'next';
import { Pool, Client } from 'pg';

import sql from './postgre';

const pool = new Pool({
    user: 'myuser',
    host: 'localhost',
    database: 'mydatabase',
    password: 'mypassword',
    port: 5432,
  });

async function getUsersOver(age:number) {
    const users = await sql`
      select
        name,
        age
      from users
      where age > ${ age }
    `
    // users = Result [{ name: "Walter", age: 80 }, { name: 'Murray', age: 68 }, ...]
    return users
  }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM mytable');
    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    pool.end();
  }
}