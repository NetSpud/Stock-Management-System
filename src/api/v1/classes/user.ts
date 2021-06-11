import con from "../../../utils/SQL";
import { v4 as uuidv4 } from "uuid";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import pug from "pug";
dotenv.config();
export default class User {
  get all(): Promise<Record<string, unknown>> {
    return new Promise((resolve, reject) => {
      con.query("SELECT id, email, accountLevel FROM users", (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
  single(id: string): Promise<Record<string, unknown>> {
    return new Promise((resolve, reject) => {
      con.query("SELECT * FROM users where id = ?", [id], (err, result) => {
        if (err) reject(err);
        if (result.length > 0) {
          resolve(result[0]);
        } else {
          reject(`Cannot find user`);
        }
      });
    });
  }
  exists(email: string, code?: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let inviteUser = false;
      con.query(
        "SELECT * FROM userInvites where email = ? or code = ?",
        [email, code],
        (err, result) => {
          if (err) reject(err);
          if (result.length > 0) {
            console.log(`User Already Invited!`);
            reject(`User Already Invited!`);
          } else {
            inviteUser = true;
          }
        }
      );
      con.query(
        "SELECT * FROM users where email = ?",
        [email],
        (err, result) => {
          if (err) reject(err);
          if (result.length > 0) {
            reject(`User Already Exists!`);
          } else {
            inviteUser = true;
          }
        }
      );
      if (inviteUser === false) {
        resolve(true);
      }
    });
  }
  invite(email: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const code = nanoid(100);
      const sql =
        "INSERT INTO userInvites (id, email, timeInvited, code) VALUES (?,?,?,?)";
      con.query(sql, [uuidv4(), email, new Date().getTime(), code], (err) => {
        if (err) reject(err);
        console.log("1 record inserted");
        sendInviteEmail(email, code).then(() => {
          resolve(true);
        });
      });
    });
  }
  hash(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
  create(email: string, password: string, verified?: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const id = uuidv4();
      const sql =
        "INSERT INTO users (id, email, password, accountLevel, verified) VALUES (?,?,?,?,?)";
      con.query(sql, [id, email, password, 1, verified], (err) => {
        if (err) reject(err);
        console.log("1 record inserted");
        resolve(true);
      });
    });
  }
}
const sendInviteEmail = (email: string, code: string) => {
  return new Promise((resolve) => {
    const compiledFunction = pug.compileFile("views/inviteTemplate.pug");
    const html = compiledFunction({
      domain: process.env.DOMAIN,
      code,
    });
    const mailOptions = {
      from: "example@example.com",
      to: email,
      subject: "Invitation to join stock management",
      html,
    };
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "",
        pass: process.env.EMAIL_PASS,
      },
    });

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Invite Sent To ${email}`);
        resolve(true);
      }
    });
  });
};
