import mysql from "mysql";
import con from "../utils/SQL";
export default () => {
  return new Promise((resolve, reject) => {
    con.query("SHOW TABLES", (err, result, fields) => {
      if (err) reject(err);
      resolve("Connection Established!");
    });
  });
};
// export default checkConnection;
