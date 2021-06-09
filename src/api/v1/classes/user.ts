import con from "../../../utils/SQL";
import { v4 as uuidv4 } from "uuid";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";

export default class User {
  constructor() {}
  get all() {
    return new Promise((resolve, reject) => {
      con.query(
        "SELECT id, email, accountLevel FROM users",
        (err, result, fields) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  }
  single(id: string) {
    return new Promise((resolve, reject) => {
      con.query(
        "SELECT * FROM users where id = ?",
        [id],
        (err, result, fields) => {
          if (err) reject(err);
          if (result.length > 0) {
            resolve(result[0]);
          } else {
            reject(`Cannot find user`);
          }
        }
      );
    });
  }
  hash(password: string) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
  create(email: string, password: string) {
    return new Promise((resolve, reject) => {
      const id = uuidv4();
      const verificationCode = nanoid(100);
      var sql =
        "INSERT INTO users (id, email, password, verificationCode, accountLevel) VALUES (?,?,?,?,?)";
      con.query(
        sql,
        [id, email, password, verificationCode, 1],
        (err, result) => {
          if (err) reject(err);
          console.log("1 record inserted");
          resolve(true);
        }
      );
    });
  }
}
