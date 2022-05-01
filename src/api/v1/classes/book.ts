import con from "../../../utils/SQL";
import { v4 as uuidv4 } from "uuid";
export default class {
  exists(id: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      con.query("SELECT * FROM bookings where id = ?", [id], (err, result) => {
        if (err) reject(err);
        if (result.length > 0) {
          resolve(true);
        } else {
          reject(`Booking does not exist`);
        }
      });
    });
  }
  create(
    items: string,
    from: string,
    to: string,
    userID: string
  ): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const id = uuidv4();

      const sql =
        "INSERT INTO bookings (id, items, using_from, using_until, userID) VALUES (?,?,?,?,?)";
      con.query(sql, [id, items, from, to, userID], (err) => {
        if (err) reject(err);
        console.log("1 booking inserted");
        resolve(true);
      });
    });
  }
  get all(): Promise<Record<string, unknown>> {
    return new Promise((resolve, reject) => {
      con.query("SELECT * FROM bookings", (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
  delete(id: string, userID: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const sql = "DELETE FROM bookings WHERE id = ? and userID = ?";
      con.query(sql, [id, userID], (err, result) => {
        if (err) reject(err);
        console.log("Number of bookings deleted: " + result.affectedRows);
        resolve(true);
      });
    });
  }
  adminDelete(id: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const sql = "DELETE FROM bookings WHERE id = ?";
      con.query(sql, [id], (err, result) => {
        if (err) reject(err);
        console.log(
          "ADMIN COMMAND: Number of bookings deleted: " + result.affectedRows
        );
        resolve(true);
      });
    });
  }
}
