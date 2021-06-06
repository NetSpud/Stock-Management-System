import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();
const con = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST || "localhost",
  user: process.env.USER || "user",
  password: process.env.PASS || "123",
  database: process.env.DB || "storage",
});
export default con;
