import mysql from 'mysql2/promise'
import { sqlProfile } from '../config.js';

export async function truncateTable() {
    const con = await mysql.createConnection(sqlProfile);

    await con.execute(
        "TRUNCATE TABLE `sensor_dev`"
        )
        
    console.log("[*] Truncated DB sensor_dev");

    con.end()
    return 0;
}
    
truncateTable();