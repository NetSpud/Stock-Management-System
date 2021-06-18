import con from "../../../utils/SQL";
import { v4 as uuidv4 } from "uuid";

export default class {
  _userID: string;

  constructor(userID: string) {
    this._userID = userID;
  }
  create(name: string, quantity: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO item (id, name, quantity, userID) VALUES (?,?,?,?)";
      con.query(sql, [uuidv4(), name, quantity, this._userID], (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }
  delete(itemID: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM item where id = ? and userID = ?";
      con.query(sql, [itemID, this._userID], (err, result) => {
        if (err) reject(err);
        if (result.affectedRows > 0) {
          resolve(true);
        } else {
          reject(`Something went wrong while trying to delete the item. `);
        }
      });
    });
  }
  get all(): Promise<Record<string, unknown>> {
    return new Promise<{ id: string; name: string; quantity: string }>(
      (resolve, reject) => {
        con.query(
          "SELECT * FROM item where userID = ?",
          [this._userID],
          (err, result) => {
            if (err) reject(err);
            result.map((x: Record<string, unknown>) => {
              x.quantity = Number(x.quantity);
              return x;
            });
            resolve(result);
          }
        );
      }
    );
  }
  single(id: string): Promise<Record<string, unknown>> {
    return new Promise<{ id: string; name: string; quantity: string }>(
      (resolve, reject) => {
        con.query(
          "SELECT * FROM item where id = ? and userID = ?",
          [id, this._userID],
          (err, result) => {
            if (err) reject(err);
            resolve(result[0]);
          }
        );
      }
    );
  }
  update(id: string, name: string, quantity: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const sql =
        "UPDATE item SET name = ?, quantity = ? WHERE id = ? and userID = ?";
      con.query(sql, [name, quantity, id, this._userID], (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }
}
