import dotenv from 'dotenv';
dotenv.config({ path: "../../.env.local" });

export const defaultDataPoints = 100;

export const sqlProfile = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}