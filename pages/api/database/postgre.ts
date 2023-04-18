import postgres from 'postgres'

const sql = postgres({
    user: 'myuser',
    host: 'localhost',
    database: 'mydatabase',
    password: 'mypassword',
    port: 5432}
    ) // will use psql environment variables

export default sql
