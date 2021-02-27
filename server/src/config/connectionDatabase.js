import { Pool } from "pg";
import { config } from "dotenv";

config({
  path: "src/.env",
});
console.log(process.env.DB_USER, process.env.DB_HOST);
export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "budget",
  port: "5432",
});
