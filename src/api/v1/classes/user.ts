import con from "../../../utils/SQL";
import { v4 as uuidv4 } from "uuid";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import pug from "pug";
dotenv.config();
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
  exists(email: string) {
    return new Promise((resolve, reject) => {
      con.query(
        "SELECT * FROM userInvites where email = ?",
        [email],
        (err, result, fields) => {
          if (err) reject(err);
          if (result.length > 0) {
            reject(`User Already Exists!`);
          } else {
            resolve(true);
          }
        }
      );
    });
  }
  invite(email: string) {
    return new Promise((resolve, reject) => {
      var sql =
        "INSERT INTO userInvites (id, email, timeInvited) VALUES (?,?,?)";
      con.query(sql, [uuidv4(), email, new Date().getTime()], (err, result) => {
        if (err) reject(err);
        console.log("1 record inserted");
        sendInviteEmail(email).then((d) => {
          resolve(true);
        });
      });
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
const sendInviteEmail = (email: string) => {
  return new Promise((resolve, reject) => {
    const compiledFunction = pug.compileFile("views/inviteTemplate.pug");
    const html = compiledFunction({
      domain: process.env.DOMAIN,
      code: nanoid(100),
    });
    var mailOptions = {
      from: "hengieuk@gmail.com",
      to: email,
      subject: "Invitation to join stock management",
      html,
    };
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "",
        pass: process.env.EMAIL_PASS,
      },
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info);
        resolve(true);
      }
    });
  });
};
