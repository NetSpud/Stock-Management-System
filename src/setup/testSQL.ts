import con from "../utils/SQL";
export default (): Promise<string> => {
  return new Promise((resolve, reject) => {
    con.query("SHOW TABLES", (err) => {
      if (err) reject(err);
      resolve("Connection Established!");
    });
  });
};
