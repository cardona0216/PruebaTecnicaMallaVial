
// conexion a la base de datos
import {Pool} from 'pg'
let conn: Pool | null = null;

if (!conn) {
   conn = new Pool({
        user:'postgres',
        host:'localhost',
        port:5432,
        password: 'samuel0216',
        database:'tasksdb'
    })
}

export { conn}

