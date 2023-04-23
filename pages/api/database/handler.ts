import { NextApiRequest, NextApiResponse } from 'next';

import pg from './postgres_config';


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
    const client = pg;
    const result = await pg.call('SELECT * FROM mytable');
    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    pg.end();
  }
}