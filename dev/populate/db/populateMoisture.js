import mysql from 'mysql2/promise'
import { defaultDataPoints, sqlProfile } from '../config.js';

export async function populateMoisture(data_points) {
    const con = await mysql.createConnection(sqlProfile);
    
    var value;
    var loops = data_points;
    const type = 0;

    for(let i = 0; i < loops; i++) {
        value = Math.floor(Math.random() * 255)

        const now = new Date();
        // Set the hours, minutes, seconds, and milliseconds to random values
        now.setHours(Math.floor(Math.random() * 24));
        now.setMinutes(Math.floor(Math.random() * 60));
        now.setSeconds(Math.floor(Math.random() * 60));
        now.setMilliseconds(Math.floor(Math.random() * 1000));
        // Get the time as a string
        const datetimeString = now.toISOString().slice(0, 19).replace('T', ' ');

        await con.execute(
            "INSERT INTO `sensor_dev` (`datetime`, `Type`, `Value`) VALUES (?, ?, ?);",
            [datetimeString, type, value]    
            )
        console.log(`[${i}] ${datetimeString} Inserted (${type}, ${value})`);
    }
    // con.commit()
    con.end()
    return 0;
}
    
populateMoisture(defaultDataPoints);