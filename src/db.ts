import { Pool } from "pg";
require("dotenv").config();

const devConfig: any = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
};

const prodConfig: any = {
  connectionString: process.env.DATABASE_URL,
};

if (process.env.NODE_ENV === "production") {
  console.log(process.env.DATABASE_URL);
}

const pool = new Pool(
  process.env.NODE_ENV === "production" ? prodConfig : devConfig
);

export default pool;
