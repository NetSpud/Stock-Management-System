import express from "express";
import dotenv from "dotenv";
import session from "express-session";
const MySQLStore = require("express-mysql-session")(session);
dotenv.config();

var options = {
  port: 3306,
  host: process.env.HOST || "localhost",
  user: process.env.USER || "root",
  password: process.env.PASS || "123",
  database: process.env.DB || "storage",
  checkExpirationInterval: 900000,
};

const store = new MySQLStore(options);

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "pug");
app.use(
  session({
    secret: "123",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    name: `_session`,
    store: store,
  })
);

declare module "express-session" {
  export interface Session {
    setup: boolean;
    userID: string;
    email: string;
    accountLevel: number;
  }
}

import adminRoute from "./admin";
import setupRoute from "./setup";
import loginRoute from "./login";
app.use("/admin", adminRoute);

app.get("/", (req, res) => {
  res.sendStatus(200);
  console.log(req.session);
});

app.use("/setup", setupRoute);
app.use("/login", loginRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`System running on port ${port}`);
});
